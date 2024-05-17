const express = require("express");
const router = express.Router();
const { createProduct, getAllProducts, getProductById, updateProduct, deleteProduct } = require("../controllers/product.controller");

router.post("/create", createProduct);

router.get("/", getAllProducts);

router.get("/:id", getProductById);

router.put("/edit/:id", updateProduct);

router.delete("/delete/:id", deleteProduct);

module.exports = router;
