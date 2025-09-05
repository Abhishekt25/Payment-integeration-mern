import React from "react";
import { Box, Stack } from "@mui/material";
import Card from "./Card";
import axios from "axios";

declare global {
  interface Window {
    Razorpay: any;
  }
}

interface RazorpayOrder {
  id: string;
  amount: number;
  currency: string;
}

const Home: React.FC = () => {
  // Function to dynamically load Razorpay script
  const loadRazorpayScript = (): Promise<boolean> => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const checkoutHandler = async (amount: number) => {
    const isScriptLoaded = await loadRazorpayScript();
    if (!isScriptLoaded) {
      alert("Razorpay SDK failed to load. Are you online?");
      return;
    }

    try {
      // Get Razorpay key from backend
      const { data: keyData } = await axios.get<{ key: string }>(
        "http://localhost:2507/api/getkey"
      );

      // Create order on backend
      const { data: orderData } = await axios.post<{ order: RazorpayOrder }>(
        "http://localhost:2507/api/checkout",
        { amount }
      );

      const options = {
        key: keyData.key,
        amount: orderData.order.amount,
        currency: "INR",
        name: "Ab",
        description: "RazorPay",
        image: "https://avatars.githubusercontent.com/u/1486366?v=4",
        order_id: orderData.order.id,
        callback_url: "http://localhost:4000/api/paymentverification",
        prefill: {
          name: "Abhishek Tiwari",
          email: "abhishek@example.com",
          contact: "9999999999",
        },
        notes: { address: "Razorpay Corporate Office" },
        theme: { color: "#121212" },
      };

      const razor = new window.Razorpay(options);
      razor.open();
    } catch (error) {
      console.error("Checkout failed:", error);
    }
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
      <Stack direction={{ xs: "column", sm: "row" }} spacing={4}>
        <Card
          amount={5000}
          img="https://picsum.photos/200/300"
          checkoutHandler={checkoutHandler}
        />
        <Card
          amount={3000}
          img="http://i1.adis.ws/i/canon/eos-r5_front_rf24-105mmf4lisusm_32c26ad194234d42b3cd9e582a21c99b"
          checkoutHandler={checkoutHandler}
        />
      </Stack>
    </Box>
  );
};

export default Home;
