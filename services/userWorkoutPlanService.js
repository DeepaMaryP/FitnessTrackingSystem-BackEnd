import UserWorkOutPlan from "../models/userWorkOutPlan.js";

export const createUserWorkOutPlan = async (data) => {
    try {
        let newUserWorkOutPlan = new UserWorkOutPlan(data);
        newUserWorkOutPlan = await UserWorkOutPlan.save();
        return {success : true, UserWorkOutPlan:newUserWorkOutPlan}
    } catch (error) {
        console.log({error});
        return {
            success: false,
            message: error.message || "Failed to create UserWorkOutPlan",
            errors: error.errors || null, // contains field-level details (phone, email etc.)
        };
    }
}

export const getAllUserWorkOutPlanService = async () => {
    try {
        const allUserWorkOutPlan = await UserWorkOutPlan.find();
        return { success: true, allUserWorkOutPlan };

    } catch (error) {
        return { success: false }
    }
}

export const getUserWorkOutPlanWithId = async (id) => {
    try {
        const userWorkOutPlan = await UserWorkOutPlan.findById(id)
        if (userWorkOutPlan) {
            return userWorkOutPlan
        }
        return false

    } catch (error) {
        return false
    }
}

export const updateUserWorkOutPlanService = async (id, data) => {
    try {
        const updatedUserWorkOutPlan = await UserWorkOutPlan.findByIdAndUpdate(id, data);
        if (updatedUserWorkOutPlan) {
            return { success: true, message: "UserWorkOutPlan updated succesfully" }
        } else {
            return { success: false, message: "Failed to update" }
        }

    } catch (error) {
        console.log(error);
        return { success: false }

    }
}

export const deleteUserWorkOutPlanService = async(id) =>{
    try {
       await UserWorkOutPlan.findByIdAndDelete(id)
       return true;
    } catch (error) {
        console.log(error);
        return false;        
    }
}