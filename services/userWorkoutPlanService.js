import mongoose from "mongoose";
import UserWorkOutPlan from "../models/userWorkOutPlan.js";

export const createUserWorkOutPlanService = async (data) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
        const userId = data.userId
        await UserWorkOutPlan.updateMany(
            { userId: userId },
            { $set: { status: "Expired", end_date: new Date() } }, { session }
        );

        let newUserWorkOutPlan = new UserWorkOutPlan(data);
        newUserWorkOutPlan = await newUserWorkOutPlan.save({ session });
        const plan = await newUserWorkOutPlan.populate('workout_plan_id', 'name')

        await session.commitTransaction();
        session.endSession();
        return { success: true, data: plan, message: "UserWorkOutPlan created successfully" }
    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        console.log({ error });
        return { success: false, data: null, message: "Failed to create UserWorkOutPlan" }
    }
}

export const getExpiredUserWorkOutPlanService = async (userId) => {
    try {
        const allUserWorkOutPlan = await UserWorkOutPlan.find({ userId: userId, endDate: { $lt: today } });
        return { success: true, allUserWorkOutPlan };

    } catch (error) {
        return { success: false }
    }
}

export const getUserCurrentWorkOutPlansService = async (userId) => {
    try {
        const today = new Date()
        today.setHours(0, 0, 0, 0);

        const userWorkOutPlan = await UserWorkOutPlan.find({
            userId: userId, status: 'Active', end_date: { $gte: today }
        }).populate('workout_plan_id', 'name');

        if (userWorkOutPlan && userWorkOutPlan.length > 0) {
            return {
                success: true, data: userWorkOutPlan[0], message: "userWorkOutPlan fetched successfully",
            };
        }
        return { success: true, data: null, message: "userWorkOutPlan not found" }

    } catch (error) {
        return { success: false, data: null, message: "Failed to fetch userWorkOutPlan" }
    }
}

export const deleteUserWorkOutPlanService = async (id) => {
    try {        
        await UserWorkOutPlan.findByIdAndDelete(id)
        return true;
    } catch (error) {
        console.log(error);
        return false;
    }
}