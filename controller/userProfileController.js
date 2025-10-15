import bodyMeasurements from "../models/BodyMeasurements.js";
import UserProfile from "../models/userProfile.js";
import { createUserProfileWithMeasurementService, getUserProfileWithId, updateUserProfileService } from "../services/userProfileService.js";

export const createUserProfile = async (req, res) => {    
    const { userId, dob, gender, height_cm, weight_kg } = req.body;

    // Create UserProfile
    const userProfile = new UserProfile({ userId, dob, gender, height_cm, subscription_status: "unpaid" });    
    // Create BodyMeasurements entry
    const bodyMeasurement = new bodyMeasurements({ userId, weight_kg, date: new Date() });

    const result = await createUserProfileWithMeasurementService(userProfile, bodyMeasurement )
    if (result.success) {
        return res.status(201).json({ success: true, message: "UserProfile created successfully" })
    } else {
       return res.status(500).json({
            success: false,
            message: result.message,
            errors: result.errors,
        });
    }
}

export const getUserProfileById = async (req, res) => {
    const response = await getUserProfileWithId(req.params.userId);   
    if (response.success)
        return res.status(200).send(response);
    else {
        return res.status(500).json(response);
    }
}

export const updateUserProfile = async (req, res) => {
    const response = await updateUserProfileService(req.params.userId, req.body)
    if (response.success) {
        return res.status(200).send(response)
    } else {
        return res.status(500).json({ success: false, message: "Failed to update UserProfile" });
    }
}

