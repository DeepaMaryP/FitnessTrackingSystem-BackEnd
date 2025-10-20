import { createBodyMeasurementService, getAllBodyMeasurementOfUserService, getBodyMeasurementOfUserService, updateBodyMeasurementService } from "../services/bodyMeasurementService.js";


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


export const getBodyMeasurementOfUser = async (req, res) => {
    const response = await getBodyMeasurementOfUserService(req.params.userId);
   if (response.success)
        return res.status(200).send(response);
    else {
        return res.status(500).json(response);
    }
}

export const getAllBodyMeasurements = async (req, res) => {
     const response = await getAllBodyMeasurementOfUserService(req.params.userId);
   if (response.success)
        return res.status(200).send(response);
    else {
        return res.status(500).json(response);
    }
}

export const updateBodyMeasurement = async (req, res) => {
    const response = await updateBodyMeasurementService(req.params.Id, req.body)
    if (response.success) {
        return res.status(200).send(response)
    } else {
        return res.status(500).json({ success: false, message: "Failed to update BodyMeasurement" });
    }
}

