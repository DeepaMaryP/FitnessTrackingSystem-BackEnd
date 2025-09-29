export const validateBodyMeasurement = async (req, res, next) => {
    const { userId, weight_kg } = req.body

    if (!userId) {
        return res.status(400).json({ success: false, message: "please enter userId" })
    }
    if (!weight_kg) {
        return res.status(400).json({ success: false, message: "please enter weight_kg" })
    }  

    next()
}