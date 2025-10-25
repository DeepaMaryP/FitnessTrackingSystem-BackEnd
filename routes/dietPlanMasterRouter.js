import { Router } from "express";
import { handleAuth } from "../middleware/auth.js";
import { createDietPlan, deleteDietPlan, getDietPlan, getDietPlanById, updateDietPlan } from "../controller/dietPlanMasterController.js";
import { validateDietPlan } from "../middleware/dietPlanMasterMiddleware.js";

const router = Router()

//trainer
router.route("/").post(validateDietPlan, handleAuth, createDietPlan);
router.route("/").get(handleAuth, getDietPlan)
router.route("/user/:Id").get(handleAuth, getDietPlanById)
router.route("/:Id").get(handleAuth, getDietPlanById)
router.route("/:Id").patch(handleAuth,validateDietPlan, updateDietPlan)
router.route("/:Id").delete(handleAuth, deleteDietPlan)

export default router;