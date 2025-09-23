import mongoose, { model, Schema } from "mongoose";

const userTrainerSchema = new Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  trainer_id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, 
  start_date: { type: Date, default: Date.now },
  end_date: { type: Date },
  status: { type: String, enum: ["Active", "Inactive"], default: "Active" },
  created_at: { type: Date, default: Date.now }
}, { timestamps: true });

const UserTrainer = model("UserTrainer", userTrainerSchema)
export default UserTrainer
