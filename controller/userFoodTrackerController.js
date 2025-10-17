import { createUserFoodTrackerService, getAllUserFoodTrackerService, getTodaysFoodTrackerWithUserIdService } from "../services/UserFoodTrackerService.js";

export const createUserFoodTracker = async (req, res) => {
    let data = req.body  
    const result = await createUserFoodTrackerService(data)    
    if (result.success) {
        return res.status(201).json({ success: true, message: "UserFoodTracker created successfully" })
    } else {
       return res.status(500).json({
            success: false,
            message: result.message,
            errors: result.errors,
        });
    }
}

export const getUserFoodTracker = async (req, res) => {
    const response = await getAllUserFoodTrackerService();   
    if (response.success)
        return res.status(200).send(response);
    else {
        return res.status(500).json({ success: false, message: "Failed to get UserFoodTracker" });
    }
}

export const getTodaysUserFoodTrackerByUserId = async (req, res) => {
    const response = await getTodaysFoodTrackerWithUserIdService(req.params.userId);
   if (response.success)
        return res.status(200).send(response);
    else {
        return res.status(500).json(response);
    }
}
