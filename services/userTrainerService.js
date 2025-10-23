import mongoose from "mongoose";
import UserTrainer from "../models/userTrainer.js";

export const createUserTrainerService = async (userTrainer) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    const userId = userTrainer.userId
    const start_date = userTrainer.start_date
    const end_date = userTrainer.end_date

    try {
        // Remove old trainer assignments for this user 
        await UserTrainer.deleteMany({ userId }, { session });

        // Create new assignments
        for (const trainerId of userTrainer.trainerIds) {
            const newAssignment = new UserTrainer({
                userId,
                trainer_id: trainerId,
                start_date,
                end_date
            });
            await newAssignment.save({ session });
        }

        await session.commitTransaction();
        session.endSession();

        return { success: true }
    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        console.log({ error });
        return {
            success: false,
            message: error.message || "Failed to create UserTrainer",
            errors: error.errors || null, // contains field-level details (phone, email etc.)
        };
    }
}

export const getUserTrainersService = async (userId) => {
    try {
        const allUserTrainers = await UserTrainer.find({ userId: userId })
            .populate('userId', 'name').populate('trainer_id', 'name');
        return { success: true, allUserTrainers };

    } catch (error) {
        console.log(error);
        return { success: false }
    }
}

export const getUserAssignedToTrainerService = async (trainerId) => {
    try {

        const assignedUsers = await UserTrainer.aggregate([           
            { $match: { trainer_id: mongoose.Types.ObjectId.createFromHexString(trainerId) } },
            // Lookup user details
            {
                $lookup: {
                    from: "users",
                    localField: "userId",
                    foreignField: "_id",
                    as: "user",
                },
            },
            { $unwind: "$user" },

            // Lookup target goal
            {
                $lookup: {
                    from: "targetgoals",localField: "userId",foreignField: "userId", as: "goal",
                },
            }, { $unwind: { path: "$goal", preserveNullAndEmptyArrays: true } },

            // Lookup body measurements
            {
                $lookup: {
                    from: "bodymeasurements",localField: "userId",foreignField: "userId", as: "measurements",
                },
            },

            // Sort measurements by date and get first & last
            {
                $addFields: {
                    measurements: { $sortArray: { input: "$measurements", sortBy: { date: 1 } } },
                    starting_weight: { $arrayElemAt: ["$measurements.weight_kg", 0] },
                    latest_weight: { $arrayElemAt: ["$measurements.weight_kg", -1] },
                },
            },

            // Project final fields
            {
                $project: {
                    _id: 0,
                    userId: "$user._id",
                    name: "$user.name",                    
                    goal_type: "$goal.goal_type",
                    target_weight: "$goal.target_weight",
                    starting_weight: 1,
                    latest_weight: 1,
                },
            },
        ]);
        return { success: true, data : assignedUsers };

    } catch (error) {
        console.log(error);
        return { success: false, data : null }
    }
}

export const getAllUserTrainersService = async () => {
    try {
        const allUserTrainers = await UserTrainer.aggregate([
            // Join user details (main user)
            {
                $lookup: {
                    from: "users", localField: "userId", foreignField: "_id", as: "user"
                }
            },
            { $unwind: "$user" },
            // Join trainer details
            {
                $lookup: {
                    from: "users", localField: "trainer_id", foreignField: "_id", as: "trainer"
                }
            },
            { $unwind: "$trainer" },

            // Group trainers by user
            {
                $group: {
                    _id: "$userId", userId: { $first: "$user._id" }, userName: { $first: "$user.name" }, trainerNames: { $addToSet: "$trainer.name" },
                    startDate: { $first: "$start_date" },
                    endDate: { $first: "$end_date" }
                }
            },

            // Format trainer names and dates
            {
                $project: {
                    _id: 0, userId: 1, userName: 1,
                    trainerNames: {  // Join trainer names as comma-separated string
                        $reduce: {
                            input: "$trainerNames",
                            initialValue: "",
                            in: {
                                $concat: [
                                    "$$value",
                                    { $cond: [{ $eq: ["$$value", ""] }, "", ", "] },
                                    "$$this"
                                ]
                            }
                        }
                    },

                    // Format all startDates to dd-mm-yyyy
                    startDate: {
                        $dateToString: { format: "%d-%m-%Y", date: "$startDate" }
                    },
                    endDate: {
                        $dateToString: { format: "%d-%m-%Y", date: "$endDate" }
                    }
                }
            }
        ]);

        return { success: true, allUserTrainers };

    } catch (error) {
        console.log(error);
        return { success: false }
    }
}

export const getUserTrainerStatisticsService = async () => {
    try {
        const trainerUserCount = await UserTrainer.aggregate([
            {
                $group: {
                    _id: "$trainer_id",
                    userCount: { $sum: 1 }
                }
            }, { $sort: { userCount: -1 } },
            { $limit: 5 }, {
                $lookup: {
                    from: "Users",
                    localField: "_id",
                    foreignField: "_id",
                    as: "trainer"
                }
            }, { $unwind: "$trainer" }, {
                $project: {
                    _id: 0,
                    trainerId: "$trainer._id",
                    name: "$trainer.name",
                    email: "$trainer.email",
                    userCount: 1
                }
            }
        ])
        return { success: true, trainerUserCount };

    } catch (error) {
        console.log(error);
        return { success: false }
    }
}

export const deleteUserTrainerService = async (userid) => {
    try {
        await UserTrainer.deleteMany({ userId: userid });
        return true;
    } catch (error) {
        console.log(error);
        return false;
    }
}