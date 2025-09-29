import { Router } from "express";
import { handleAuth } from "../middleware/auth.js";
import { createBodyMeasurement, getBodyMeasurementHistory, getCurrentBodyMeasurement, updateBodyMeasurement } from "../controller/bodyMeasurementController.js";
import { validateBodyMeasurement } from "../middleware/bodyMeasuementMiddleware.js";

const router = Router()

router.route("/").post(validateBodyMeasurement, handleAuth, createBodyMeasurement);
router.route("/:userId").get(handleAuth, getCurrentBodyMeasurement)
router.route("/history/:userId").get(handleAuth, getBodyMeasurementHistory)
router.route("/:Id").patch(handleAuth, validateBodyMeasurement, updateBodyMeasurement)

export default router;