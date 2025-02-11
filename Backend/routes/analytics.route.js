import express from "express";
import { adminRoute, protectRoute } from "../Middleware/auth.middleware.js";
import { getAnalyticsData, getDailySalesData } from "../controllers/analytics.controller.js";

// The analytics will return sales of the last 7 days in a graph chart

const router = express.Router();

router.get("/", protectRoute, adminRoute, async (req, rest) => {
  try {
    const analyticsData = await getAnalyticsData();

    const endDate = new Date();
    const startDate = new Date(endDate.getTime() - 7 * 24 * 60 * 60 * 1000);

    const dailySalesData = await getDailySalesData(startDate, endDate);

    rest.json({
        analyticsData,
        dailySalesData
    })
  } catch (error) {
    console.log("Error in Analytics route", error.message);
    rest.status(500).json({message: "Server error in analytics route", error: error.message})
  }
});


export default router;