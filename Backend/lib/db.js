// Connecting to DataBase

import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI)
        console.log(`Connected to E-Commerce Database on ${conn.connection.host}`);
    } catch (error) {
        console.log("Error connecting to database", error.message);
        process.exit(1);    // 1 means failure, 0 means success
    }
}