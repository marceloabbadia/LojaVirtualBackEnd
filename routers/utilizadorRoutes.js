import { Router } from "express";
import {
  getAllUsers,
  createUser,
  getOneUser,
  updateUser,
  deleteUser,
  updateUserStatusAndFunction,
} from "../controllers/utilizadorController.js";

const router = Router();

router.get("/", getAllUsers);
router.get("/:id", getOneUser);
router.post("/", createUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);
router.patch("/:id", updateUserStatusAndFunction);

export default router;
