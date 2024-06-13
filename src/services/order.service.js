const Order = require("../models/order.model");
const User = require("../models/user.model");

const createOrderService = async (user, products, total, userAddress) => {
  const order = {
    user: user._id,
    products,
    total,
    userAddress,
  };
  const newOrder = new Order(order);
  await newOrder.save();

  user.orders.push(newOrder._id);

  await user.save();

  const populatedOrder = await newOrder.populate({
    path: "products.product",
    model: "Product",
  });

  return populatedOrder;
};

const getAllOrdersService = async () => {
  const allOrders = await Order.find({});
  const populatedOrders = await Order.populate(allOrders, [
    { path: "products.product", model: "Product" },
    { path: "user", model: "User" },
  ]);

  return populatedOrders;
};

const getUserWithPopulateOrdersService = async (id) => {
  return User.findById(id).populate({
    path: "orders",
    populate: {
      path: "products.product",
      model: "Product",
    },
  });
};

const editOrderService = async (id, status) => {
  const updatedOrder = await Order.findByIdAndUpdate(
    id,
    { status },
    { new: true }
  )
    .populate({
      path: "products.product",
      model: "Product",
    })
    .populate({
      path: "user",
      model: "User",
    });

  return updatedOrder;
};

module.exports = {
  createOrderService,
  getAllOrdersService,
  getUserWithPopulateOrdersService,
  editOrderService,
};
