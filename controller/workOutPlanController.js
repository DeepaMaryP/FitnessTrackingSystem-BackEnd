import { createWorkOutPlanService, deleteWorkOutPlanService, getAllWorkOutPlanService, getWorkOutPlanWithId, updateWorkOutPlanService } from "../services/workoutPlanService.js";

export const createWorkOutPlan = async (req, res) => {
    let data = req.body
    const result = await createWorkOutPlanService(data)

    if (result.success) {
        return res.status(201).json({ success: true, message: "WorkOutPlan created successfully" })
    } else {
        return res.status(500).json({
            success: false,
            message: result.message,
            errors: result.errors,
        });
    }
}

export const getWorkOutPlan = async (req, res) => {
    const response = await getAllWorkOutPlanService();
    if (response.success)
        return res.status(200).send(response);
    else {
        return res.status(500).send(response);
    }
}

export const getWorkOutPlanById = async (req, res) => {
    const response = await getWorkOutPlanWithId(req.params.Id); 
    if (response.success)
        return res.status(200).send(response);
    else {
        return res.status(500).send(response);
    }
}

export const updateWorkOutPlan = async (req, res) => {
    const response = await updateWorkOutPlanService(req.params.Id, req.body)
    if (response.success) {
        return res.status(200).send(response)
    } else {
        return res.status(500).json({ success: false, message: "Failed to update WorkOutPlan" });
    }
}

export const deleteWorkOutPlan = async (req, res) => {
    const response = await deleteWorkOutPlanService(req.params.Id)
    if (response) {
        return res.status(200).json({ success: true, message: "WorkOutPlan deleted successfully" })
    } else {
        return res.status(500).json({ success: false, message: "Failed to delete WorkOutPlan" });
    }
}