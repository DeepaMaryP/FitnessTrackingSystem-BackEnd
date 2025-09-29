
export const validatePaymentPlan = async (req, res, next) => {
    const { plan_name, price, duration_days, trainer_type } = req.body

    if (!plan_name) {
        return res.status(400).json({ success: false, message: "please enter Plan name" })
    }
    if (!price) {
        return res.status(400).json({ success: false, message: "please enter price" })
    }
    if (!duration_days) {
        return res.status(400).json({ success: false, message: "please enter duration" })
    }

    if (!trainer_type) {
        return res.status(400).json({ success: false, message: "please enter trainer type" })
    }

    next()

}