import express from "express"
import { protectRoute } from "../Middleware/auth.middleware.js";
import { getCoupon, validateCoupon } from "../controllers/coupon.controller.js";


let router = express.Router();

router.get("/", protectRoute, getCoupon)
router.get("/validate", protectRoute, validateCoupon)

export default router;