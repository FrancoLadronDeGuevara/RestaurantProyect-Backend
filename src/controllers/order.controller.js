const {
  createOrderService,
  getAllOrdersService,
  editOrderService,
  getUserWithPopulateOrdersService,
} = require("../services/order.service");
const { getUserService } = require("../services/user.services");

const createOrder = async (req, res) => {
  try {
    const userId = req.user.id;

    const userFound = await getUserService(userId);

    if (!userFound)
      return res.status(400).json({ message: "No se encontro el usuario" });

    const { products, total, userAddress, creditCard } = req.body;

    if (!products || products.length === 0)
      return res.status(400).json({ message: "El carrito esta vacio" });

    if (!userAddress)
      return res.status(400).json({ message: "La direccion es requerida" });

    if (!total)
      return res.status(400).json({ message: "El total es requerido" });

    if (
      !creditCard ||
      !creditCard.cardNumber ||
      !creditCard.expirationDate ||
      !creditCard.cvc
    )
      return res
        .status(400)
        .json({ message: "Los datos de la tarjeta son inválidos" });

    const newOrder = await createOrderService(
      userFound,
      products,
      total,
      userAddress
    );

    res.status(200).json(newOrder);
  } catch (error) {
    res.status(500).json({ message: "Error al crear el pedido", error });
  }
};

const getAllOrders = async (req, res) => {
  try {
    const orders = await getAllOrdersService();
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener los pedidos", error });
  }
};

const getUserOrders = async (req, res) => {
  try {
    const id = req.user.id;

    const userWithPopulateOrders = await getUserWithPopulateOrdersService(id);

    if (!userWithPopulateOrders)
      return res.status(400).json({ message: "No se encontro el usuario" });

    res.status(200).json(userWithPopulateOrders.orders);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al obtener los pedidos del usuario", error });
  }
};

const editOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const orderUpdated = await editOrderService(id, status);

    res.status(200).json(orderUpdated);
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar el pedido", error });
  }
};

module.exports = {
  createOrder,
  getAllOrders,
  editOrder,
  getUserOrders,
};
