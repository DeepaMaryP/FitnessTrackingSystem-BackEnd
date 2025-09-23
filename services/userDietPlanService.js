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

export const getAllUserDietPlanService = async () => {
    try {
        const allUserDietPlan = await UserDietPlan.find();
        return { success: true, allUserDietPlan };

    } catch (error) {
        return { success: false }
    }
}

export const getUserDietPlanWithId = async (id) => {
    try {
        const userDietPlan = await UserDietPlan.findById(id)
        if (userDietPlan) {
            return userDietPlan
        }
        return false

    } catch (error) {
        return false
    }
}

export const updateUserDietPlanService = async (id, data) => {
    try {
        const updatedUserDietPlan = await UserDietPlan.findByIdAndUpdate(id, data);
        if (updatedUserDietPlan) {
            return { success: true, message: "UserDietPlan updated succesfully" }
        } else {
            return { success: false, message: "Failed to update" }
        }

    } catch (error) {
        console.log(error);
        return { success: false }

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