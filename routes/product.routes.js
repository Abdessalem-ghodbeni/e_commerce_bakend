import express from "express";
// import { gettAllProductController } from "../controllers/product.controller.js";
import {
  gettAllProductController,
  getProductById,
} from "../controllers/product.controller.js";

//initialisation du router
const router = express.Router();

router.get("/all_product", gettAllProductController);
router.get("/product_by_id/:id", getProductById);

export default router;
