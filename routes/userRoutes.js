import express from "express";
import { RegisterController } from "../controllers/user.controller.js";

//initiation d'objet router
const router = express.Router();

//l'ensemble des routes

router.post("/register", RegisterController);

//exportation
export default router;
