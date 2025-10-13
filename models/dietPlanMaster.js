import mongoose, { model, Schema } from "mongoose";

const dietPlanMasterSchema = new Schema({
    plan_name: { type: String, required: true },
    goal_type: { type: String, enum: ["Weight Loss", "Weight Gain", "Maintain", "Custom"], default: "Custom" },
    total_calories: { type: Number, required: true },
    macros: {
        protein_g: { type: Number, required: true },
        carbs_g: { type: Number, required: true },
        fat_g: { type: Number, required: true }
    },
    meals: {
        Breakfast: {
            food_items: [
                {
                    food_id: {
                        type: Schema.Types.ObjectId, ref: "FoodMaster", required: true
                    },
                    quantity: { type: Number, required: true },
                    unit: { type: String, required: true },
                    calories: { type: Number, required: true },
                    protein_g: { type: Number, default: 0 },
                    carbs_g: { type: Number, default: 0 },
                    fat_g: { type: Number, default: 0 }
                }
            ]
        },
        Lunch: {
            food_items: [
                {
                    food_id: {
                        type: Schema.Types.ObjectId, ref: "FoodMaster", required: true
                    },
                    quantity: { type: Number, required: true },
                    unit: { type: String, required: true },
                    calories: { type: Number, required: true },
                    protein_g: { type: Number, default: 0 },
                    carbs_g: { type: Number, default: 0 },
                    fat_g: { type: Number, default: 0 }
                }
            ]
        },
        Dinner: {
            food_items: [
                {
                    food_id: {
                        type: Schema.Types.ObjectId, ref: "FoodMaster", required: true
                    },
                    quantity: { type: Number, required: true },
                    unit: { type: String, required: true },
                    calories: { type: Number, required: true },
                    protein_g: { type: Number, default: 0 },
                    carbs_g: { type: Number, default: 0 },
                    fat_g: { type: Number, default: 0 }
                }
            ]
        },
        Snack: {
            food_items: [
                {
                    food_id: { type: Schema.Types.ObjectId, ref: "FoodMaster", required: true },
                    quantity: { type: Number, required: true },
                    unit: { type: String, required: true },
                    calories: { type: Number, required: true },
                    protein_g: { type: Number, default: 0 },
                    carbs_g: { type: Number, default: 0 },
                    fat_g: { type: Number, default: 0 }
                }
            ]
        }
    }   
},{ timestamps: true });

const DietPlanMaster = model("DietPlanMaster", dietPlanMasterSchema);
export default DietPlanMaster
