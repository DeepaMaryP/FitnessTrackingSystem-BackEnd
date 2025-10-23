export const validateWorkOutPlan = async (req, res, next) => {
    const { name, duration_days, exercises } = req.body
    if (!name) {
        return res.status(400).json({ success: false, message: "please enter name" })
    }
    if (!duration_days) {
        return res.status(400).json({ success: false, message: "please enter total duration days" })
    }
    if (!exercises) {
        return res.status(400).json({ success: false, message: "please enter exercises" })
    }

    if (!Array.isArray(exercises)) {
        return res.status(400).json({ success: false, message: "exercises should be an array" });
    }

    const hasInvalidExercise = exercises.some(
        (ex) => !ex.exercise_id.trim() || !ex.met
    );
    if (hasInvalidExercise) {
        return res.status(400).json({ success: false, message: "Please enter exercise Id and MET" });
    }

    next()
}