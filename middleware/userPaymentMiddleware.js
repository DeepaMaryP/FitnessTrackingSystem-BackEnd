export const validateUserPayment = async (req, res, next) => {
    const { userId, payment_plan_id, amount, transaction_id} = req.body

    if (!userId) {
        return res.status(400).json({ success: false, message: "please enter userId" })
    }

    if (!payment_plan_id) {
        return res.status(400).json({ success: false, message: "please enter payment_plan_id" })
    }
    if (!amount) {
        return res.status(400).json({ success: false, message: "please enter amount" })
    }
    if (!transaction_id) {
        return res.status(400).json({ success: false, message: "please enter transaction_id" })
    }
    
    next()

}