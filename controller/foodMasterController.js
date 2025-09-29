import { createFoodMasterService, deleteFoodMasterService, getAllFoodMasterService, getFoodMasterWithId, updateFoodMasterService } from "../services/foodMasterService";


export const createFoodMaster = async (req, res) => {
    let data = req.body
    const result = await createFoodMasterService(data)
    if (result.success) {
        return res.status(201).json({ success: true, message: "FoodMaster created successfully" })
    } else {
       return res.status(500).json({
            success: false,
            message: result.message,
            errors: result.errors,
        });
    }
}


export const getFoodMaster = async (req, res) => {
    const response = await getAllFoodMasterService();
    if (response.success)
        return res.status(200).send(response);
    else {
        return res.status(500).json({ success: false, message: "Failed to get FoodMaster" });
    }
}

export const getFoodMasterById = async (req, res) => {
    const response = await getFoodMasterWithId(req.params.Id);
    if (response)
        return res.status(200).send(response);
    else {
        return res.status(500).json({ success: false, message: "Failed to get FoodMaster" });
    }
}

export const updateFoodMaster = async (req, res) => {
    const response = await updateFoodMasterService(req.params.Id, req.body)
    if (response.success) {
        return res.status(200).send(response)
    } else {
        return res.status(500).json({ success: false, message: "Failed to update FoodMaster" });
    }
}

export const deleteFoodMaster = async (req, res) => {
    const response = await deleteFoodMasterService(req.params.Id)
    if (response) {
        return res.status(200).json({ success: true, message: "FoodMaster deleted successfully" })
    } else {
        return res.status(500).json({ success: false, message: "Failed to delete FoodMaster" });
    }
}