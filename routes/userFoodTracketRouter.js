import { Router } from "express";
import { handleAuth } from "../middleware/auth.js";

import { validateFoodTracker, validateFoodTrackerByDates } from "../middleware/userFoodTrackerMIddleware.js";
import { createUserFoodTracker, getTodaysUserFoodTrackerByUserId, getUserFoodTrackerByDates } from "../controller/userFoodTrackerController.js";

const router = Router()

router.route("/").post(validateFoodTracker, handleAuth, createUserFoodTracker);
router.route("/logs/").get(handleAuth, validateFoodTrackerByDates, getUserFoodTrackerByDates)
router.route("/:userId").get(handleAuth, getTodaysUserFoodTrackerByUserId)

export default router;