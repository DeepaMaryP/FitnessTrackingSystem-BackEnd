import { Router } from "express";
import { handleAuth } from "../middleware/auth.js";
import { checkSubscriptionStatus, createUserPaymentController, getPaidUserCountWithNoTrainers, getUserPayment } from "../controller/userPaymentController.js";
import { validateUserPayment } from "../middleware/userPaymentMiddleware.js";

const router = Router()

router.route("/").post(validateUserPayment, handleAuth, createUserPaymentController);
router.route("/check-subscription/:userId").get(handleAuth, checkSubscriptionStatus)
router.route("/:userId").get(handleAuth, getUserPayment)
router.route("/dash/pending").get(handleAuth, getPaidUserCountWithNoTrainers)

export default router;