import mongoose from "mongoose";
import TrainerProfile from "../models/trainerProfile.js";
import User from "../models/user.js";

export const createUserService = async (data) => {
    try {
        let newUser = new User(data);
        newUser = await newUser.save();
        return { success: true, user: newUser }
    } catch (error) {
        console.log({ error });
        return {
            success: false,
            message: error.message || "Failed to create user",
            errors: error.errors || null, // contains field-level details (phone, email etc.)
        };
    }
}

export const createUserTrainerService = async (user, trainer) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        let newUser = new User(user);
        newUser = await newUser.save({ session });
        trainer.userId = newUser._id //assign the new userid to trainer profile

        let newTrainer = new TrainerProfile(trainer);
        newTrainer = await newTrainer.save({ session });

        await session.commitTransaction();
        return { success: true, user: newUser, trainer: newTrainer }
    } catch (error) {
        console.log({ error });
        await session.abortTransaction();
        return {
            success: false,
            message: error.message || "Failed to create user trainer",
            errors: error.errors || null, // contains field-level details (phone, email etc.)
        };
    } finally {
        session.endSession();
    }
}

export const getUserDetailsWithEmail = async (email) => {
    try {
        const user = await User.findOne({ email })
        if (user) {
            return user
        }
        return false
    } catch (error) {
        return false
    }
}

export const getAllUsersService = async () => {
    try {
        const allUsers = await User.find({ status: "Active" });
        return { success: true, allUsers };

    } catch (error) {
        return { success: false }
    }
}

export const getAllActiveUnAssignedPaidUsersService = async () => {
    try {
        const unassignedUsers = await User.aggregate([
            {
                $match: { status: "Active", role: "User" }
            },
            {
                $lookup: {
                    from: "usertrainers",
                    localField: "_id",
                    foreignField: "userId",
                    as: "assignments"
                }
            },
            {
                $match: { assignments: { $size: 0 } } // only users with no assignments
            }
        ]);

        return { success: true, unassignedUsers };

    } catch (error) {
        return { success: false }
    }
}

export const getAllActivePaidUsersService = async () => {
    try {
        const allUsers = await User.find({ status: "Active", role: "User" });
        return { success: true, allUsers };

    } catch (error) {
        return { success: false }
    }
}

export const getUsersMetricsForDashboardService = async () => {
    try {
        const userCounts = await User.aggregate([
            { $match: { role: "User" } }, // Exclude Admin & Trainer
            {
                $group: {
                    _id: null,
                    totalRegdUsers: { $sum: 1 },
                    activeUsers: { $sum: { $cond: [{ $eq: ["$status", "Active"] }, 1, 0] } },
                }
            }
        ]);

        return { success: true, userCounts };

    } catch (error) {
        console.log(error);
        return { success: false }
    }
}

export const getUserStatisticsService = async () => {
    try {
        const sixMonthAgo = new Date();
        sixMonthAgo.setMonth((new Date().getMonth() - 6));

        const userCounts = await User.aggregate([
            { $match: { createdAt: { $gte: sixMonthAgo } } },
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


export const getUserWithId = async (id) => {
    try {
        const user = await User.findById(id)
        if (user) {
            return user
        }
        return false

    } catch (error) {
        return false
    }
}

export const updateUserService = async (id, data) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(id, data);
        if (updatedUser) {
            return { success: true, message: "User updated succesfully" }
        } else {
            return { success: false, message: "Failed to update" }
        }

    } catch (error) {
        console.log(error);
        return { success: false }

    }
}

export const updateUserTrainerService = async (id, user, trainer) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
        const updatedUser = await User.findByIdAndUpdate(id, user, { new: true, session });
        await TrainerProfile.updateOne({ userId: id }, trainer, { session });

        await session.commitTransaction();

        if (updatedUser) {
            return { success: true, message: "User updated succesfully" }
        } else {
            return { success: false, message: "Failed to update" }
        }

    } catch (error) {
        console.log(error);
        await session.abortTransaction();
        return { success: false }

    } finally {
        session.endSession();
    }
}

export const deleteUserService = async (id) => {
    try {
        await User.findByIdAndUpdate(id, { $set: { status: "InActive" } })
        return true;
    } catch (error) {
        console.log(error);
        return false;
    }
}