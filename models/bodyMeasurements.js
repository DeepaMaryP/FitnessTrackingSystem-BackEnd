import { model, Schema } from "mongoose";

const bodyMeasurementsSchema = new Schema(
    {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
        date: { type: Date, default: Date.now },
        weight_kg: { type: Number, required: true },
        Hip_cm: { type: Number, required: true },
        Waist_cm: { type: Number, required: true },
        Chest_cm: { type: Number, required: true },
        Thigh_cm: { type: Number, required: true },
        Arm_cm: { type: Number, required: true },
        Calf_cm: { type: Number, required: true },
    })

const bodyMeasurements = model('bodyMeasurements', bodyMeasurementsSchema)
export default bodyMeasurements