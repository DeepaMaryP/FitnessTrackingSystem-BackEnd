import { createUserPaymentService, getLatestUserPaymentService, getPaidUserCountWithNoTrainersService } from "../services/userPaymentService.js";

export const createUserPaymentController = async (req, res) => {
    let data = req.body
    const result = await createUserPaymentService(data)
    if (result.success) {
        return res.status(201).json({ success: true, message: "UserPayment created successfully" })
    } else {
       return res.status(500).json({
            success: false,
            message: result.message,
            errors: result.errors,
        });
    }
}

export const getUserPayment = async (req, res) => {
    const response = await getLatestUserPaymentService(req.params.userId);
    if (response.success)
        return res.status(200).send(response);
    else {
        return res.status(500).json({ success: false, message: "Failed to get UserPayment" });
    }
}

export const getPaidUserCountWithNoTrainers = async (req, res) => {
    const response = await getPaidUserCountWithNoTrainersService();
    if (response.success)
        return res.status(200).send(response);
    else {
        return res.status(500).json({ success: false, message: "Failed to get Unassigned User Count" });
    }
}

