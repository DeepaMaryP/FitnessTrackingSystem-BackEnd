import { Router } from "express";
import { handleAuth } from "../middleware/auth.js";

import { validateFoodTracker } from "../middleware/userFoodTrackerMIddleware.js";
import { createUserFoodTracker, getTodaysUserFoodTrackerByUserId } from "../controller/userFoodTrackerController.js";

const router = Router()

router.route("/").post(validateFoodTracker, handleAuth, createUserFoodTracker);
router.route("/:userId").get(handleAuth, getTodaysUserFoodTrackerByUserId)


export default router;