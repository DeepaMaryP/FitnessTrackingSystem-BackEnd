import { Router } from "express";

import { handleAuth } from "../middleware/auth.js";
import { approvePaymentPlan, createPaymentPlan, deletePaymentPlan, getPaymentPlanById, getPaymentPlans, getTotalEarnings, updatePaymentPlan } from "../controller/paymentPlanMasterController.js";
import { validatePaymentPlan } from "../middleware/paymentPlanMasterMiddleware.js";
const router = Router()

//admin
router.route("/").post(validatePaymentPlan, handleAuth, createPaymentPlan);
router.route("/").get( getPaymentPlans)
router.route("/dash/:date").get(handleAuth, getTotalEarnings)
router.route("/:Id").get( getPaymentPlanById)
router.route("/:Id").patch(handleAuth, updatePaymentPlan)
router.route("/verify/:Id").patch(handleAuth, approvePaymentPlan)
router.route("/:Id").delete(handleAuth, deletePaymentPlan)


export default router;