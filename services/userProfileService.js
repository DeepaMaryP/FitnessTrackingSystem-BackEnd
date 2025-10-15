import mongoose from "mongoose";
import UserProfile from "../models/userProfile.js";
import bodyMeasurements from "../models/BodyMeasurements.js";

export const createUserProfileService = async (data) => {
    try {
        let newUserProfile = new UserProfile(data);
        newUserProfile = await newUserProfile.save();
        return { success: true, userProfile: newUserProfile }
    } catch (error) {
        console.log({ error });
        return {
            success: false,
            message: error.message || "Failed to create UserProfile",
            errors: error.errors || null, // contains field-level details (phone, email etc.)
        };
    }
}

export const createUserProfileWithMeasurementService = async (userProfile, bodyMeasurement) => {
    const userId = userProfile.userId
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
        // Remove old profiles for this user
        await UserProfile.deleteMany({ userId }, { session });

        await userProfile.save({ session });
        await bodyMeasurement.save({ session });

        await session.commitTransaction();
        session.endSession();

        return { success: true }
    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        console.error("Transaction failed:", error);
        return {
            success: false, message: error.message || "Failed to create UserProfile",
            errors: error.errors || null, // contains field-level details (phone, email etc.));
        }
    };
}

export const getUserProfileWithId = async (userId) => {
    try {
        // Fetch profile
        const userProfiles = await UserProfile.find({ userId: userId });

        // Fetch latest weight
        const latestMeasurement = await bodyMeasurements
            .findOne({ userId: userId })   
            .sort({ date: -1 })
            .select("weight_kg");

        // If no profile exists, return empty object
        if (!userProfiles || userProfiles.length === 0) {
            return {
                success: true, data: null,  message: "Profile not found",
            };
        }

        // Get the first profile 
        const profileDoc = userProfiles[0];
        const profileWithWeight = {
            ...profileDoc.toObject(), // convert Mongoose doc to plain object
            weight_kg: latestMeasurement ? latestMeasurement.weight_kg : null,
        };

        return {
            success: true,
            data: profileWithWeight,
            message: "Profile fetched successfully",
        };
    } catch (error) {
        console.error("Error in getUserProfileWithId:", error);
        return {
            success: false,
            data: null,
            message: error.message || "Failed to fetch profile",
        };
    }
};


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

