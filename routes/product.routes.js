import express from "express";
import { singleUpload } from "../middleware/multer.js";

import {
  gettAllProductController,
  getProductById,
  createProductController,
} from "../controllers/product.controller.js";
import { isAuth } from "../middleware/auth.middleware.js";

//initialisation du router
const router = express.Router();

router.get("/all_product", gettAllProductController);
router.get("/product_by_id/:id", getProductById);
router.post("/add/product", isAuth, singleUpload, createProductController);

export default router;
