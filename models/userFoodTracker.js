const mongoose = require("mongoose");

const userFoodTrackerSchema = new mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    date: { type: Date, default: Date.now }, // day of logging
    meals: [
        {
            meal_type: {
                type: String, enum: ["Breakfast", "Lunch", "Dinner", "Snack"],
                required: true
            },
            food_items: [
                {
                    food_id: { type: mongoose.Schema.Types.ObjectId, ref: "FoodMaster", required: true },
                    food_name: { type: String }, // optional copy for quick reference
                    quantity: { type: Number, required: true },
                    unit: { type: String, required: true }, // g, ml, piece etc.

                    // nutrition (could be auto-fetched from FoodMaster)
                    calories: { type: Number, required: true },
                    protein_g: { type: Number, default: 0 },
                    carbs_g: { type: Number, default: 0 },
                    fat_g: { type: Number, default: 0 }
                }
            ]
        }
    ],

    // aggregated totals for the day
    total_calories: { type: Number, default: 0 },
    total_protein_g: { type: Number, default: 0 },
    total_carbs_g: { type: Number, default: 0 },
    total_fat_g: { type: Number, default: 0 },
    created_at: { type: Date, default: Date.now }
});

const UserFoodTracker = model("UserFoodTracker", userFoodTrackerSchema);
export default UserFoodTracker