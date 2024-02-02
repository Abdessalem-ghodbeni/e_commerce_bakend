import Express from "express";
import dotenv from "dotenv";
import colors from "colors";
import morgan from "morgan";
import cors from "cors";
import conncetDb from "./config/db.js";

import userRoutes from "./routes/user.routes.js";
import productRoutes from "./routes/product.routes.js";

import cookieParser from "cookie-parser";
import { isAuth } from "./middleware/auth.middleware.js";
import cloudinary from "cloudinary";

const app = Express();
dotenv.config();
const port = process.env.PORT || 5000;
//connection ave la base de donnée
conncetDb();
//cloudinary Config
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});
app.use(morgan("dev"));
app.use(cors());
app.use(Express.json());
app.use(cookieParser());
app.use("/user", userRoutes);
app.use("/product", productRoutes);
app.use(isAuth);

app.listen(port, () => {
  console.log(
    `server runing in port ${process.env.PORT} on ${process.env.MODE_ENV}`
      .bgMagenta.white
  );
});
