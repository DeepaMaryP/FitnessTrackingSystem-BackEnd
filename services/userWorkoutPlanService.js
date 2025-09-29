import UserWorkOutPlan from "../models/userWorkOutPlan.js";

export const createUserWorkOutPlanService = async (data) => {
    try {
        let newUserWorkOutPlan = new UserWorkOutPlan(data);
        newUserWorkOutPlan = await UserWorkOutPlan.save();
        return { success: true, UserWorkOutPlan: newUserWorkOutPlan }
    } catch (error) {
        console.log({ error });
        return {
            success: false,
            message: error.message || "Failed to create UserWorkOutPlan",
            errors: error.errors || null, // contains field-level details (phone, email etc.)
        };
    }
}

export const getExpiredUserWorkOutPlanService = async (userId) => {
    try {
        const allUserWorkOutPlan = await UserWorkOutPlan.find({ userId: userId,  endDate: { $lt: today } } );
        return { success: true, allUserWorkOutPlan };

    } catch (error) {
        return { success: false }
    }
}

export const getUserCurrentWorkOutPlansService = async (userId) => {
    try {
        const userWorkOutPlan = await UserWorkOutPlan.find({
            userId: userId, startDate: { $lte: today },
            endDate: { $gte: today }
        });
        if (userWorkOutPlan) {
            return userWorkOutPlan
        }
        return false

    } catch (error) {
        return false
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