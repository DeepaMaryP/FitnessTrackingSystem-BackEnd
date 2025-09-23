import UserFoodTracker from "../models/userFoodTracker.js"

export const createUserFoodTrackerService = async (data) => {
    try {
        let newUserFoodTracker = new UserFoodTracker(data)
        newUserFoodTracker = await newUserFoodTracker.save()
        return { success: true }
    } catch (error) {
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

export const getUserFoodTrackerWithId = async (id) => {
    try {
        const userFoodTracker = await UserFoodTracker.findById(id)
        if (userFoodTracker) {
            return userFoodTracker
        }
        return false

    } catch (error) {
        return false
    }
}

export const updateUserFoodTrackerService = async (id, data) => {
    try {
        const updatedUserFoodTracker = await UserFoodTracker.findByIdAndUpdate(id, data);
        if (updatedUserFoodTracker) {
            return { success: true, message: "UserFoodTracker updated succesfully" }
        } else {
            return { success: false, message: "Failed to update" }
        }

    } catch (error) {
        console.log(error);
        return { success: false }

    }
}

export const deleteUserFoodTrackerService = async(id) =>{
    try {
       await UserFoodTracker.findByIdAndDelete(id)
       return true;
    } catch (error) {
        console.log(error);
        return false;        
    }
}