const mongoose = require("mongoose");

const userPaymentSchema = new mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    payment_plan_id: { type: mongoose.Schema.Types.ObjectId, ref: "PaymentPlanMaster", required: true },

    amount: { type: Number, required: true },
    currency: { type: String, default: "INR" },

    payment_date: { type: Date, default: Date.now },
    expiry_date: { type: Date }, // auto = payment_date + duration_days

    status: {
        type: String,
        enum: ["Pending", "Completed", "Failed", "Refunded"],
        default: "Pending"
    },

    payment_mode: {
        type: String,
        enum: ["Credit Card", "Debit Card", "UPI", "NetBanking", "Wallet", "Cash"],
        required: true
    },

    transaction_id: { type: String, unique: true }, // from payment gateway
    invoice_number: { type: String }, 
    created_at: { type: Date, default: Date.now }
});

const UserPayment = model("UserPayment", userPaymentSchema);
export default UserPayment
