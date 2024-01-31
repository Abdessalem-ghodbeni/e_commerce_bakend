import express from "express";
import {
  RegisterController,
  getUserProfileController,
  logginController,
} from "../controllers/user.controller.js";
import { isAuth } from "../middleware/auth.middleware.js";

//initiation d'objet router
const router = express.Router();

//l'ensemble des routes

router.post("/register", RegisterController);
router.post("/login", logginController);
router.get("/profile", isAuth, getUserProfileController);

//exportation
export default router;
