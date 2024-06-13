const express = require("express");
const router = express.Router();
const { createOrder, getAllOrders, editOrder, getUserOrders } = require("../controllers/order.controller");
const { isAuthenticated, isAdmin } = require("../middlewares/auth");

router.post("/create", isAuthenticated, createOrder);

router.get("/", isAuthenticated, isAdmin("admin"), getAllOrders);

router.get("/user-orders", isAuthenticated, getUserOrders);

router.put("/edit/:id", isAuthenticated, isAdmin("admin"), editOrder);

module.exports = router;