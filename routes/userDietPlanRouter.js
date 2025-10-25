import { Router } from "express";
import { handleAuth } from "../middleware/auth.js";

import { createUserDietPlan, deleteUserDietPlan, getCurrentUserDietPlans, getExpiredUserDietPlans } from "../controller/userDietPlanController.js";
import { validateUserDietPlan } from "../middleware/userDietPlanMiddleware.js";

const router = Router()

router.route("/").post(validateUserDietPlan, handleAuth, createUserDietPlan);
router.route("/:userId").get(handleAuth, getCurrentUserDietPlans)
router.route("/history/:userId").get(handleAuth, getExpiredUserDietPlans)
router.route("/:Id").delete(handleAuth, deleteUserDietPlan)

export default router;