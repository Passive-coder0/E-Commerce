import express from "express";
import { addToCart, getCartProducts, removeAllFromCart, updateQuantity } from "../controllers/cart.controller.js";
import { protectRoute } from "../Middleware/auth.middleware.js";

const router = express.Router();

router.get("/", protectRoute, getCartProducts);
router.post("/", protectRoute, addToCart);
// Will remove all quantity of 1 product from cart
router.delete("/", protectRoute, removeAllFromCart);
// Increase / Decrease the quantity
router.put("/:id", protectRoute, updateQuantity);

export default router;