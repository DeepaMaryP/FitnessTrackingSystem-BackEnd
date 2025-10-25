
export const validateUserDietPlan = async (req, res, next) => {
    const { userId, diet_plan_id, start_date, end_date } = req.body

    if (!userId) {
        return res.status(400).json({ success: false, message: "please enter userId" })
    }
    if (!diet_plan_id) {
        return res.status(400).json({ success: false, message: "please enter diet_plan_id" })
    }
    if (!start_date) {
        return res.status(400).json({ success: false, message: "please enter start_date" })
    }
    if (!end_date) {
        return res.status(400).json({ success: false, message: "please enter end_date" })
    }

    next()
}