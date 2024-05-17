const Product = require("../models/product.model");

const createProductService = async (product) => {
    const newProduct = new Product(product);
    await newProduct.save();
    return newProduct;
};

const getProductByNameService = async (name) => {
    return Product.findOne({name})
}

const getProductByIdService = async (id) => {
    return Product.findById(id);
};

const getAllProductsService = async () => {
    return Product.find();
};

const updateProductService = async (id, product) => {
    return Product.findByIdAndUpdate(id, product, { new: true });
};

const deleteProductService = async (id) => {
    return Product.findByIdAndDelete(id);
};

module.exports = { 
    createProductService,
    getProductByNameService,
    getProductByIdService, 
    getAllProductsService, 
    updateProductService, 
    deleteProductService 
};
