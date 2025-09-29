import UserDietPlan from "../models/userDietPlan.js"

export const createUserDietPlanService = async (data) => {
    try {
        let newUserDietPlan = new UserDietPlan(data)
        newUserDietPlan = await newUserDietPlan.save()
        return { success: true }
    } catch (error) {
        console.log(error);
        return {
            success: false,
            message: error.message || "Failed to create UserDietPlan",
            errors: error.errors || null, // contains field-level details (phone, email etc.)
        };
    }
}

export const getExpiredUserDietPlanService = async (userId) => {
    try {
        const allUserDietPlan = await UserDietPlan.find({ userId: userId,  endDate: { $lt: today } } );;
        return { success: true, allUserDietPlan };

    } catch (error) {
        return { success: false }
    }
}

export const getUserCurrentDietPlansService = async (userId) => {
    try {
        const userDietPlan = await UserDietPlan.find({
            userId: userId, startDate: { $lte: today },
            endDate: { $gte: today }
        });
        if (userDietPlan) {
            return userDietPlan
        }
        return false

    } catch (error) {
        return false
    }
}

export const deleteUserDietPlanService = async(id) =>{
    try {
       await UserDietPlan.findByIdAndDelete(id)
       return true;
    } catch (error) {
        console.log(error);
        return false;        
    }
}