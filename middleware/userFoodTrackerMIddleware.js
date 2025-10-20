export const validateFoodTracker = (req, res, next) => {
    const { userId, meals } = req.body;

    if (!userId) {
        return res.status(400).json({ success: false, message: "userId is required" });
    }

    if (!meals) {
        return res.status(400).json({ success: false, message: "meals is required" });
    }

    if (!Array.isArray(meals)) {
        return res.status(400).json({ success: false, message: "meals should be an array" });
    }

    const hasAnyFood = meals.some(
        (meal) => meal.food_items && meal.food_items.length > 0
    );

    if (!hasAnyFood) {
        return res.status(400).json({ success: false, message: "Please enter at least one food item in any meal" });
    }

    for (const meal of meals) {
        if (!meal.meal_type) {
            return res.status(400).json({ success: false, message: "meal_type is required" });
        }

        // If there are food items, validate them
        if (Array.isArray(meal.food_items) && meal.food_items.length > 0) {
            for (const item of meal.food_items) {
                if (!item.food_id) {
                    return res.status(400).json({
                        success: false, message: `food_id is required for ${meal.meal_type}`,
                    });
                }

                if (!item.quantity || item.quantity <= 0) {
                    return res.status(400).json({
                        success: false, message: `Invalid quantity for ${item.food_name || "a food item"} in ${meal.meal_type}`,
                    });
                }

                if (!item.unit) {
                    return res.status(400).json({
                        success: false, message: `Unit is required for ${item.food_name || "a food item"} in ${meal.meal_type}`,
                    });
                }

                if (item.calories == null) {
                    return res.status(400).json({
                        success: false, message: `Calories missing for ${item.food_name || "a food item"} in ${meal.meal_type}`,
                    });
                }
            }
        }
    }

    next();
};


export const validateFoodTrackerByDates = (req, res, next) => {
    const { userId, startDate, endDate } = req.query;
    if (!userId) {
        return res.status(400).json({ success: false, message: "userId is required" });
    }
    if (!startDate) {
        return res.status(400).json({ success: false, message: "startDate is required" });
    }
    if (!endDate) {
        return res.status(400).json({ success: false, message: "endDate is required" });
    }

    next();
};
