import mongoose from "mongoose";
import BodyMeasurement from "../models/bodyMeasurement.js";

export const createBodyMeasurementService = async (data) => {
    const userId = data.userId

    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);

    const session = await mongoose.startSession();
    session.startTransaction();
    try {
        // Remove todays old measurements for this user
        await BodyMeasurement.deleteMany({ userId, date: { $gte: startOfDay, $lte: endOfDay } }, { session });

        let newBodyMeasurement = new BodyMeasurement(data);
        newBodyMeasurement = await newBodyMeasurement.save({ session });

        await session.commitTransaction();
        session.endSession();
        return { success: true, BodyMeasurement: newBodyMeasurement }
    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        console.log({ error });
        return {
            success: false,
            message: error.message || "Failed to create BodyMeasurement",
            errors: error.errors || null, // contains field-level details (phone, email etc.)
        };
    }
}


export const getBodyMeasurementOfUserService = async (userId) => {
    try {
        const currBodyMeasurement = await BodyMeasurement.find({
            userId: userId
        }).sort({ date: -1 }).limit(4);

        // If no record exists, return empty object
        if (!currBodyMeasurement || currBodyMeasurement.length === 0) {
            return {
                success: true, data: null, message: "BodyMeasurement not found",
            };
        }
        return { success: true, data: currBodyMeasurement, message: "Measurements fetched successfully", };

    } catch (error) {
        console.error("Error in getCurrentBodyMeasurement:", error);
        return {
            success: false,
            data: null,
            message: error.message || "Failed to fetch Measurements",
        };
    }
}

export const getAllBodyMeasurementOfUserService = async (userId) => {
    try {
        const currBodyMeasurement = await BodyMeasurement.find({
            userId: userId
        }).sort({ date: -1 });

        // If no record exists, return empty object
        if (!currBodyMeasurement || currBodyMeasurement.length === 0) {
            return {
                success: true, data: null, message: "BodyMeasurement not found",
            };
        }
        return { success: true, data: currBodyMeasurement, message: "Measurements fetched successfully", };

    } catch (error) {
        console.error("Error in getCurrentBodyMeasurement:", error);
        return {
            success: false,
            data: null,
            message: error.message || "Failed to fetch Measurements",
        };
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

