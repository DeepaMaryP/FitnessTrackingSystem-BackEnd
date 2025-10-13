export const validateUserTrainer = async (req, res, next) => {
    const { userId, trainerIds } = req.body

    if (!userId) {
        return res.status(400).json({ success: false, message: "please enter userId" })
    }
    if (trainerIds.length == 0) {
        return res.status(400).json({ success: false, message: "please enter trainerId" })
    }   
    next()
}