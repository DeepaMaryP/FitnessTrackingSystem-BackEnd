import { Router } from "express";
import { handleAuth } from "../middleware/auth.js";
import { createFoodMaster, deleteFoodMaster, getFoodMaster, getFoodMasterById, updateFoodMaster } from "../controller/foodMasterController.js";
import { validateFoodMaster } from "../middleware/foodMasterMiddleware.js";

const router = Router()

router.route("/").post(validateFoodMaster, handleAuth, createFoodMaster);
router.route("/").get(handleAuth, getFoodMaster)
router.route("/:Id").get(handleAuth, getFoodMasterById)
router.route("/:Id").patch(handleAuth,validateFoodMaster, updateFoodMaster)
router.route("/:Id").delete(handleAuth, deleteFoodMaster)

export default router;