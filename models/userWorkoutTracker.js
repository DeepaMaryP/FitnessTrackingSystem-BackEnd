import mongoose, { model, Schema } from "mongoose";

const userWorkoutTrackerSchema = new Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  workout_plan_id: { type: mongoose.Schema.Types.ObjectId, ref: "WorkoutPlanMaster" },
  date: { type: Date, default: Date.now },

  exercises: [
    {
      name: { type: String, required: true },
      sets: { type: Number },
      reps: { type: Number },
      duration_min: { type: Number },
      met: { type: Number, required: true },
      calories_burned: { type: Number, required: true } // calculated per exercise
    },
  ],

  total_calories_burned: { type: Number, default: 0 },
  created_at: { type: Date, default: Date.now }
});

const UserWorkoutTracker = mongoose.model("UserWorkoutTracker", userWorkoutTrackerSchema);
export default UserWorkoutTracker
