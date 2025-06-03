import { Router } from "express";
import {getAllUsers, createUser, getOneUser } from "../controllers/utilizadorController";

const router = express.Router();

router.get("/utilizadores", getAllUsers);
router.get("/utilizadores/:id", getOneUser);
router.post('/utilizadores',createUser )

export default router;
