import BodyMeasurement from "../models/bodyMeasurements.js";

export const createBodyMeasurementService = async (data) => {
    try {
        let newBodyMeasurement = new BodyMeasurement (data);
        newBodyMeasurement = await newBodyMeasurement.save();
        return {success : true, BodyMeasurement:newBodyMeasurement}
    } catch (error) {
        console.log({error});
        return {
            success: false,
            message: error.message || "Failed to create BodyMeasurement",
            errors: error.errors || null, // contains field-level details (phone, email etc.)
        };
    }
}


export const getCurrentBodyMeasurementService = async (userId) => {
    try {
        const currBodyMeasurement = await BodyMeasurement.findOne({
            userId: userId
        }).sort({ Date: -1 });
        return { success: true, currBodyMeasurement };

    } catch (error) {
        return { success: false }
    }
}

export const getBodyMeasuremenHistoryService = async (userId) => {
    try {
        const bodyMeasurement = await BodyMeasurement.find({
            userId: userId
        })

        if (bodyMeasurement) {
            return bodyMeasurement
        }
        return false

    } catch (error) {
        return false
    }
}

export const updateBodyMeasurementService = async (id, data) => {
    try {
        const updatedBodyMeasurement = await BodyMeasurement.findByIdAndUpdate(id, data);
        if (updatedBodyMeasurement) {
            return { success: true, message: "BodyMeasurement updated succesfully" }
        } else {
            return { success: false, message: "Failed to update" }
        }

    } catch (error) {
        console.log(error);
        return { success: false }

    }
}

