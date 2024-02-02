import express from "express";
// import { gettAllProductController } from "../controllers/product.controller.js";
import { gettAllProductController } from "../controllers/product.controller.js";

//initialisation du router
const router = express.Router();

router.get("/all_product", gettAllProductController);

export default router;
