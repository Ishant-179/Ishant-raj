import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();


export const connectDB = async() => {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log("MongoDB connected successfully");
    } catch (error) {
        console.log("Error in connecting mongoDB");
        process.exit(1);
    }
}