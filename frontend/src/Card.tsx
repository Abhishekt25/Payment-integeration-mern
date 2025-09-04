import React from "react";
import { Card as MUICard, CardContent, CardMedia, Typography, Button, Stack } from "@mui/material";

interface CardProps {
  amount: number;
  img: string;
  checkoutHandler: (amount: number) => void;
}

const Card: React.FC<CardProps> = ({ amount, img, checkoutHandler }) => {
  return (
    <MUICard sx={{ width: 300, boxShadow: 3, borderRadius: 3 }}>
      <CardMedia component="img" height="200" image={img} alt="Product" />
      <CardContent>
        <Stack spacing={2} alignItems="center">
          <Typography variant="h6">₹{amount}</Typography>
          <Button variant="contained" color="primary" onClick={() => checkoutHandler(amount)}>
            Buy Now
          </Button>
        </Stack>
      </CardContent>
    </MUICard>
  );
};

export default Card;
