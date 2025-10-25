import { Router } from "express";
import { handleAuth } from "../middleware/auth.js";
import { validateWorkOutPlan } from "../middleware/workoutPlanMiddleware.js";
import { createWorkOutPlan, deleteWorkOutPlan, getWorkOutPlan, getWorkOutPlanById, updateWorkOutPlan } from "../controller/workOutPlanController.js";


const router = Router()

router.route("/").post(validateWorkOutPlan, handleAuth, createWorkOutPlan);
router.route("/").get(handleAuth, getWorkOutPlan)
router.route("/user/:Id").get(handleAuth, getWorkOutPlan)
router.route("/:Id").get(handleAuth, getWorkOutPlanById)
router.route("/:Id").patch(handleAuth,validateWorkOutPlan, updateWorkOutPlan)
router.route("/:Id").delete(handleAuth, deleteWorkOutPlan)

export default router;