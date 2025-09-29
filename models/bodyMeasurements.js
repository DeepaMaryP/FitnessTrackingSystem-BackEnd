import { model, Schema } from "mongoose";

const bodyMeasurementsSchema = new Schema(
    {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
        date: { type: Date, default: Date.now },
        weight_kg: { type: Number, required: true },
        Hip_cm: { type: Number },
        Waist_cm: { type: Number},
        Chest_cm: { type: Number},
        Thigh_cm: { type: Number },
        Arm_cm: { type: Number },
        Calf_cm: { type: Number},
    })

const bodyMeasurements = model('bodyMeasurements', bodyMeasurementsSchema)
export default bodyMeasurements