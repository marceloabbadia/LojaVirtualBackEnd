import { Router } from "express";
import { authUtilizador } from "../controllers/authController.js";

const router = Router();

router.post("/login", authUtilizador);

export default router;
