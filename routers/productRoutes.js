import { Router } from "express";
import {
  getProducts,
  getOneProduct,
  createProduct,
  highlightProducts,
  toggleWishlist,
} from "../controllers/productController.js";

const router = Router();

router.get("/highlights", highlightProducts);
router.patch("/wishlist/:id", toggleWishlist);

router.get("/", getProducts);
router.get("/:id", getOneProduct);
router.post("/", createProduct);

export default router;
