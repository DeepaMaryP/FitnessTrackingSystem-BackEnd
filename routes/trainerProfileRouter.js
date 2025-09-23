import { Router } from "express";
import { handleAuth } from "../middleware/auth.js";
import { validateTrainer } from "../middleware/trainerProfileMiddleware.js";
import { createTrainerProfile, deleteTrainerProfile, getTrainerProfileById, getTrainersProfile, updateTrainerProfile } from "../controller/trainerProfileController.js";
import { validateUser } from "../middleware/userMiddleware.js";

const router = Router()

//admin
router.route("/").post(validateUser, validateTrainer, handleAuth, createTrainerProfile);
router.route("/").get(handleAuth, getTrainersProfile)
router.route("/:userId").get(handleAuth, getTrainerProfileById)
router.route("/:userId").patch(handleAuth, updateTrainerProfile)
router.route("/:userId").delete(handleAuth, deleteTrainerProfile)


//trainer
//update doc pending

export default router;