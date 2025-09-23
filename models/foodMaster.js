import { Double } from "bson";
import { model, Schema } from "mongoose";

const foodMasterSchema = new Schema(
    {
        name: { type: String, required: true, unique: true },
        category: { type: String, required: true },
        serving_size: { type: Double, required: true },
        serving_unit: { type: String, required: true },
        calories: { type: Double, required: true },
        protein_g: { type: Double, required: true },
        carbs_g: { type: Double, required: true },
        fat_g: { type: Double, required: true },
        fiber_g: { type: Double, required: true },
        sugar_g: { type: Double, required: true },
    }, { timestamps: true }
)

const FoodMaster = model('FoodMaster', foodMasterSchema)
export default FoodMaster