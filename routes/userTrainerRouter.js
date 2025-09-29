import { Router } from "express";
import { handleAuth } from "../middleware/auth.js";
import { createUserTrainer, deleteUserTrainer, getUserTrainers, getUserTrainerStatistics } from "../controller/userTrainerController.js";
import { validateUserTrainer } from "../middleware/userTrainerMiddleware.js";

const router = Router()

router.route("/").post(validateUserTrainer, handleAuth, createUserTrainer);
router.route("/:userId").get(handleAuth, getUserTrainers)
router.route("/dash/trainerstat").get(handleAuth, getUserTrainerStatistics)
router.route("/:Id").delete(handleAuth, deleteUserTrainer)

export default router;