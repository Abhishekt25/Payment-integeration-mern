import React from "react";
import { Box, Typography, Stack } from "@mui/material";
import { useSearchParams } from "react-router-dom";

const PaymentSuccess: React.FC = () => {
  const [searchParams] = useSearchParams();
  const referenceNum = searchParams.get("reference");

  return (
    <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
      <Stack spacing={2} textAlign="center">
        <Typography variant="h4" fontWeight="bold">
          Order Successful
        </Typography>
        <Typography variant="body1">
          Reference No: {referenceNum ?? "N/A"}
        </Typography>
      </Stack>
    </Box>
  );
};

export default PaymentSuccess;
