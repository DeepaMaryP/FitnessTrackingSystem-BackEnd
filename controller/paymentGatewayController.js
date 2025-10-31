import crypto from "crypto";
import razorpay from "../config/razorPayGateway.js";
import UserPayment from '../models/userPayment.js';

export const initializePayment = async (req, res) => {
    try {
        const { amount } = req.body;
        const options = {
            amount: amount * 100,
            currency: "INR",
            receipt: "receipt_" + Date.now(),
        };

        const order = await razorpay.orders.create(options);
        res.json({ success: true, data: order });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: "Error creating order" });
    }
};

export const VerifyPayment = async (req, res) => {
    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
        const sign = razorpay_order_id + "|" + razorpay_payment_id;
        const expectedSign = crypto
            .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
            .update(sign.toString())
            .digest("hex");

        const isAuthentic = razorpay_signature === expectedSign;
        if (isAuthentic) {
            const startDate = new Date()
            const expiry_date = new Date(startDate);
            expiry_date.setDate(startDate.getDate() + req.body.duration);

            // Insert payment details here (after successful verification)
            const payment = await UserPayment.create({
                userId : req.body.userId,
                payment_plan_id: req.body.planId,
                amount: req.body.amount,
                currency: req.body.currency,
                invoice_number: razorpay_order_id,
                transaction_id: razorpay_payment_id,
                payment_date: startDate,
                expiry_date: expiry_date,
                status: "Completed",                
            });

            return res.json({ success: true, payment });
        } else {
            return res.json({ success: false, message: "Signature mismatch" });
        }
    } catch (error) {
        console.error("Error verifying payment:", error);
        return res.status(500).json({ success: false, message: "Server error" });
    }

}