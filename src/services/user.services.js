const User = require("../models/user.model");

const createUserService = async (user) => {
  const newUser = new User(user);
  await newUser.save();
  return newUser;
};

const getByEmailService = async (email) => {
  return User.findOne({ email });
};

const getUserService = async (id) => {
  return User.findById(id);
};

const getAllUsersService = async () => {
  return User.find({});
};

const deleteUserService = async (id) => {
  return User.findByIdAndDelete(id);
};

const editUserService = async (id, user) => {
  return User.findByIdAndUpdate(id, user, { new: true });
};

const getUserCartService = async (id) => {
  const userWithPopulateCart = await User.findById(id).populate("cart.product");
  return userWithPopulateCart.cart;
};

const manageCartProductService = async (user, product) => {
  const isProductInCart = user.cart.find(
    (item) => item.product.toString() === product._id.toString()
  );

  if (!isProductInCart) {
    user.cart.push({ product: product._id, quantity: 1 });
  } else {
    user.cart = user.cart.filter(
      (products) => products.product._id.toString() !== product._id.toString()
    );
  }

  await user.save();

  return user.populate("cart.product");
};

module.exports = {
  createUserService,
  getUserService,
  getByEmailService,
  getAllUsersService,
  deleteUserService,
  editUserService,
  getUserCartService,
  manageCartProductService,
};
