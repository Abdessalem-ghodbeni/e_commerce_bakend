import express from "express";
import {
  RegisterController,
  logginController,
} from "../controllers/user.controller.js";

//initiation d'objet router
const router = express.Router();

//l'ensemble des routes

router.post("/register", RegisterController);
router.post("/login", logginController);

//exportation
export default router;
