
export const validatePaymentPlan = async (req, res, next) => {
    const { name, price, duration_days, features } = req.body

    if (!name) {
        return res.status(400).json({ success: false, message: "please enter Plan name" })
    }
    if (!price) {
        return res.status(400).json({ success: false, message: "please enter price" })
    }
    if (!duration_days) {
        return res.status(400).json({ success: false, message: "please enter duration" })
    }

    features?.trainers?.map(
        trainer => {
            if (trainer.trainer_type.length == 0) {
                return res.status(400).json({ success: false, message: "please enter trainer type" })
            }
        }
    )
    next()

}