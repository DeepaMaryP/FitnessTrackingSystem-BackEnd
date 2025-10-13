import { Router } from "express";
import { handleAuth } from "../middleware/auth.js";
import { createUserTrainer, deleteUserTrainer, getAllUserTrainers, getUserTrainers, getUserTrainerStatistics } from "../controller/userTrainerController.js";
import { validateUserTrainer } from "../middleware/userTrainerMiddleware.js";

const router = Router()

router.route("/").get(handleAuth, getAllUserTrainers)
router.route("/").post(validateUserTrainer, handleAuth, createUserTrainer);
router.route("/:userId").get(handleAuth, getUserTrainers)
router.route("/dash/trainerstat").get(handleAuth, getUserTrainerStatistics)
router.route("/:userId").delete(handleAuth, deleteUserTrainer)

export default router;