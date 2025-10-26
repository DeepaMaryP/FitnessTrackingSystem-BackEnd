export const validateUserWorkOutPlan = async (req, res, next) => {
    const { userId, workout_plan_id, end_date, start_date } = req.body

    const today = new Date()
    today.setHours(0, 0, 0, 0);

    if (!userId) {
        return res.status(400).json({ success: false, message: "please enter userId" })
    }
    if (!workout_plan_id) {
        return res.status(400).json({ success: false, message: "please enter workout_plan_id" })
    }
    if (!start_date) {
        return res.status(400).json({ success: false, message: "please enter start_date" })
    }

    const startDate = new Date(start_date);
    startDate.setHours(0, 0, 0, 0);
    if (startDate > today) {
        return res.status(400).json({ success: false, message: "start_date should not be greater than today" })
    }
    if (!end_date) {
        return res.status(400).json({ success: false, message: "please enter end_date" })
    }
    const endDate = new Date(end_date);
    endDate.setHours(0, 0, 0, 0);
    if (endDate < today) {
        return res.status(400).json({ success: false, message: "end_date should not be less than today" })
    }

    next()
}