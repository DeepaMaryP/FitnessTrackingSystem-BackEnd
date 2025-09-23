import bcrypt from "bcryptjs";
import { createTrainerProfileService, deleteTrainerProfileService, getAllTrainersProfileService, getTrainerProfileWithId, updateTrainerProfileService } from "../services/trainerProfileService.js";

export const createTrainerProfile = async (req, res) => {
    let data = req.body  
    const updatedPassword = await bcrypt.hash(data.passwordHash, 10)  // encrypt password for trainer user
    data.passwordHash = updatedPassword
    
    const result = await createTrainerProfileService(data)

    if (result.success) {
        return res.status(201).json({ success: true, message: "TrainerProfile created successfully" })
    } else {
       return res.status(500).json({
            success: false,
            message: result.message,
            errors: result.errors,
        });
    }
}


export const getTrainersProfile = async (req, res) => {
    const response = await getAllTrainersProfileService();
    if (response.success)
        return res.status(200).send(response);
    else {
        return res.status(500).json({ success: false, message: "Failed to get TrainerProfile" });
    }
}

export const getTrainerProfileById = async (req, res) => {
    const response = await getTrainerProfileWithId(req.params.userId);
    if (response)
        return res.status(200).send(response);
    else {
        return res.status(500).json({ success: false, message: "Failed to get TrainerProfile" });
    }
}

export const updateTrainerProfile = async (req, res) => {
    const response = await updateTrainerProfileService(req.params.userId, req.body)
    if (response.success) {
        return res.status(200).send(response)
    } else {
        return res.status(500).json({ success: false, message: "Failed to update TrainerProfile" });
    }
}

export const deleteTrainerProfile = async (req, res) => {
    const response = await deleteTrainerProfileService(req.params.userId)
    if (response) {
        return res.status(200).json({ success: true, message: "TrainerProfile deleted successfully" })
    } else {
        return res.status(500).json({ success: false, message: "Failed to delete TrainerProfile" });
    }
}