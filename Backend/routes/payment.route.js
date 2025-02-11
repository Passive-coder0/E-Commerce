import express from "express";
import { protectRoute } from "../Middleware/auth.middleware.js";
import { createCheckoutSession } from "../controllers/payment.controller.js";

const router = express.Router();

router.post("/create-checkhout-session", protectRoute, createCheckoutSession);
router.post("/create-checkhout-success", protectRoute, );

export default router;
