import { Router } from "express";
import { checkout, paymentVerification } from "../controllers/paymentController";

const router = Router();

router.post("/checkout", checkout);
router.post("/paymentverification", paymentVerification);

export default router;
