const mongoose = require("mongoose");

const userWorkoutPlanSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    workout_plan_id: { type: mongoose.Schema.Types.ObjectId, ref: "WorkoutPlanMaster", required: true },

    start_date: { type: Date, default: Date.now },
    end_date: { type: Date, required: true  }, 
    status: { type: String, enum: ["Active", "Completed", "Expired"], default: "Active" },

    assigned_by: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // trainer
    created_at: { type: Date, default: Date.now }
});

const UserWorkoutPlan  = mongoose.model("UserWorkoutPlan", userWorkoutPlanSchema);
export default UserWorkoutPlan
