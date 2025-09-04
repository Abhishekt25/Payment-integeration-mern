import { app } from "./app";
import Razorpay from "razorpay";
import { connectDB } from "./config/database";
import { config } from "dotenv";

// Load environment variables from root .env
config();

// Connect to Database
connectDB();

// Create Razorpay instance
export const instance = new Razorpay({
  key_id: process.env.RAZORPAY_API_KEY as string,
  key_secret: process.env.RAZORPAY_API_SECRET as string,
});

// Start server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`✅ Server is running on port ${PORT}`);
});
