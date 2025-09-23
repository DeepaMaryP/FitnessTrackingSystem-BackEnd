const mongoose = require("mongoose");

const userWaterTrackerSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },

  date: { type: Date, required: true }, // day of log
  total_ml: { type: Number, default: 0 }, // total water consumed in ml

  created_at: { type: Date, default: Date.now }
});

const UserWaterTracker = model("UserWaterTracker", userWaterTrackerSchema);
export default UserWaterTracker