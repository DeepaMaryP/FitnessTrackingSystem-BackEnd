import { Router } from "express";
import { handleAuth } from "../middleware/auth.js";
import { createExerciseMaster, deleteExerciseMaster, getExerciseMaster, getExerciseMasterById, updateExerciseMaster } from "../controller/exerciseMasterController.js";
import { validateExerciseMaster } from "../middleware/exerciseMasterMiddleware.js";

const router = Router()

router.route("/").post(validateExerciseMaster, handleAuth, createExerciseMaster);
router.route("/").get(handleAuth, getExerciseMaster)
router.route("/:Id").get(handleAuth, getExerciseMasterById)
router.route("/:Id").patch(handleAuth, validateExerciseMaster, updateExerciseMaster)
router.route("/:Id").delete(handleAuth, deleteExerciseMaster)

export default router;