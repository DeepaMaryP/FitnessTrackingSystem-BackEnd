import mongoose, { model, Schema } from "mongoose";

const trainerProfileSchema = new Schema(
    {
        user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
        qualification: { type: String, required: true },
        experience_years: { type: String, required: true, unique: true },
        specialization: { type: String, required: true },
        certification:{ type: String, required: true },
        availability_status: { type: String, enum: ['available','busy','inactive'], default: "available" },
    }, { timestamps: true });

const TrainerProfile = model("TrainerProfile", trainerProfileSchema)
export default TrainerProfile