import TargetGoal from "../models/targetGoal.js";
import UserPayment from "../models/userPayment.js";

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
    
    return {success : true, data: monthlyData};
  } catch (error) {
    console.error(error);
    return {success : false, data: null , message: "Error generating revenue growth report" };   
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


        if (allTargetGoal ) {
            return {
                success: true, data: allTargetGoal, message: "Goal fetched successfully",
            };
        }

        return {
            success: true,
            data: null,
            message: "TargetGoal not found",
        };

    } catch (error) {
        return {
            success: false,
            data: null,
            message: error.message || "Failed to fetch Goal",
        };
    }
}