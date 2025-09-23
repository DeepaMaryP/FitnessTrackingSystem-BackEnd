import UserProfile from "../models/userProfile.js";

export const createUserProfileService = async (data) => {
    try {
        let newUserProfile = new UserProfile (data);
        newUserProfile = await newUserProfile.save();
        return {success : true, userProfile:newUserProfile}
    } catch (error) {
        console.log({error});
        return {
            success: false,
            message: error.message || "Failed to create UserProfile",
            errors: error.errors || null, // contains field-level details (phone, email etc.)
        };
    }
}

export const getUserProfileWithId = async (id) => {
    try {
        const userProfile = await UserProfile.findById(id)
        if (userProfile) {
            return userProfile
        }
        return false

    } catch (error) {
        return false
    }
}

export const updateUserProfileService = async (id, data) => {
    try {
        const updatedUserProfile = await UserProfile.findByIdAndUpdate(id, data);
        if (updatedUserProfile) {
            return { success: true, message: "UserProfile updated succesfully" }
        } else {
            return { success: false, message: "Failed to update" }
        }

    } catch (error) {
        console.log(error);
        return { success: false }

    }
}

