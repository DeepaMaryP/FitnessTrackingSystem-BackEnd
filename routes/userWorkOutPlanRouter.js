import { Router } from "express";
import { handleAuth } from "../middleware/auth.js";
import { createUserWorkOutPlan, deleteUserWorkOutPlan, getCurrentUserWorkOutPlans, getExpiredUserWorkOutPlans } from "../controller/userWorkOutPlanController.js";
import { validateUserWorkOutPlan } from "../middleware/userWorkoutPlanMiddleware.js";

const router = Router()

router.route("/").post(validateUserWorkOutPlan, handleAuth, createUserWorkOutPlan);
router.route("/:userId").get(handleAuth, getCurrentUserWorkOutPlans)
router.route("/history/:userId").get(handleAuth, getExpiredUserWorkOutPlans)
router.route("/:Id").delete(handleAuth, deleteUserWorkOutPlan)

export default router;