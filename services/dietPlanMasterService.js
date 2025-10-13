import DietPlan from "../models/dietPlanMaster.js";

export const createDietPlanService = async (data) => {
    try {
        let newDietPlan = new DietPlan(data);
        newDietPlan = await newDietPlan.save();
        return { success: true, DietPlan: newDietPlan }
    } catch (error) {
        console.log({ error });
        return {
            success: false,
            message: error.message || "Failed to create DietPlan",
            errors: error.errors || null, // contains field-level details (phone, email etc.)
        };
    }
}


export const getAllDietPlanService = async () => {
    try {
        const allDietPlans = await DietPlan.find();
        return { success: true, allDietPlans };

    } catch (error) {
        return { success: false }
    }
}

export const getDietPlanWithId = async (id) => {
    try {
        const plan = await DietPlan.findById(id)
            .populate({
                path: "meals.Breakfast.food_items.food_id",
                model: "FoodMaster"
            })
            .populate({
                path: "meals.Lunch.food_items.food_id",
                model: "FoodMaster"
            })
            .populate({
                path: "meals.Dinner.food_items.food_id",
                model: "FoodMaster"
            })
            .populate({
                path: "meals.Snack.food_items.food_id",
                model: "FoodMaster"
            }).lean();

        // rename and attach baseFood
        for (const mealName of ["Breakfast", "Lunch", "Dinner", "Snack"]) {
            if (plan.meals?.[mealName]?.food_items) {
                plan.meals[mealName].food_items = plan.meals[mealName].food_items.map((item) => ({
                    ...item,
                    baseFood: item.food_id,
                    food_id: item.food_id?._id,
                }));
            }
        }
        if (plan) {
            return plan
        }
        return false

    } catch (error) {
        return false
    }
}

export const updateDietPlanService = async (id, data) => {
    try {
        const updatedDietPlan = await DietPlan.findByIdAndUpdate(id, data);
        if (updatedDietPlan) {
            return { success: true, message: "DietPlan updated succesfully" }
        } else {
            return { success: false, message: "Failed to update" }
        }

    } catch (error) {
        console.log(error);
        return { success: false }

    }
}

export const deleteDietPlanService = async (id) => {
    try {
        await DietPlan.findByIdAndDelete(id)
        return true;
    } catch (error) {
        console.log(error);
        return false;
    }
}