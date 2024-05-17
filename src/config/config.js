const { mongo } = require("mongoose");

require("dotenv").config();

const serverConfig = {
  port: process.env.PORT || 4000,
  mongoUrl: process.env.MONGO_DB_URI,
};

const jwtConfig = {
  secret: process.env.SECRET_KEY,
  expiresIn: process.env.TOKEN_EXPIRES_IN,
};

module.exports = { serverConfig, jwtConfig };