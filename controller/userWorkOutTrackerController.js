import { createUserWorkOutTrackerService, getTodaysWorkOutTrackerWithUserIdService, getUserWorkOutTrackerByDatesService, getUserWorkOutTrackerService } from "../services/UserWorkOutTrackerService.js";

export const createUserWorkOutTracker = async (req, res) => {
    let data = req.body
    const result = await createUserWorkOutTrackerService(data)
    if (result.success) {
        return res.status(201).json({ success: true, message: "UserWorkOutTracker created successfully" })
    } else {
        return res.status(500).json({
            success: false,
            message: result.message,
            errors: result.errors,
        });
    }
}

export const getUserWorkOutTrackerByDates = async (req, res) => {
    const { userId, startDate, endDate } = req.query;
    const response = await getUserWorkOutTrackerByDatesService(userId, startDate, endDate);
    if (response.success)
        return res.status(200).send(response);
    else {
        return res.status(500).send(response);
    }
}

export const getTodaysUserWorkOutTrackerByUserId = async (req, res) => {
    const response = await getTodaysWorkOutTrackerWithUserIdService(req.params.userId);
    if (response.success)
        return res.status(200).send(response);
    else {
        return res.status(500).json(response);
    }
}

export const getUserWorkOutTracker = async (req, res) => {
    const { userId, date } = req.query;
    const response = await getUserWorkOutTrackerService(userId, date);
    if (response.success)
        return res.status(200).send(response);
    else {
        return res.status(500).json(response);
    }
}