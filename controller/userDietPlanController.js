import { createUserDietPlanService, deleteUserDietPlanService, getExpiredUserDietPlanService, getUserCurrentDietPlansService } from "../services/userDietPlanService";

export const createUserDietPlan = async (req, res) => {
    let data = req.body
    const result = await createUserDietPlanService(data)
    if (result.success) {
        return res.status(201).json({ success: true, message: "UserDietPlan created successfully" })
    } else {
       return res.status(500).json({
            success: false,
            message: result.message,
            errors: result.errors,
        });
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
        return res.status(500).json({ success: false, message: "Failed to get User DietPlans" });
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