import { Router } from "express";
import { handleAuth } from "../middleware/auth.js";
import { createBodyMeasurement, getAllBodyMeasurements, getBodyMeasurementOfUser, updateBodyMeasurement } from "../controller/bodyMeasurementController.js";
import { validateBodyMeasurement } from "../middleware/bodyMeasuementMiddleware.js";

const router = Router()

router.route("/").post(validateBodyMeasurement, handleAuth, createBodyMeasurement);
router.route("/loggraph/:userId").get(handleAuth, getAllBodyMeasurements)
router.route("/:userId").get(handleAuth, getBodyMeasurementOfUser)
router.route("/:Id").patch(handleAuth, validateBodyMeasurement, updateBodyMeasurement)

export default router;