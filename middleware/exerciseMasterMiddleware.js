
export const validateExerciseMaster = async (req, res, next) => {
    const { name, met } = req.body

    if (!name) {
        return res.status(400).json({ success: false, message: "please enter name" })
    }
    if (!met) {
        return res.status(400).json({ success: false, message: "please enter met" })
    }   

    next()

}