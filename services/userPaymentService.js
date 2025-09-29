import UserPayment from "../models/userPayment.js"

export const createUserPaymentService = async (data) => {
    try {
        let newUserPayment = new UserPayment(data)
        newUserPayment = await newUserPayment.save()
        return { success: true }
    } catch (error) {
        console.log(error);
        return {
            success: false,
            message: error.message || "Failed to create UserPayment",
            errors: error.errors || null, // contains field-level details (phone, email etc.)
        };
    }
}

export const getLatestUserPaymentService = async (userId) => {
    try {
        const allUserPayment = await UserPayment.find({
            userId: userId, expiry_date: { $gte: today }
        });
        return { success: true, allUserPayment };

    } catch (error) {
        return { success: false }
    }
}

export const getPaidUserCountWithNoTrainersService = async () => {
    try {
        const totalUnassignedPaidUsers = await UserPayment.aggregate([
            {
                $match: {
                    status: "Completed",
                    expiry_date: { $gte: new Date() }
                }
            },
            {
                $lookup: {
                    from: "userTrainer",
                    localField: "userId",
                    foreignField: "userId",
                    as: "trainerAssignment"
                }
            },
            {
                $match: {
                    trainerAssignment: { $size: 0 }
                }
            },
            {
                $count: "totalUnassignedPaidUsers"
            }
        ]);

        return { success: true, totalUnassignedPaidUsers };

    } catch (error) {
        return { success: false }
    }
}