export const validateTrainer = async (req, res, next) => {
    const { userId, qualification, experience_years, specialization, certification } = req.body
   
    if (!userId) {
        return res.status(400).json({ success: false, message: "please enter userId" })
    }
    if (!qualification) {
        return res.status(400).json({ success: false, message: "please enter qualification" })
    }
    if (!experience_years) {
        return res.status(400).json({ success: false, message: "please enter experience_years" })
    }
    if (!specialization) {
        return res.status(400).json({ success: false, message: "please enter specialization" })
    }
    if (!certification) {
        return res.status(400).json({ success: false, message: "please enter certification" })
    }
    next()

}