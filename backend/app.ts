import express, { Application, Request, Response } from "express";
import paymentRoute from "./routes/paymentRoutes";
import cors from "cors";
import { config } from "dotenv";


//  Load environment variables from root .env
config();

export const app: Application = express();

// Middlewares
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api", paymentRoute);

app.get("/api/getkey", (req: Request, res: Response) => {
  res.status(200).json({ key: process.env.RAZORPAY_API_KEY });
});
