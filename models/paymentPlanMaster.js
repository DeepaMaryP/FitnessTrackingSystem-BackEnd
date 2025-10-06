import { model, Schema } from "mongoose";

const paymentPlanMasterSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true },
    duration_days: { type: Number, required: true },// e.g., 30 (monthly), 90 (quarterly), 365 (yearly)
    features: {
        trainers: [
            {
                trainer_type: { type: String, enum: ["Diet", "Workout", "Yoga", "General"], required: true },
                count: { type: Number, default: 1 } // how many trainers of this type are included
            }
        ],
        support_level: { type: String, enum: ["Basic", "Standard", "Premium"], default: "Basic" },
        diet_plan_access: { type: Boolean, default: false },
        workout_plan_access: { type: Boolean, default: false },
        yoga_plan_access: { type: Boolean, default: false },
        status: { type: String, enum: ["Active", "Approved", "InActive"], default: "Active" }
    },
},{ timestamps: true });

const PaymentPlanMaster = model("PaymentPlanMaster", paymentPlanMasterSchema)
export default PaymentPlanMaster
