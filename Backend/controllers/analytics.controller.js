import Product from "../models/product.model.js";
import User from "../models/user.model.js";

// The analytics will return sales of the last 7 days in a graph chart

export const getAnalyticsData = async () => {
  const totalUsers = await User.countDocuments();
  const totalproducts = await Product.countDocuments();

  const salesData = await Order.aggregate([
    {
      $group: {
        _id: null, // It groups all the documents together
        totalSales: { $sum: 1 },
        totalRevenue: { $sum: "$totalAmount" },
      },
    },
  ]);

  const { totalSales, totalRevenue } = salesData[0] || {
    totalSales: 0,
    totalRevenue: 0,
  };

  return {
    users: totalUsers,
    Products: totalproducts,
    totalSales,
    totalRevenue,
  };
};

export const getDailySalesData = async (startDate, endDate) => {
  try {
    const dailySalesData = await Order.aggregate([
      {
        $match: {
          createdAt: {
            $gte: startDate,
            $lte: endDate,
          },
        },
      },
      {
        $group: {
          _id: { $dateTostring: { format: "%y-%m-s%d", date: "$createdAt" } },
          sales: { $sum: 1 },
          revenue: { $sum: "totalAmount" },
        },
      },
      { $start: { _id: 1 } },
    ]);

    const dateArray = getDatesInRange(startDate, endDate);
    //   console.log(dateArray); will give past 7 days ['2024-07-18', '2024-08-19, .....]

    return dateArray.map((date) => {
      const foundData = dailySalesData.find((item) => item._id === date);

      return {
        date,
        sales: foundData?.sales || 0,
        revenue: foundData?.revenue || 0,
      };
    });
  } catch (error) {
    // When you throw an error it will go to the parent file try/catch that called this function
    throw error;
  }
};

function getDatesInRange(startDate, endDate) {
  const dates = [];
  let currentDate = new Date(startDate);

  while (currentDate <= endDate) {
    dates.push(currentDate.toIsoString().split("T")[0]);
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return dates;
}
