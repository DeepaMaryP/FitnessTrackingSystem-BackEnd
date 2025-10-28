import mongoose from "mongoose";
import UserWorkoutTracker from "../models/userWorkoutTracker.js";

export const createUserWorkOutTrackerService = async (data) => {
    const userId = data.user_id;
    const selDate = data.date;   
    
    const date = new Date(selDate);
    date.setHours(0, 0, 0, 0); // start of the date 

    const nextday = new Date(date);
    nextday.setDate(date.getDate() + 1); // start of nextday

    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        // Remove existing tracks for this user on given date
        await UserWorkoutTracker.deleteMany({ user_id: userId, date: { $gte: date, $lt: nextday } }, { session });

        let newUserWorkOutTracker = new UserWorkoutTracker(data)
        newUserWorkOutTracker = await newUserWorkOutTracker.save({ session })

        await session.commitTransaction();
        session.endSession();

        return { success: true }
    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        console.log(error);
        return {
            success: false,
            message: error.message || "Failed to create UserWorkOutTracker",
            errors: error.errors || null, // contains field-level details (phone, email etc.)
        };
    }
}

export const getTodaysWorkOutTrackerWithUserIdService = async (userId) => {
    try {
        const today = new Date();
        today.setHours(0, 0, 0, 0); // start of today

        const tomorrow = new Date(today);
        tomorrow.setDate(today.getDate() + 1); // start of tomorrow

        const userWorkOutTracker = await UserWorkoutTracker.findOne({ user_id: userId, date: { $gte: today, $lt: tomorrow } })

        if (userWorkOutTracker) {
            return {
                success: true, data: userWorkOutTracker, message: "WorkOut Tracker fetched successfully",
            };
        }
        return {
            success: true, data: null, message: "WorkOut Tracker not found",
        };

    } catch (error) {
        return {
            success: false,
            data: null,
            message: error.message || "Failed to WorkOut Tracker",
        };
    }
}

export const getUserWorkOutTrackerByDatesService = async (userId, fromdate, todate) => {
    try {
        const from = new Date(fromdate);
        const to = new Date(todate);
        to.setHours(23, 59, 59, 999);

        const userWorkOutTracker = await UserWorkoutTracker.find({ user_id: userId, date: { $gte: from, $lt: to } })

        if (userWorkOutTracker) {
            return {
                success: true, data: userWorkOutTracker, message: "WorkOut Tracker fetched successfully",
            };
        }
        return {
            success: true, data: null, message: "WorkOut Tracker not found",
        };

    } catch (error) {
        return {
            success: false,
            data: null,
            message: error.message || "Failed to WorkOut Tracker",
        };
    }
}

export const getUserWorkOutTrackerService = async (userId, date) => {
    try {
        const startDate = new Date(date);       
        startDate.setUTCHours(0, 0, 0, 0);

        // end of the day
        const end = new Date(date);
        end.setUTCHours(23, 59, 59, 999);      

        const userWorkOutTracker = await UserWorkoutTracker.find({
            user_id: userId,
            date: { $gte: startDate, $lte: end },
        })

        if (userWorkOutTracker && userWorkOutTracker.length > 0) {
            return {
                success: true, data: userWorkOutTracker[0], message: "WorkOut Tracker fetched successfully",
            };
        }
        return {
            success: true, data: null, message: "WorkOut Tracker not found",
        };

    } catch (error) {
        return {
            success: false,
            data: null,
            message: error.message || "Failed to WorkOut Tracker",
        };
    }
}