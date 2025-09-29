const mongoose = require("mongoose");

const workoutPlanMasterSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  duration_days: { type: Number, required: true },
  level: { type: String, enum: ["Beginner", "Intermediate", "Advanced"], default: "Beginner" },
  workout_type: { type: String, enum: ["Strength", "Cardio", "HIIT", "Yoga", "Mixed"], default: "Mixed" },

  exercises: [
    {
      name: { type: String, required: true },
      sets: { type: Number },
      reps: { type: Number },
      duration_min: { type: Number },        // for time-based exercises
      rest_sec: { type: Number, default: 60 },
      met: { type: Number, required: true } // MET value for calories calculation
    }
  ],  
}, { timestamps: true });

const WorkoutPlanMaster = model("WorkoutPlanMaster", workoutPlanMasterSchema);
export default WorkoutPlanMaster