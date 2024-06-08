const Order = require("../models/order.model");
const User = require("../models/user.model");

const createOrderService = async (user, products, total, userAddress) => {
  const order = {
    user : user._id,
    products,
    total,
    userAddress,
  };
  const newOrder = new Order(order);
  await newOrder.save();

  user.cart = [];
  user.orders.push(newOrder._id);

  await user.save();

  return newOrder;
};

const getAllOrdersService = async () => {
  return Order.find({});
};

const getUserWithPopulateOrdersService = async (id) => {
  return User.findById(id).populate({
    path: 'orders',
    populate: {
      path: 'products.product',
      model: 'Product'
    }
  });
};

const getOrderByIdService = async (id) => {
  return Order.findById(id);
};

const editOrderService = async (id, order) => {
  return Order.findByIdAndUpdate(id, order, { new: true });
};

const deleteOrderService = async (id) => {
  return Order.findByIdAndDelete(id);
};

module.exports = {
  createOrderService,
  getAllOrdersService,
  getUserWithPopulateOrdersService,
  getOrderByIdService,
  editOrderService,
  deleteOrderService,
};
