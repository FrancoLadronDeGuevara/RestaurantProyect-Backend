const { Schema, model } = require("mongoose");
const jwt = require("jsonwebtoken");

const userSchema = new Schema({
  firstname: {
    type: String,
    required: [true, "El nombre es obligatorio"],
  },
  lastname: {
    type: String,
    required: [true, "El apellido es obligatorio"],
  },
  email: {
    type: String,
    required: [true, "El email es obligatorio"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "La contraseña es obligatoria"],
  },
  cart: [
    {
      product: { type: Schema.Types.ObjectId, ref: "Product" },
      quantity: { type: Number, default: 1 },
    },
  ],
  orders: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Order'
    }
  ],
  role: {
    type: String,
    enum: ["admin", "user"],
    default: "user",
  },
  active: {
    type: Boolean,
    default: true,
  },
});

userSchema.methods.getJwtToken = function () {
  return jwt.sign({ id: this._id }, process.env.SECRET_KEY, {
    expiresIn: process.env.TOKEN_EXPIRES_IN,
  });
};

module.exports = model("User", userSchema);
