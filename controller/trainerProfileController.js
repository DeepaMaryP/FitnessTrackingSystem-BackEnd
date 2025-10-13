import bcrypt from "bcryptjs";
import { approveTrainerService, createTrainerProfileService, deleteTrainerProfileService, getAllTrainersProfileService, getApprovedTrainerCountService, getApprovedTrainersProfileService, getPendingTrainerCountService, getTrainerProfileWithUserId, updateTrainerProfileService, updateVerificationDocumentService } from "../services/trainerProfileService.js";

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

export const getApprovedTrainers = async (req, res) => {
    const response = await getApprovedTrainersProfileService();    
    if (response.success)
        return res.status(200).send(response);
    else {
        return res.status(500).json({ success: false, message: "Failed to get TrainerProfile" });
    }
}

export const getTrainerProfileByUserId = async (req, res) => {           
    const response = await getTrainerProfileWithUserId(req.params.userId);
    if (response)
        return res.status(200).send(response);
    else {
        return res.status(500).json({ success: false, message: "Failed to get TrainerProfile" });
    }
}

export const getApprovedTrainerCount = async (req, res) => {
    const response = await getApprovedTrainerCountService();
    if (response.success)
        return res.status(200).send(response);
    else {
        return res.status(500).json({ success: false, message: "Failed to get Trainer Count" });
    }
}

export const getPendingTrainerCount = async (req, res) => {
    const response = await getPendingTrainerCountService();
    if (response.success)
        return res.status(200).send(response);
    else {
        return res.status(500).json({ success: false, message: "Failed to get Trainer Count" });
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

export const approveTrainers = async (req, res) => {  
    const response = await approveTrainerService(req.params.id, req.body)
    if (response) {
        return res.status(200).json({ success: true, message: "TrainerProfile approved successfully" })
    } else {
        return res.status(500).json({ success: false, message: "Failed to approve TrainerProfile" });
    }
}

export const updateVerificationDocuments = async (req, res) => {
    const response = await updateVerificationDocumentService(req.params.userId, req.body)
    if (response) {
        return res.status(200).json({ success: true, message: "Documents submitted successfully" })
    } else {
        return res.status(500).json({ success: false, message: "Failed to approve documents" });
    }
}