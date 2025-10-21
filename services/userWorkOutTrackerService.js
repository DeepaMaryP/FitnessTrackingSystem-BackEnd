import UserWorkoutTracker from "../models/userWorkoutTracker.js";

export const createUserWorkOutTrackerService = async (data) => {
    const userId = data.userId
    const today = new Date();
    today.setHours(0, 0, 0, 0); // start of today

    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1); // start of tomorrow

    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        // Remove todays existing tracks for this user
        await UserWorkoutTracker.deleteMany({ userId: userId, date: { $gte: today, $lt: tomorrow } }, { session });

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

        const userWorkOutTracker = await UserWorkoutTracker.findOne({ userId: userId, date: { $gte: today, $lt: tomorrow } })
           
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
        
        const userWorkOutTracker = await UserWorkoutTracker.find({ userId: userId, date: { $gte: from, $lt: to } })            

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