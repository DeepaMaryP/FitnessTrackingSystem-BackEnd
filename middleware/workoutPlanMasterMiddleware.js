export const validateWorkOutPlan = async (req, res, next) => {
    const { name, duration_days, exercises} = req.body

    if (!name) {
        return res.status(400).json({ success: false, message: "please enter name" })
    }
    if (!duration_days) {
        return res.status(400).json({ success: false, message: "please enter total duration days" })
    }
    if (!exercises) {
        return res.status(400).json({ success: false, message: "please enter exercises" })
    }   

    next()
}