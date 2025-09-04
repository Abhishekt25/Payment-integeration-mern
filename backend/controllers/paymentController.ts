import { Request, Response } from "express";
import crypto from "crypto";
import { instance } from "../server";
import { Payment } from "../models/paymentModel";

export const checkout = async (req: Request, res: Response): Promise<void> => {
  try {
    const { amount } = req.body;
    console.log("Received amount:", amount);

    if (!amount || isNaN(amount)) {
      console.log("Invalid amount received");
      res.status(400).json({ success: false, message: "Invalid amount" });
      return;
    }

    const options = {
      amount: Math.round(Number(amount) * 100), // Convert to paisa
      currency: "INR",
    };
    console.log("Creating Razorpay order with options:", options);

    const order = await instance.orders.create(options);
    console.log("Razorpay order created:", order);

    res.status(200).json({ success: true, order });
  } catch (error) {
    console.error("Checkout error:", error);
    res.status(500).json({ success: false, message: "Failed to create order" });
  }
};


export const paymentVerification = async (req: Request, res: Response): Promise<void> => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      res.status(400).json({ success: false, message: "Missing payment details" });
      return;
    }

    if (!process.env.RAZORPAY_API_SECRET) {
      throw new Error("RAZORPAY_API_SECRET is not defined in environment variables");
    }

    const body = `${razorpay_order_id}|${razorpay_payment_id}`;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_API_SECRET)
      .update(body)
      .digest("hex");

    const isAuthentic = expectedSignature === razorpay_signature;

    if (isAuthentic) {
      await Payment.create({
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature,
      });

      res.redirect(
        `http://localhost:5173/paymentsuccess?reference=${razorpay_payment_id}`
      );
    } else {
      res.status(400).json({ success: false, message: "Payment verification failed" });
    }
  } catch (error) {
    console.error("Payment verification error:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
