import UserWorkoutTracker from "../models/userWorkoutTracker.js";

export const createUserWorkoutTracker = async (data) => {
    try {
        let newUserWorkoutTracker = new UserWorkoutTracker(data);
        newUserWorkoutTracker = await newUserWorkoutTracker.save();
        return {success : true, UserWorkoutTracker:newUserWorkoutTracker}
    } catch (error) {
        console.log({error});
        return {
            success: false,
            message: error.message || "Failed to create UserWorkoutTracker",
            errors: error.errors || null, // contains field-level details (phone, email etc.)
        };
    }
}

export const getAllUserWorkoutTrackerService = async () => {
    try {
        const allUserWorkoutTracker = await UserWorkoutTracker.find();
        return { success: true, allUserWorkoutTracker };

    } catch (error) {
        return { success: false }
    }
}

export const getUserWorkoutTrackerWithId = async (id) => {
    try {
        const userWorkoutTracker = await UserWorkoutTracker.findById(id)
        if (userWorkoutTracker) {
            return userWorkoutTracker
        }
        return false

    } catch (error) {
        return false
    }
}

export const updateUserWorkoutTrackerService = async (id, data) => {
    try {
        const updatedUserWorkoutTracker = await UserWorkoutTracker.findByIdAndUpdate(id, data);
        if (updatedUserWorkoutTracker) {
            return { success: true, message: "UserWorkoutTracker updated succesfully" }
        } else {
            return { success: false, message: "Failed to update" }
        }

    } catch (error) {
        console.log(error);
        return { success: false }

    }
}

export const deleteUserWorkoutTrackerService = async(id) =>{
    try {
       await UserWorkoutTracker.findByIdAndDelete(id)
       return true;
    } catch (error) {
        console.log(error);
        return false;        
    }
}