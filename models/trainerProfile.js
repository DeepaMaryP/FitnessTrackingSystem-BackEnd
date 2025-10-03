import mongoose, { model, Schema } from "mongoose";

const trainerProfileSchema = new Schema(
    {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
        qualification: { type: String, required: true },
        experience_years: { type: String, required: true},
        specialization: { type: String, required: true },
        certification:{ type: String, required: true },
        approvedStatus:{ type: String, enum: ['pending','approved','blocked'], default: "pending" },
        approvedAt:{ type: Date },        
        approvedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },        
        availability_status: { type: String, enum: ['available','busy','inactive'], default: "available" },
    }, { timestamps: true });

const TrainerProfile = model("TrainerProfile", trainerProfileSchema)
export default TrainerProfile