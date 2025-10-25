export const validateUserWorkOutPlan = async (req, res, next) => {
    const { userId, workout_plan_id, end_date, start_date } = req.body

    if (!userId) {
        return res.status(400).json({ success: false, message: "please enter userId" })
    }
    if (!workout_plan_id) {
        return res.status(400).json({ success: false, message: "please enter workout_plan_id" })
    }
    if (!start_date) {
        return res.status(400).json({ success: false, message: "please enter start_date" })
    }
    if (!end_date) {
        return res.status(400).json({ success: false, message: "please enter end_date" })
    }

    next()
}