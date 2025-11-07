import TargetGoal from "../models/targetGoal.js";
import TrainerProfile from "../models/trainerProfile.js";
import User from "../models/user.js";
import UserPayment from "../models/userPayment.js";
import UserTrainer from "../models/userTrainer.js";

export const getRevenueGrowthReportService = async (year) => {
    try {
        const monthlyData = await UserPayment.aggregate([
            {
                $match: {
                    status: "Completed",
                    $expr: { $eq: [{ $year: "$payment_date" }, year] },
                },
            },
            {
                $group: {
                    _id: { month: { $month: "$payment_date" } },
                    totalRevenue: { $sum: "$amount" },
                    count: { $sum: 1 },
                },
            },
            { $sort: { "_id.month": 1 } },
        ]);

        return { success: true, data: monthlyData };
    } catch (error) {
        console.error(error);
        return { success: false, data: null, message: "Error generating revenue growth report" };
    }
};

export const getGrowthPercentageService = async () => {
    try {
        const allTargetGoal = await TargetGoal.aggregate([
            {
                $lookup: {
                    from: "bodymeasurements",
                    localField: "userId",
                    foreignField: "userId",
                    as: "measurements",
                },
            },
            {
                $addFields: {
                    sortedMeasurements: {
                        $sortArray: { input: "$measurements", sortBy: { date: 1 } },
                    },
                    startWeight: { $arrayElemAt: ["$measurements.weight_kg", 0] },
                    latestWeight: {
                        $arrayElemAt: [
                            "$measurements.weight_kg",
                            { $subtract: [{ $size: "$measurements" }, 1] },
                        ],
                    },
                },
            },
            {
                $addFields: {
                    achieved: {
                        $switch: {
                            branches: [
                                {
                                    case: { $eq: ["$goal_type", "Weight Loss"] },
                                    then: { $lte: ["$latestWeight", "$target_weight"] },
                                },
                                {
                                    case: { $eq: ["$goal_type", "Weight Gain"] },
                                    then: { $gte: ["$latestWeight", "$target_weight"] },
                                },
                            ],
                            default: false,
                        },
                    },
                },
            },
            {
                $group: {
                    _id: {
                        year: { $year: "$createdAt" },
                        month: { $month: "$createdAt" },
                    },
                    totalGoals: { $sum: 1 },
                    achievedGoals: { $sum: { $cond: ["$achieved", 1, 0] } },
                },
            },

            {
                $addFields: {
                    achievementRate: {
                        $multiply: [{ $divide: ["$achievedGoals", "$totalGoals"] }, 100],
                    },
                },
            },
            { $sort: { "_id.year": 1, "_id.month": 1 } },
        ]);


        if (allTargetGoal) {
            return {
                success: true, data: allTargetGoal, message: "Growth Percentage fetched successfully",
            };
        }

        return {
            success: true,
            data: null,
            message: "Growth Percentage not found",
        };

    } catch (error) {
        return {
            success: false,
            data: null,
            message: error.message || "Failed to fetch Growth Percentage",
        };
    }
}

export const getUsersMetricsForDashboardService = async () => {
    try {
        const userCounts = await User.aggregate([
            { $match: { role: "User" } }, // Exclude Admin & Trainer
            {
                $lookup: {
                    from: "userpayments",
                    localField: "_id",
                    foreignField: "userId",
                    as: "paymentInfo"
                }
            },
            {
                $addFields: {
                    hasPaid: {
                        $gt: [{
                            $size: {
                                $filter: {
                                    input: "$paymentInfo",
                                    as: "p",
                                    cond: { $eq: ["$$p.status", "Completed"] }
                                }
                            }
                        }, 0]
                    }
                }
            },
            {
                $group: {
                    _id: null,
                    totalRegdUsers: { $sum: 1 },
                    paidUsers: { $sum: { $cond: ["$hasPaid", 1, 0] } },
                }
            }
        ]);

        return { success: true, userCounts };

    } catch (error) {
        console.log(error);
        return { success: false }
    }
}

export const getEarningsService = async (year, month) => {
    try {
        const monthlyData = await UserPayment.aggregate([
            {
                $match: {
                    status: "Completed",
                    $expr: {
                        $and: [
                            { $eq: [{ $year: "$payment_date" }, year] },
                            { $eq: [{ $month: "$payment_date" }, month] }
                        ]
                    },
                },
            },
            {
                $group: {
                    _id: null,
                    totalRevenue: { $sum: "$amount" },
                },
            },
        ]);

        return { success: true, data: monthlyData };
    } catch (error) {
        console.error(error);
        return { success: false, data: null, message: "Error fetching total revenue" };
    }
};

export const getUserStatisticsService = async () => {
    try {
        const sixMonthAgo = new Date();
        sixMonthAgo.setMonth((new Date().getMonth() - 6));

        const userCounts = await User.aggregate([
            {
                $match: {
                    role: "User",
                    createdAt: { $gte: sixMonthAgo }
                }
            },
            {
                $group: {
                    _id: {
                        year: { $year: "$createdAt" },
                        month: { $month: "$createdAt" }
                    }, count: { $sum: 1 }
                }
            },
            { $sort: { "_id.year": 1, "_id.month": 1 } }
        ]);

        return { success: true, userCounts };

    } catch (error) {
        console.log(error);
        return { success: false }
    }
}

export const getTrainerAssignmentCountService = async () => {
    try {
        const trainerStats = await UserTrainer.aggregate([
            {
                $match: {
                    $or: [
                        { end_date: null },
                        { end_date: { $gte: new Date() } }
                    ]
                }
            },
            {
                $group: {
                    _id: "$trainer_id", // group by trainer
                    totalUsers: { $sum: 1 }
                }
            },
            {
                $lookup: {
                    from: "users",
                    localField: "_id",
                    foreignField: "_id",
                    as: "trainerInfo"
                }
            },
            {
                $unwind: "$trainerInfo"
            },
            {
                $project: {
                    _id: 0,
                    trainerId: "$_id",
                    trainerName: "$trainerInfo.name",
                    totalUsers: 1
                }
            },
            { $sort: { totalUsers: -1 } } // optional: highest first
        ]);

        return { success: true, trainerStats };
    } catch (error) {
        console.log(error);
        return { success: false }
    }
}

export const getSubscribedUsersWithoutTrainersService = async () => {
    try {
        const today = new Date();
        const result = await UserPayment.aggregate([
            {
                $match: {
                    status: "Completed",
                    expiry_date: { $gte: today }
                }
            },
            {
                $lookup: {
                    from: "usertrainers",
                    localField: "userId",
                    foreignField: "userId",
                    as: "trainerAssignments"
                }
            },

            // Filter users with no trainer or all expired assignments
            {
                $match: {
                    $or: [
                        { trainerAssignments: { $size: 0 } },
                        {
                            $expr: {
                                $not: {
                                    $anyElementTrue: {
                                        $map: {
                                            input: "$trainerAssignments",
                                            as: "ta",
                                            in: {
                                                $or: [
                                                    { $eq: ["$$ta.end_date", null] },
                                                    { $gte: ["$$ta.end_date", today] }
                                                ]
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    ]
                }
            },           
            {
                $count: "unassignedSubscribedUsers"
            }
        ]);

        // Return the count (default to 0 if none)
        return {success: true, count : result[0]?.unassignedSubscribedUsers || 0 };
    }
    catch (error) {
        console.log(error);
        return { success: false }
    }
}

export const getApprovalPendingTrainerCountService = async () =>{
    try {
        const pendingTrainerCount = await TrainerProfile.countDocuments({ approvedStatus: "pending" });
        return {success : true, count : pendingTrainerCount}

    } catch (error) {
        return {success : false}
    }
}
