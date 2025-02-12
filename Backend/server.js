// We are using module instead of commonJs
// Which means you ALWAYS have to add the extension of the file .js when importing it
import dotenv from "dotenv"
import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser";

import { connectDB } from "./lib/db.js";
import authRoutes from "./routes/auth.route.js"
import productRoutes from "./routes/product.route.js"
import cartRoutes from "./routes/cart.route.js"
import couponRoutes from "./routes/coupon.route.js"
import paymentRoutes from "./routes/payment.route.js"
import analyticsRoutes from "./routes/analytics.route.js"

const allowedOrigins = [
    "http://localhost:5174",  // Local frontend
    "https://your-netlify-app.netlify.app"  // Deployed frontend
];

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true); // Allow request
        } else {
            callback(new Error("Not allowed by CORS")); // Block request
        }
    },
    credentials: true,  // Allow cookies & authorization headers
}));
app.use(express.json({limit:"10mb"}));
app.use(cookieParser());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/coupons", couponRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/analytics", analyticsRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    connectDB();
})

// Kill the port with this: kill-port 5000

