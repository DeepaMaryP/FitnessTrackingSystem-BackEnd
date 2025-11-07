export const validateUserTrainer = async (req, res, next) => {
    const { userId, trainerIds, start_date, end_date } = req.body

    if (!userId) {
        return res.status(400).json({ success: false, message: "please enter userId" })
    }
    if (trainerIds.length == 0) {
        return res.status(400).json({ success: false, message: "please enter trainerId" })
    } 
    if (!start_date) {
        return res.status(400).json({ success: false, message: "please enter start date" })
    }
    if (!end_date) {
        return res.status(400).json({ success: false, message: "please enter end date" })
    }  
    next()
}