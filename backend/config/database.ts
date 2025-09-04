import mongoose from "mongoose";
import { config } from "dotenv";

// Load environment variables
config({ path: "./config/config.env" });

export const connectDB = async (): Promise<void> => {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI is not defined in environment variables");
    }

    const { connection } = await mongoose.connect(process.env.MONGO_URI);

    console.log(`✅ MongoDB is connected with host: ${connection.host}`);
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error);
    process.exit(1);
  }
};
