import express from "express";
import { authUtilizador } from "../controllers/authController.js";

const router = express.Router();

router.post("/login", authUtilizador);

export default router;
