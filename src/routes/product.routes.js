const express = require("express");
const router = express.Router();
const { createProduct, getAllProducts, getProductById, updateProduct, deleteProduct } = require("../controllers/product.controller");
const { isAuthenticated, isAdmin } = require("../middlewares/auth");

router.post("/create", isAuthenticated, isAdmin("admin"), createProduct);

router.get("/", getAllProducts);

router.get("/:id", getProductById);

router.put("/edit/:id", isAuthenticated, isAdmin("admin"), updateProduct);

router.delete("/delete/:id", isAuthenticated, isAdmin("admin"), deleteProduct);

module.exports = router;
