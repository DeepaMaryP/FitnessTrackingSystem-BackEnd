import { createBodyMeasurementService, getBodyMeasuremenHistoryService, getCurrentBodyMeasurementService, updateBodyMeasurementService } from "../services/bodyMeasurementService";


export const createBodyMeasurement = async (req, res) => {
    let data = req.body
    const result = await createBodyMeasurementService(data)
    if (result.success) {
        return res.status(201).json({ success: true, message: "BodyMeasurement created successfully" })
    } else {
       return res.status(500).json({
            success: false,
            message: result.message,
            errors: result.errors,
        });
    }
}


export const getCurrentBodyMeasurement = async (req, res) => {
    const response = await getCurrentBodyMeasurementService(req.params.userId);
    if (response.success)
        return res.status(200).send(response);
    else {
        return res.status(500).json({ success: false, message: "Failed to get BodyMeasurement" });
    }
}

export const getBodyMeasurementHistory = async (req, res) => {
    const response = await getBodyMeasuremenHistoryService(req.params.userId);
    if (response)
        return res.status(200).send(response);
    else {
        return res.status(500).json({ success: false, message: "Failed to get BodyMeasurement" });
    }
}

export const updateBodyMeasurement = async (req, res) => {
    const response = await updateBodyMeasurementService(req.params.userId, req.body)
    if (response.success) {
        return res.status(200).send(response)
    } else {
        return res.status(500).json({ success: false, message: "Failed to update BodyMeasurement" });
    }
}

