import { Router } from "express";
import {
  authUtilizador,
  getWishlist,
  wishlistUtilizador,
} from "../controllers/authController.js";

const router = Router();

router.post("/login", authUtilizador);
router.patch("/wishlist/:productId", wishlistUtilizador);
router.get("/wishlist/me", getWishlist);

export default router;
