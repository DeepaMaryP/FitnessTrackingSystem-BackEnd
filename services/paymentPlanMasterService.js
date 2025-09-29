import PaymentPlan from "../models/paymentPlanMaster.js";

export const createPaymentPlanService = async (data) => {
    try {
        let newPaymentPlan = new PaymentPlan(data);
        newPaymentPlan = await newPaymentPlan.save();
        return { success: true, PaymentPlan: newPaymentPlan }
    } catch (error) {
        console.log({ error });
        return {
            success: false,
            message: error.message || "Failed to create PaymentPlan",
            errors: error.errors || null, // contains field-level details (phone, email etc.)
        };
    }
}


export const getAllPaymentPlanService = async () => {
    try {
        const allPaymentPlan = await PaymentPlan.find();
        return { success: true, allPaymentPlan };

    } catch (error) {
        return { success: false }
    }
}

export const getPaymentPlanWithId = async (id) => {
    try {
        const paymentPlan = await PaymentPlan.findById(id)
        if (paymentPlan) {
            return paymentPlan
        }
        return false

    } catch (error) {
        return false
    }
}

export const updatePaymentPlanService = async (id, data) => {
    try {
        const updatedPaymentPlan = await PaymentPlan.findByIdAndUpdate(id, data);
        if (updatedPaymentPlan) {
            return { success: true, message: "PaymentPlan updated succesfully" }
        } else {
            return { success: false, message: "Failed to update" }
        }

    } catch (error) {
        console.log(error);
        return { success: false }

    }
}


export const approvePaymentPlanService = async (id) => {
    try {
        const updatedPaymentPlan = await PaymentPlan.findByIdAndUpdate(id, { $set: { status: "Approved" } })
        if (updatedPaymentPlan) {
            return { success: true, message: "PaymentPlan approved succesfully" }
        } else {
            return { success: false, message: "Failed to update" }
        }

    } catch (error) {
        console.log(error);
        return { success: false }

    }
}


export const deletePaymentPlanService = async (id) => {
    try {
        await PaymentPlan.findByIdAndDelete(id)
        return true;
    } catch (error) {
        console.log(error);
        return false;
    }
}

export const getTotalEarningsService = async (date) => {
    try {
        const newDate = new Date(date)
        const selMonth = newDate.getMonth();
        const selYear = newDate.getFullYear();

        const result = await PaymentPlan.aggregate([
            {
                $match: {
                    $expr: {
                        $and: [
                            { $eq: [{ $month: "$createdAt" }, selMonth] },
                            { $eq: [{ $year: "$createdAt" }, selYear] }
                        ]
                    }
                }
            },
            {
                $group: {
                    _id: null,
                    totalEarnings: { $sum: "$price" }
                }
            }
        ]);

        const totalEarningsThisMonth = result.length > 0 ? result[0].totalEarnings : 0;
        console.log("Total Earnings This Month:", totalEarningsThisMonth);

        return { success: true, total: totalEarningsThisMonth }
    } catch (error) {
        console.log(error);
        return false;
    }
}