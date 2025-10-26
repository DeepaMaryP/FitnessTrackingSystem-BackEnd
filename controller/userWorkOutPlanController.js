import { createUserWorkOutPlanService, deleteUserWorkOutPlanService, getExpiredUserWorkOutPlanService, getUserCurrentWorkOutPlansService } from "../services/userWorkoutPlanService.js";


export const createUserWorkOutPlan = async (req, res) => {
    let data = req.body
    const result = await createUserWorkOutPlanService(data)
    if (result.success) {
        return res.status(201).send(result)
    } else {
       return res.status(500).send(result)
    }
}


export const getExpiredUserWorkOutPlans = async (req, res) => {
    const response = await getExpiredUserWorkOutPlanService(req.params.userId);
    if (response.success)
        return res.status(200).send(response);
    else {
        return res.status(500).json({ success: false, message: "Failed to get User WorkOutPlans" });
    }
}

export const getCurrentUserWorkOutPlans = async (req, res) => {
    const response = await getUserCurrentWorkOutPlansService(req.params.userId);
    if (response)
        return res.status(200).send(response);
    else {
        return res.status(500).send(response);
    }
}

export const deleteUserWorkOutPlan = async (req, res) => {    
    const response = await deleteUserWorkOutPlanService(req.params.Id)
    if (response) {
        return res.status(200).json({ success: true, message: "User WorkOutPlan deleted successfully" })
    } else {
        return res.status(500).json({ success: false, message: "Failed to delete User WorkOutPlan" });
    }
}