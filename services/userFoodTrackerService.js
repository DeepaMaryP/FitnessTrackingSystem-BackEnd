import mongoose from "mongoose";
import UserFoodTracker from "../models/userFoodTracker.js"

export const createUserFoodTrackerService = async (data) => {
    const userId = data.userId
    const today = new Date();
    today.setHours(0, 0, 0, 0); // start of today

    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1); // start of tomorrow

    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        // Remove todays existing tracks for this user
        await UserFoodTracker.deleteMany({ userId: userId, date: { $gte: today, $lt: tomorrow } }, { session });

        let newUserFoodTracker = new UserFoodTracker(data)
        newUserFoodTracker = await newUserFoodTracker.save({ session })

        await session.commitTransaction();
        session.endSession();

        return { success: true }
    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        console.log(error);
        return {
            success: false,
            message: error.message || "Failed to create UserFoodTracker",
            errors: error.errors || null, // contains field-level details (phone, email etc.)
        };
    }
}

export const getAllUserFoodTrackerService = async () => {
    try {
        const allUserFoodTracker = await UserFoodTracker.find();
        return { success: true, allUserFoodTracker };

    } catch (error) {
        return { success: false }
    }
}

export const getTodaysFoodTrackerWithUserIdService = async (userId) => {
    try {
        const today = new Date();
        today.setHours(0, 0, 0, 0); // start of today

        const tomorrow = new Date(today);
        tomorrow.setDate(today.getDate() + 1); // start of tomorrow

        const userFoodTracker = await UserFoodTracker.findOne({ userId: userId, date: { $gte: today, $lt: tomorrow } })
                                                                .populate('meals.food_items.food_id', 'name');
        if (userFoodTracker) {
            return {
                success: true, data: userFoodTracker, message: "Food Tracker fetched successfully",
            };
        }
        return {
            success: true, data: null, message: "Food Tracker not found",
        };

    } catch (error) {
        return {
            success: false,
            data: null,
            message: error.message || "Failed to Food Tracker",
        };
    }
}

