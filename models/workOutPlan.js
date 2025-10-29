import mongoose, { Schema, model } from "mongoose";

const workoutPlanSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String },
  duration_days: { type: Number, required: true },
  level: { type: String, enum: ["Beginner", "Intermediate", "Advanced"], default: "Beginner" },
  workout_type: { type: String, enum: ["Strength", "Cardio", "HIIT", "Yoga", "Mixed"], default: "Mixed" },
  
  exercises: [
    {
      exercise_id: { type: mongoose.Schema.Types.ObjectId, ref: "exerciseMaster", required: true },
      sets: { type: Number },
      reps: { type: Number },
      duration_min: { type: Number },
      rest_sec: { type: Number },
      met: { type: Number, required: true }, // copied from master for plan stability
    }
  ],

  estimated_calories_burned: { type: Number, default: 0 }, // auto-calculated
}, { timestamps: true });

const WorkoutPlan = model("WorkoutPlan", workoutPlanSchema);
export default WorkoutPlan;
