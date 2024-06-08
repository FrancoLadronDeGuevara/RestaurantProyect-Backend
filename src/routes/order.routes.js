const express = require("express");
const router = express.Router();
const { createOrder, getAllOrders, getOrderById, editOrder, deleteOrder, getUserOrders } = require("../controllers/order.controller");
const { isAuthenticated, isAdmin } = require("../middlewares/auth");

router.post("/create", isAuthenticated, createOrder);

router.get("/", isAuthenticated, isAdmin("admin"), getAllOrders);

router.get("/user-orders", isAuthenticated, getUserOrders);

router.get("/:id", isAuthenticated, getOrderById);

router.put("/edit/:id", isAuthenticated, isAdmin("admin"), editOrder);

router.delete("/delete/:id", isAuthenticated, isAdmin("admin"), deleteOrder);

module.exports = router;