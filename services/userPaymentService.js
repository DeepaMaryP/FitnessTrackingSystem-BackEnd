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

export const getAllUserPaymentService = async () => {
    try {
        const allUserPayment = await UserPayment.find();
        return { success: true, allUserPayment };

    } catch (error) {
        return { success: false }
    }
}

export const getUserPaymentWithId = async (id) => {
    try {
        const userPayment = await UserPayment.findById(id)
        if (userPayment) {
            return userPayment
        }
        return false

    } catch (error) {
        return false
    }
}

export const updateUserPaymentService = async (id, data) => {
    try {
        const updatedUserPayment = await UserPayment.findByIdAndUpdate(id, data);
        if (updatedUserPayment) {
            return { success: true, message: "UserPayment updated succesfully" }
        } else {
            return { success: false, message: "Failed to update" }
        }

    } catch (error) {
        console.log(error);
        return { success: false }

    }
}

