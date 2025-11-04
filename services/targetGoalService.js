import mongoose from "mongoose";
import TargetGoal from "../models/targetGoal.js";

export const createTargetGoalService = async (data) => {
    const userId = data.userId
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
        // Remove old goals for this user
        await TargetGoal.deleteMany({ userId }, { session });

        let newTargetGoal = new TargetGoal(data);
        newTargetGoal = await newTargetGoal.save({ session });

        await session.commitTransaction();
        session.endSession();

        return { success: true }
    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        console.log({ error });
        return {
            success: false,
            message: error.message || "Failed to create TargetGoal",
            errors: error.errors || null, // contains field-level details (phone, email etc.)
        };
    }
}

export const getTargetGoalService = async (userId) => {
    try {
        const allTargetGoal = await TargetGoal.find({ userId: userId });
        if (!allTargetGoal || allTargetGoal.length === 0) {
            return {
                success: true, data: null, message: "TargetGoal not found",
            };
        }

        // Get the first profile 
        const targetGoalDoc = allTargetGoal[0];

        return {
            success: true,
            data: targetGoalDoc,
            message: "Goal fetched successfully",
        };

    } catch (error) {
        return {
            success: false,
            data: null,
            message: error.message || "Failed to fetch Goal",
        };
    }
}

export const getTargetGoalAndStatService = async (userId) => {
    try {
        const allTargetGoal = await TargetGoal.aggregate([
            { $match: { userId: mongoose.Types.ObjectId.createFromHexString(userId) } },
            {
                $lookup: {
                    from: "bodymeasurements",
                    localField: "userId",
                    foreignField: "userId",
                    as: "bodyMeasurements"
                },
            },
            {
                $project: {
                    goal_type: 1,
                    target_weight: 1,
                    duration_days: 1,
                    "bodyMeasurements.date": 1,
                    "bodyMeasurements.weight_kg": 1,
                }

            },
            {
                $addFields: {
                    sortedWeights: {
                        $sortArray: { input: "$bodyMeasurements", sortBy: { date: 1 } },
                    },
                    start_weight: { $arrayElemAt: ["$bodyMeasurements.weight_kg", 0] },
                    current_weight: {
                        $arrayElemAt: ["$bodyMeasurements.weight_kg",
                            { $subtract: [{ $size: "$bodyMeasurements" }, 1] }
                        ]
                    }
                }
            }
        ])

        if (allTargetGoal && allTargetGoal.length > 0) {
            return {
                success: true, data: allTargetGoal[0], message: "Goal fetched successfully",
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


export const updateTargetGoalService = async (id, data) => {
    try {
        const updatedTargetGoal = await TargetGoal.findByIdAndUpdate(id, data);
        if (updatedTargetGoal) {
            return { success: true, message: "TargetGoal updated succesfully" }
        } else {
            return { success: false, message: "Failed to update" }
        }

    } catch (error) {
        console.log(error);
        return { success: false }

    }
}
