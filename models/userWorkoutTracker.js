import mongoose, { Schema, model } from "mongoose";

const userWorkoutTrackerSchema = new Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  workout_plan_id: { type: mongoose.Schema.Types.ObjectId, ref: "WorkoutPlan" }, // optional
  date: { type: Date, default: Date.now },

  exercises: [
    {
      exercise_id: { type: mongoose.Schema.Types.ObjectId, ref: "WorkoutMaster" },
      name: { type: String, required: true },
      sets: { type: Number },
      reps: { type: Number },
      duration_min: { type: Number },
      met: { type: Number, required: true },
      calories_burned: { type: Number, required: true }
    }
  ],

  total_calories_burned: { type: Number, default: 0 },
}, { timestamps: true });

const UserWorkoutTracker = model("UserWorkoutTracker", userWorkoutTrackerSchema);
export default UserWorkoutTracker;
