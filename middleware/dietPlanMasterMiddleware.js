
export const validateDietPlan = async (req, res, next) => {
    const { plan_name, total_calories, macros, meals } = req.body

    if (!plan_name) {
        return res.status(400).json({ success: false, message: "please enter Plan name" })
    }
    if (!total_calories) {
        return res.status(400).json({ success: false, message: "please enter total calories" })
    }
    if (!macros) {
        return res.status(400).json({ success: false, message: "please enter macros" })
    }

    if (!meals) {
        return res.status(400).json({ success: false, message: "please enter meals" })
    }

    next()

}