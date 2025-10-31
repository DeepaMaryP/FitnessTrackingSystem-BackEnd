import { approvePaymentPlanService, createPaymentPlanService, deletePaymentPlanService, getAllPaymentPlanService, getPaymentPlanWithId, getTotalEarningsService, updatePaymentPlanService } from "../services/paymentPlanMasterService.js";

export const createPaymentPlan = async (req, res) => {
    let data = req.body  
    const result = await createPaymentPlanService(data)
    if (result.success) {
        return res.status(201).json({ success: true, message: "Payment Plan created successfully" })
    } else {
       return res.status(500).json({
            success: false,
            message: result.message,
            errors: result.errors,
        });
    }
}


export const getPaymentPlans = async (req, res) => {     
    const response = await getAllPaymentPlanService();    
    if (response.success)
        return res.status(200).send(response);
    else {
        return res.status(500).json({ success: false, message: "Failed to get payment plans" });
    }
}

export const getPaymentPlanById = async (req, res) => {
    const response = await getPaymentPlanWithId(req.params.Id);
    if (response)
        return res.status(200).send(response);
    else {
        return res.status(500).send(response);
    }
}

export const updatePaymentPlan = async (req, res) => {
    const response = await updatePaymentPlanService(req.params.Id, req.body)
    if (response.success) {
        return res.status(200).send(response)
    } else {
        return res.status(500).json({ success: false, message: "Failed to update Payment Plan" });
    }
}

export const approvePaymentPlan = async (req, res) => {
    const response = await approvePaymentPlanService(req.params.Id)
    if (response) {
        return res.status(200).json({ success: true, message: "Payment Plan approved successfully" })
    } else {
        return res.status(500).json({ success: false, message: "Failed to approve Payment Plan" });
    }
}

export const deletePaymentPlan = async (req, res) => {
    const response = await deletePaymentPlanService(req.params.Id)
    if (response) {
        return res.status(200).json({ success: true, message: "Payment Plan deleted successfully" })
    } else {
        return res.status(500).json({ success: false, message: "Failed to delete Payment Plan" });
    }
}

export const getTotalEarnings = async (req, res) => {
    const response = await getTotalEarningsService(req.params.date)
    if (response) {
        return res.status(200).json({ success: true, total: response.total })
    } else {
        return res.status(500).json({ success: false, message: "Failed to get Total earnings" });
    }
}
