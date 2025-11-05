import { Router } from "express";
import { handleAuth } from "../middleware/auth.js";
import { getGrowthPercentage, getRevenueGrowthReport } from "../controller/reportController.js";

const router = Router()

router.route("/revenue/:year").get(handleAuth, getRevenueGrowthReport);
router.route("/goalstat").get(handleAuth, getGrowthPercentage)


export default router;