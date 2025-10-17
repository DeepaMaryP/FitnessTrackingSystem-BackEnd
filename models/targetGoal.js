import mongoose, { model } from "mongoose";

const targetGoalSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    goal_type: { type: String, enum: ["Weight Loss", "Weight Gain", "Maintain"], required: true },   
    target_weight: { type: Number, required: true },
    duration_days: { type: Number, required: true },
    daily_calorie_target: { type: Number },
    start_date: { type: Date, default: Date.now },
    end_date: { type: Date },
    status: { type: String, enum: ["Active", "Achieved", "Expired"], default: "Active" }
}, { timestamps: true });

const TargetGoal = model("TargetGoal", targetGoalSchema);
export default TargetGoal
