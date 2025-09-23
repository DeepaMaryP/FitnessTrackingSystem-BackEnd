import { Router } from "express";

import { handleAuth } from "../middleware/auth.js";
import { validateUserProfile } from "../middleware/userProfileMiddleware.js";
import { createUserProfile, getUserProfileById, updateUserProfile } from "../controller/userProfileController.js";
const router = Router()

router.route("/").post(validateUserProfile, handleAuth, createUserProfile);
router.route("/:userId").get(handleAuth, getUserProfileById)
router.route("/:userId").patch(handleAuth, updateUserProfile)

export default router;