
export const validateTargetGoal = async (req, res, next) => {
    const { userId, goal_type, target_weight, duration_days, daily_calorie_target } = req.body
    
    if (!userId) {
        return res.status(400).json({ success: false, message: "please enter userId" })
    }
    if (!goal_type) {       
        return res.status(400).json({ success: false, message: "please enter goal_type" })
    }
    if (!target_weight) {
        return res.status(400).json({ success: false, message: "please enter target_weight" })
    }
    if (!duration_days) {
        return res.status(400).json({ success: false, message: "please enter duration_days" })
    }
    if (!daily_calorie_target) {
        return res.status(400).json({ success: false, message: "please enter dailyCalories" })
    }
    next()
}