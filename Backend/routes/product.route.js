import express from "express";
import { 
  getAllProducts, 
  getFeaturedProducts, 
  createProduct, 
  deleteProduct, 
  getRecommendedProducts, 
  getProductsByCategory, 
  toggleFeaturedProduct 
} from "../controllers/product.controller.js";
import { protectRoute, adminRoute } from "../Middleware/auth.middleware.js";

const router = express.Router();

router.get("/", getAllProducts);
router.get("/featured", getFeaturedProducts);
router.get("/category/:category", getProductsByCategory);
router.get("/recommendations", getRecommendedProducts);
router.post("/", protectRoute, adminRoute, createProduct);
router.patch("/:id", protectRoute, adminRoute, toggleFeaturedProduct);
router.delete("/:id", protectRoute, adminRoute, deleteProduct);

export default router;
