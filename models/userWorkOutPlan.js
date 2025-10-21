import mongoose, { Schema, model } from "mongoose";

const userWorkoutPlanSchema = new Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  workout_plan_id: { type: mongoose.Schema.Types.ObjectId, ref: "WorkoutPlan", required: true },

  start_date: { type: Date, default: Date.now },
  end_date: { type: Date, required: true },
  status: { type: String, enum: ["Active", "Completed", "Expired"], default: "Active" },
  assigned_by: { type: mongoose.Schema.Types.ObjectId, ref: "User" },

  personalized_calories_burned: { type: Number, default: 0 }, // recalculated based on user’s weight
}, { timestamps: true });

const UserWorkoutPlan = model("UserWorkoutPlan", userWorkoutPlanSchema);
export default UserWorkoutPlan;
