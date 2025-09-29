import mongoose, { model, Schema } from "mongoose";

const userProfileSchema = new Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  dob: { type: Date , required: true},
  gender: { type: String, enum: ["Male", "Female", "Other"], required: true },
  height_cm: { type: Number, required: true },
  subscription_status:{ type: String, enum: ["unpaid", "active", "expired", "cancelled"] }
}, { timestamps: true });

const UserProfile = model("UserProfile", userProfileSchema)
export default UserProfile;
