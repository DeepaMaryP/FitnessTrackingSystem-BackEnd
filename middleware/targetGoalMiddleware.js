
export const validateTargetGoal = async (req, res, next) => {
    const { userId, goal_type, current_weight, target_weight, duration_days } = req.body

    if (!userId) {
        return res.status(400).json({ success: false, message: "please enter userId" })
    }
    if (!goal_type) {
        return res.status(400).json({ success: false, message: "please enter goal_type" })
    }  
     if (!current_weight) {
        return res.status(400).json({ success: false, message: "please enter current_weight" })
    }  
     if (!target_weight) {
        return res.status(400).json({ success: false, message: "please enter target_weight" })
    }  
     if (!duration_days) {
        return res.status(400).json({ success: false, message: "please enter duration_days" })
    }  

    next()
}