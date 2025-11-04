import { Router } from "express";
import { handleAuth } from "../middleware/auth.js";
import { validateTargetGoal } from "../middleware/targetGoalMiddleware.js";
import { createTargetGoal, getGrowthPercentage, getTargetGoal, getTargetGoalAndStat, updateTargetGoal } from "../controller/targetGoalController.js";

const router = Router()

router.route("/").post(validateTargetGoal, handleAuth, createTargetGoal);
router.route("/goalstat").get(handleAuth, getGrowthPercentage)
router.route("/userstat/:userId").get(handleAuth, getTargetGoalAndStat)
router.route("/:userId").get(handleAuth, getTargetGoal)
router.route("/:Id").patch(handleAuth, validateTargetGoal, updateTargetGoal)

export default router;