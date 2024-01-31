import Express from "express";
import dotenv from "dotenv";
import colors from "colors";
import morgan from "morgan";
import cors from "cors";
import conncetDb from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";

import cookieParser from "cookie-parser";
import { isAuth } from "./middleware/auth.middleware.js";
const app = Express();
dotenv.config();
const port = process.env.PORT || 5000;
//connection ave la base de donnée
conncetDb();

app.use(morgan("dev"));
app.use(cors());
app.use(Express.json());

app.use(cookieParser());
app.use(isAuth);
app.use("/user", userRoutes);

app.listen(port, () => {
  console.log(
    `server runing in port ${process.env.PORT} on ${process.env.MODE_ENV}`
      .bgMagenta.white
  );
});
