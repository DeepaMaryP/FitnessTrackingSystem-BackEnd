import mongoose from "mongoose";
import UserDietPlan from "../models/userDietPlan.js"

export const createUserDietPlanService = async (data) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
        const userId = data.userId
        await UserDietPlan.updateMany(
            { userId: userId },
            { $set: { status: "Expired", end_date: new Date() } }, { session }
        );

        let newUserDietPlan = new UserDietPlan(data)
        newUserDietPlan = await newUserDietPlan.save({ session });
        const plan = await newUserDietPlan.populate('diet_plan_id', 'plan_name')

        await session.commitTransaction();
        session.endSession();
        return { success: true, data: plan, message: "UserDietPlan created successfully" }
    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        console.log(error);
        return { success: false, data: null, message: "Failed to create UserDietPlan" }
    }
}

export const getExpiredUserDietPlanService = async (userId) => {
    try {
        const allUserDietPlan = await UserDietPlan.find({ userId: userId, endDate: { $lt: today } });;
        return { success: true, allUserDietPlan };

    } catch (error) {
        return { success: false }
    }
}

export const getUserCurrentDietPlansService = async (userId) => {
    try {
        const today = new Date()
        today.setHours(0, 0, 0, 0);

        const userDietPlan = await UserDietPlan.find({
            userId: userId, status: 'Active', end_date: { $gte: today }
        }).populate('diet_plan_id', 'plan_name');

        if (userDietPlan && userDietPlan.length > 0) {
            return {
                success: true, data: userDietPlan[0], message: "UserDietPlan fetched successfully",
            };
        }
        return { success: true, data: null, message: "UserDietPlan not found" }

    } catch (error) {
        return { success: false, data: null, message: "Failed to fetch UserDietPlan" }
    }
}

export const deleteUserDietPlanService = async (id) => {
    try {
        await UserDietPlan.findByIdAndDelete(id)
        return true;
    } catch (error) {
        console.log(error);
        return false;
    }
}