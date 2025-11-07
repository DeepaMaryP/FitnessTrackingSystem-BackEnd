import { Router } from "express";
import { handleAuth } from "../middleware/auth.js";
import { getApprovalPendingTrainerCount, getEarnings, getGrowthPercentage, getRevenueGrowthReport, getSubscribedUsersWithoutTrainers, getTrainerAssignmentCount, getUserMetrics, getUserStatistics } from "../controller/reportController.js";

const router = Router()

router.route("/revenue/:year").get(handleAuth, getRevenueGrowthReport);
router.route("/revenuecurrentmonth/:date").get(handleAuth, getEarnings);
router.route("/goalstat").get(handleAuth, getGrowthPercentage)
router.route("/dash/metrics").get(handleAuth, getUserMetrics)
router.route("/dash/userstat").get(handleAuth, getUserStatistics)
router.route("/dash/trainerstat").get(handleAuth, getTrainerAssignmentCount)
router.route("/dash/pendingassignments").get(handleAuth, getSubscribedUsersWithoutTrainers)
router.route("/dash/approvalpending").get(handleAuth, getApprovalPendingTrainerCount)

export default router;