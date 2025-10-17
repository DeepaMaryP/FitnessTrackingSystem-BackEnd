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
