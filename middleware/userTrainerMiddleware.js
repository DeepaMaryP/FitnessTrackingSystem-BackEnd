export const validateUserTrainer = async (req, res, next) => {
    const { userId, trainerId } = req.body

    if (!userId) {
        return res.status(400).json({ success: false, message: "please enter userId" })
    }
    if (!trainerId) {
        return res.status(400).json({ success: false, message: "please enter trainerId" })
    }   
    next()
}