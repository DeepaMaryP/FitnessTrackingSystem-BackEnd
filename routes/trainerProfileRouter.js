import { Router } from "express";
import { handleAuth } from "../middleware/auth.js";
import { validateTrainer } from "../middleware/trainerProfileMiddleware.js";
import { approveTrainers, createTrainerProfile, deleteTrainerProfile, getApprovedTrainerCount, getPendingTrainerCount, getTrainerProfileByUserId, getTrainersProfile, updateTrainerProfile, updateVerificationDocuments } from "../controller/trainerProfileController.js";
import { validateUser } from "../middleware/userMiddleware.js";

const router = Router()

//admin
router.route("/").post(validateUser, validateTrainer, handleAuth, createTrainerProfile);
router.route("/").get(handleAuth, getTrainersProfile)
router.route("/dash/approved").get(handleAuth, getApprovedTrainerCount)
router.route("/dash/pending").get(handleAuth, getPendingTrainerCount)
router.route("/:userId").get(handleAuth, getTrainerProfileByUserId)

router.route("/:userId").patch(handleAuth, updateTrainerProfile)
router.route("/verify/:id").patch(handleAuth, approveTrainers)
router.route("/:userId").delete(handleAuth, deleteTrainerProfile)

//trainer
router.route("/cert/:userId").patch(handleAuth, updateVerificationDocuments)

export default router;