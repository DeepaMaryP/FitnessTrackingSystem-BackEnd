import { createUserFoodTrackerService, getTodaysFoodTrackerWithUserIdService, getUserFoodTrackerByDatesService } from "../services/UserFoodTrackerService.js";

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

export const getUserFoodTrackerByDates = async (req, res) => {
    const { userId, startDate, endDate } = req.query;
    const response = await getUserFoodTrackerByDatesService(userId, startDate, endDate);
    if (response.success)
        return res.status(200).send(response);
    else {
        return res.status(500).send(response);
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
