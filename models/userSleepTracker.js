const mongoose = require("mongoose");

const userSleepTrackerSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },

  date: { type: Date, required: true }, // log date (usually the wake-up date)
  sleep_hours: { type: Number, required: true }, // total hours slept

  created_at: { type: Date, default: Date.now }
});

const UserSleepTracker = model("UserSleepTracker", userSleepTrackerSchema);
export default UserSleepTracker