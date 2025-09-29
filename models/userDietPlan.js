const mongoose = require("mongoose");

const userDietPlanSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  diet_plan_id: { type: mongoose.Schema.Types.ObjectId, ref: "DietPlanMaster", required: true },
  start_date: { type: Date, default: Date.now },
  end_date: { type: Date , required: true},
  status: { type: String, enum: ["Active", "Completed", "Expired"], default: "Active" },
  assigned_by: { type: mongoose.Schema.Types.ObjectId, ref: "Trainer", default: null },
  created_at: { type: Date, default: Date.now }
});

const UserDietPlan = model("UserDietPlan", userDietPlanSchema);
export default UserDietPlan
