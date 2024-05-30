const {
  createProductService,
  getProductByIdService,
  getAllProductsService,
  updateProductService,
  deleteProductService,
  getProductByNameService,
} = require("../services/product.service");

const regexProductName = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s'()-]{8,40}$/;
const regexDescription = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ0-9\s.,;:'"()\-]{10,100}$/;

const createProduct = async (req, res) => {
  try {
    const product = req.body;

    if (
      !product.name ||
      !product.description ||
      !product.price ||
      !product.image ||
      !product.category
    )
      return res
        .status(400)
        .json({ message: "Todos los campos son obligatorios" });

    const productFound = await getProductByNameService(product.name);

    if (productFound)
      return res.status(400).json({ message: "Ya existe un producto con ese nombre" });

    if (!regexProductName.test(product.name))
      return res.status(400).json({
        message: "El nombre del producto debe ser de 8 a 40 caracteres",
      });

    if (!regexDescription.test(product.description))
      return res.status(400).json({
        message: "La descripcion del producto debe ser de 10 a 100 caracteres",
      });

    const productCreated = await createProductService(product);
    res
      .status(201)
      .json(productCreated);
  } catch (error) {
    res.status(500).json({ message: "Error al crear el producto", error });
  }
};

const getAllProducts = async (req, res) => {
  try {
    const products = await getAllProductsService();

    if (products.length <= 0)
      return res
        .status(400)
        .json({ message: "Todavia no hay productos agregados" });

    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener los productos", error });
  }
};

const getProductById = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await getProductByIdService(id);

    if (!product) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }

    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener el producto", error });
  }
};

const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const newData = req.body;

    const product = await getProductByIdService(id);

    if (!product) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }

    if (newData.name) {
      product.name = newData.name;
    }

    if (newData.description) {
      product.description = newData.description;
    }

    if (newData.price) {
      product.price = newData.price;
    }

    if (newData.image) {
      product.image = newData.image;
    }

    if (product.category) {
      product.category = newData.category;
    }

    const updatedProduct = await updateProductService(id, product);

    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar el producto", error });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await getProductByIdService(id);

    if (!product) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }

    const productDeleted = await deleteProductService(id);

    if (!productDeleted) {
      return res.status(500).json({ message: "Error al eliminar el producto" });
    }

    res.status(200).json(productDeleted);
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar el producto", error });
  }
};

module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};
