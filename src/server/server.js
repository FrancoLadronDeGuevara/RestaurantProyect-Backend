const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const { serverConfig } = require("../config/config");
require("../dbConnection/dbConnection");

const app = express();
const port = serverConfig.port || 4000;

const whitelist = ['http://localhost:5173'];

app.use(cors({
    origin: function (origin, callback) {
      if (!origin || whitelist.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Acceso CORS no permitido'));
      }
    },
    credentials: true
  }));

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const userRoutes = require("../routes/user.routes");
const productRoutes = require("../routes/product.routes");

app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);



app.listen(port, () => {
  console.log(`Servidor en el puerto ${port}`);
});

