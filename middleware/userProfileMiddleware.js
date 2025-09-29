export const validateUserProfile = async (req, res, next) => {
    const { userId, dob, gender, height} = req.body

    if (!userId) {
        return res.status(400).json({ success: false, message: "please enter userId" })
    }

    if (!dob) {
        return res.status(400).json({ success: false, message: "please enter Date of Birth" })
    }
    if (!gender) {
        return res.status(400).json({ success: false, message: "please enter gender" })
    }
    if (!height) {
        return res.status(400).json({ success: false, message: "please enter height" })
    }
    
    next()

}