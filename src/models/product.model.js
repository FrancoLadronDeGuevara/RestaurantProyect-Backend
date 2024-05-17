const { Schema, model } = require("mongoose");

const productSchema = new Schema({
  name: {
    type: String,
    required: [true, "El nombre del producto es obligatorio"],
  },
  description: {
    type: String,
    required: [true, "La descripción del producto es obligatoria"],
  },
  price: {
    type: Number,
    required: [true, "El precio del producto es obligatorio"],
    min: [0, "El precio no puede ser negativo"],
    max: [20000, "El precio no puede exceder de 20000"],
  },
  image: {
    type: String,
    required: [true, "La imagen del producto es obligatoria"],
  },
  category: {
    type: String,
    enum: {
      values: ["Hamburguesas", "Pizzas", "Pastas", "Bebidas", "Sopas"],
      message: "La categoría {VALUE} no es válida. Las categorías válidas son: Hamburguesas, Pizzas, Pastas, Bebidas, Sopas",
    },
    required: true,
  }
});

module.exports= model("Product", productSchema)
