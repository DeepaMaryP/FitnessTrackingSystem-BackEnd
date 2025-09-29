import { createUserTrainerService, deleteUserTrainerService, getAllUserTrainersService, getUserTrainerStatisticsService } from "../services/userTrainerService.js";

export const createUserTrainer = async (req, res) => {
    let data = req.body
    const result = await createUserTrainerService(data)
    if (result.success) {
        return res.status(201).json({ success: true, message: "UserTrainer created successfully" })
    } else {
       return res.status(500).json({
            success: false,
            message: result.message,
            errors: result.errors,
        });
    }
}


export const getUserTrainers = async (req, res) => {
    const response = await getAllUserTrainersService(req.params.userId);
    if (response.success)
        return res.status(200).send(response);
    else {
        return res.status(500).json({ success: false, message: "Failed to get UserTrainers" });
    }
}

export const getUserTrainerStatistics= async (req, res) => {
    const response = await getUserTrainerStatisticsService();
    if (response.success)
        return res.status(200).send(response);
    else {
        return res.status(500).json({ success: false, message: "Failed to get UserTrainers" });
    }
}

export const deleteUserTrainer = async (req, res) => {
    const response = await deleteUserTrainerService(req.params.Id)
    if (response) {
        return res.status(200).json({ success: true, message: "User Trainer deleted successfully" })
    } else {
        return res.status(500).json({ success: false, message: "Failed to delete User Trainer" });
    }
}