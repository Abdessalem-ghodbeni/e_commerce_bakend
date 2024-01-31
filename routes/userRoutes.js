import express from "express";
import {
  RegisterController,
  getUserProfileController,
  logginController,
  logoutController,
  updateInfoUserController,
} from "../controllers/user.controller.js";
import { isAuth } from "../middleware/auth.middleware.js";

//initiation d'objet router
const router = express.Router();

//l'ensemble des routes

router.post("/register", RegisterController);
router.post("/login", logginController);
router.get("/profile", isAuth, getUserProfileController);
router.get("/logout", isAuth, logoutController);
router.put("/update", isAuth, updateInfoUserController);

//exportation
export default router;
