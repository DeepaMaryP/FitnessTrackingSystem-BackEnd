import UserWaterTracker from "../models/userWaterTracker.js";

export const createUserWaterTracker = async (data) => {
    try {
        let newUserWaterTracker = new UserWaterTracker(data);
        newUserWaterTracker = await newUserWaterTracker.save();
        return {success : true, UserWaterTracker: newUserWaterTracker}
    } catch (error) {
        console.log({error});
        return {
            success: false,
            message: error.message || "Failed to create UserWaterTracker",
            errors: error.errors || null, // contains field-level details (phone, email etc.)
        };
    }
}

export const getAllUserWaterTrackerService = async () => {
    try {
        const allUserWaterTracker = await UserWaterTracker.find();
        return { success: true, allUserWaterTracker };

    } catch (error) {
        return { success: false }
    }
}

export const getUserWaterTrackerWithId = async (id) => {
    try {
        const userWaterTracker = await UserWaterTracker.findById(id)
        if (userWaterTracker) {
            return userWaterTracker
        }
        return false

    } catch (error) {
        return false
    }
}

export const updateUserWaterTrackerService = async (id, data) => {
    try {
        const updatedUserWaterTracker = await UserWaterTracker.findByIdAndUpdate(id, data);
        if (updatedUserWaterTracker) {
            return { success: true, message: "UserWaterTracker updated succesfully" }
        } else {
            return { success: false, message: "Failed to update" }
        }

    } catch (error) {
        console.log(error);
        return { success: false }

    }
}

export const deleteUserWaterTrackerService = async(id) =>{
    try {
       await UserWaterTracker.findByIdAndDelete(id)
       return true;
    } catch (error) {
        console.log(error);
        return false;        
    }
}