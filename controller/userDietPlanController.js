import { createUserDietPlanService, deleteUserDietPlanService, getExpiredUserDietPlanService, getUserCurrentDietPlansService } from "../services/userDietPlanService.js";

export const createUserDietPlan = async (req, res) => {
    let data = req.body
    const result = await createUserDietPlanService(data)
    if (result.success) {
        return res.status(201).send(result)
    } else {
       return res.status(500).send(result)
    }
}


export const getExpiredUserDietPlans = async (req, res) => {
    const response = await getExpiredUserDietPlanService(req.params.userId);
    if (response.success)
        return res.status(200).send(response);
    else {
        return res.status(500).json({ success: false, message: "Failed to get User DietPlans" });
    }
}

export const getCurrentUserDietPlans = async (req, res) => {
    const response = await getUserCurrentDietPlansService(req.params.userId);   
    if (response)
        return res.status(200).send(response);
    else {
        return res.status(500).send(response);
    }
}

export const deleteUserDietPlan = async (req, res) => {
    const response = await deleteUserDietPlanService(req.params.Id)
    if (response) {
        return res.status(200).json({ success: true, message: "User DietPlan deleted successfully" })
    } else {
        return res.status(500).json({ success: false, message: "Failed to delete User DietPlan" });
    }
}