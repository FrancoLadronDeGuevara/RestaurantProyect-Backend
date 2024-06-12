const { Router } = require("express");
const {
  createUser,
  loginUser,
  getUser,
  logoutUser,
  getAllUsers,
  editUser,
  deleteUser,
  getUserCart,
  manageCartProduct,
  updateProductInCart,
  clearUserCart,
} = require("../controllers/user.controller");
const { isAuthenticated, isAdmin } = require("../middlewares/auth");
const route = Router();

route.post("/create", createUser);

route.post("/login-user", loginUser);

route.get("/get-user", isAuthenticated, getUser);

route.get("/logout-user", logoutUser);

route.get("/", getAllUsers);

route.put("/edit/:id", isAuthenticated, isAdmin("admin"), editUser);

route.delete("/delete/:id", isAuthenticated, isAdmin("admin"), deleteUser);

route.get("/user-cart", isAuthenticated, getUserCart);

route.post("/manage-cart-product", isAuthenticated, manageCartProduct);

route.put("/update-product-in-cart", isAuthenticated, updateProductInCart);

route.get("/clear-cart", isAuthenticated, clearUserCart);

module.exports = route;
