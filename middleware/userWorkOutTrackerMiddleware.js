export const validateWorkOutTracker = (req, res, next) => {
    const { userId, exercises } = req.body;

    if (!userId) {
        return res.status(400).json({ success: false, message: "userId is required" });
    }

    if (!exercises) {
        return res.status(400).json({ success: false, message: "exercises is required" });
    }

    if (!Array.isArray(exercises)) {
        return res.status(400).json({ success: false, message: "exercises should be an array" });
    }

    for (const exercise of exercises) {
        if (!exercise.name) {
            return res.status(400).json({ success: false, message: "Exercise name is required" });
        }
        if (!exercise.calories_burned) {
            return res.status(400).json({ success: false, message: "Exercise calories_burned is required" });
        }
    }

    next();
};