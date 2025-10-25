import { createDietPlanService, deleteDietPlanService, getAllDietPlanService, getDietPlanWithId, updateDietPlanService } from "../services/dietPlanMasterService.js";

export const createDietPlan = async (req, res) => {
    let data = req.body
    const result = await createDietPlanService(data)
    if (result.success) {
        return res.status(201).json({ success: true, message: "DietPlan created successfully" })
    } else {
       return res.status(500).json({
            success: false,
            message: result.message,
            errors: result.errors,
        });
    }
}


export const getDietPlan = async (req, res) => {
    const response = await getAllDietPlanService();
    if (response.success)
        return res.status(200).send(response);
    else {
        return res.status(500).send(response);
    }
}

export const getDietPlanById = async (req, res) => {
    const response = await getDietPlanWithId(req.params.Id);
    if (response)
        return res.status(200).send(response);
    else {
        return res.status(500).json({ success: false, message: "Failed to get DietPlan" });
    }
}

export const updateDietPlan = async (req, res) => {
    const response = await updateDietPlanService(req.params.Id, req.body)
    if (response.success) {
        return res.status(200).send(response)
    } else {
        return res.status(500).json({ success: false, message: "Failed to update DietPlan" });
    }
}

export const deleteDietPlan = async (req, res) => {
    const response = await deleteDietPlanService(req.params.Id)
    if (response) {
        return res.status(200).json({ success: true, message: "DietPlan deleted successfully" })
    } else {
        return res.status(500).json({ success: false, message: "Failed to delete DietPlan" });
    }
}