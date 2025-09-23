import { createUserProfileService, getUserProfileWithId, updateUserProfileService } from "../services/userProfileService.js";

export const createUserProfile = async (req, res) => {
    let data = req.body
    const result = await createUserProfileService(data)

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
    if (response)
        return res.status(200).send(response);
    else {
        return res.status(500).json({ success: false, message: "Failed to get UserProfile" });
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

