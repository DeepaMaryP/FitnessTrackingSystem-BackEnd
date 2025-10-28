import { Router } from "express";
import { handleAuth } from "../middleware/auth.js";

import { validateWorkOutTracker } from "../middleware/userWorkOutTrackerMiddleware.js";
import { createUserWorkOutTracker, getTodaysUserWorkOutTrackerByUserId, getUserWorkOutTracker, getUserWorkOutTrackerByDates } from "../controller/userWorkOutTrackerController.js";

const router = Router()

router.route("/").post(validateWorkOutTracker, handleAuth, createUserWorkOutTracker);
router.route("/logs/").get(handleAuth, getUserWorkOutTrackerByDates)
router.route("/tracker/").get(handleAuth, getUserWorkOutTracker)
router.route("/:userId").get(handleAuth, getTodaysUserWorkOutTrackerByUserId)

export default router;