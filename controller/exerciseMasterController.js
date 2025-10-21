import { createExerciseMasterService, deleteExerciseMasterService, getAllExerciseMasterService, getExerciseMasterWithId, updateExerciseMasterService } from "../services/exerciseMasterService.js";

export const createExerciseMaster = async (req, res) => {
    let data = req.body
    const result = await createExerciseMasterService(data)
    if (result.success) {
        return res.status(201).json({ success: true, message: "ExerciseMaster created successfully" })
    } else {
        return res.status(500).json({
            success: false,
            message: result.message,
            errors: result.errors,
        });
    }
}

export const getExerciseMaster = async (req, res) => {
    const response = await getAllExerciseMasterService();
    if (response.success) {      
        return res.status(200).send(response);
    }
    else {
        return res.status(500).json({ success: false, message: "Failed to get ExerciseMaster" });
    }
}

export const getExerciseMasterById = async (req, res) => { 
    const response = await getExerciseMasterWithId(req.params.Id); 
    if (response)
        return res.status(200).send(response);
    else {
        return res.status(500).json({ success: false, message: "Failed to get ExerciseMaster" });
    }
}

export const updateExerciseMaster = async (req, res) => {
    const response = await updateExerciseMasterService(req.params.Id, req.body)
    if (response.success) {
        return res.status(200).send(response)
    } else {
        return res.status(500).json({ success: false, message: "Failed to update ExerciseMaster" });
    }
}

export const deleteExerciseMaster = async (req, res) => {
    const response = await deleteExerciseMasterService(req.params.Id)
    if (response) {
        return res.status(200).json({ success: true, message: "ExerciseMaster deleted successfully" })
    } else {
        return res.status(500).json({ success: false, message: "Failed to delete ExerciseMaster" });
    }
}