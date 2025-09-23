import mongoose, { model, Schema } from "mongoose";

const userSchema = new Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        passwordHash: { type: String, required: true },
        phone: { type: String, match: [/^\+?[0-9]{7,15}$/, "Invalid phone number"] },
        //Between 7 and 15 digits (ITU standard for phone numbers)
        status: { type: String, enum: ["Active", "InActive"], default: "Active" },
        role: { type: String, enum: ["Admin", "Trainer", "User"], default: "User" },
    }, { timestamps: true });

const User = model("User", userSchema)
export default User