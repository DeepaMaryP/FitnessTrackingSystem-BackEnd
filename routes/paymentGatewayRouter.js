import { Router } from "express";
const router = Router()

import { handleAuth } from "../middleware/auth.js";
import { initializePayment, VerifyPayment } from "../controller/paymentGatewayController.js";

router.route("/").post( initializePayment);
router.route("/verify").post( VerifyPayment);

export default router;