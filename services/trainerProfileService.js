import mongoose from 'mongoose'
import TrainerProfile from "../models/trainerProfile.js";
import User from '../models/user.js';

export const createTrainerProfileService = async (data) => {

    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        // Step 1: create user
        const { name, email, passwordHash, phone } = data
        const newUser = await User.create([{
            name, email, passwordHash, phone, role: "Trainer"
        }], { session });

        // Step 2: create trainer profile

        const { qualification, experience_years, specialization, certification } = data
        await TrainerProfile.create([{
            user_id: newUser[0]._id,
            qualification, experience_years, specialization, certification
        }], { session });

        await session.commitTransaction();
        return { success: true, trainerProfile: newUser[0] }

    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        console.log({ error });
        return {
            success: false,
            message: error.message || "Failed to create TrainerProfile",
            errors: error.errors || null, // contains field-level details (phone, email etc.)
        };
    }
}

export const getAllTrainersProfileService = async () => {
    try {
        const allTrainersProfile = await TrainerProfile.find().populate('userId', 'name');
        return { success: true, allTrainersProfile };

    } catch (error) {
        return { success: false }
    }
}

export const getApprovedTrainersProfileService = async () => {
    try {
        const allTrainersProfile = await TrainerProfile.find({
            approvedStatus:
                'approved'
        }).populate('userId', 'name');;
        return { success: true, allTrainersProfile };

    } catch (error) {
        return { success: false }
    }
}

export const getTrainerProfileWithUserId = async (id) => {
    try {
        const trainerProfile = await TrainerProfile.findOne({ userId: id });
        if (trainerProfile) {
            return { success: true, data: trainerProfile, message: "Fetched TrainerProfile successfully" }
        }
        return { success: true, data: null, message: "TrainerProfile Not Found" }

    } catch (error) {
        return { success: false, data: null, message: "Failed to fetch TrainerProfile" }
    }
}

export const getApprovedTrainerCountService = async () => {
    try {
        const approvedTrainerCount = await TrainerProfile.countDocuments({
            approvedStatus: "approved"
        });

        return { success: true, count: approvedTrainerCount }

    } catch (error) {
        console.log(error);

        return false
    }
}

export const getPendingTrainerCountService = async () => {
    try {
        const approvedTrainerCount = await TrainerProfile.countDocuments({
            approvedStatus: "pending"
        });

        return { success: true, count: approvedTrainerCount }

    } catch (error) {
        console.log(error);

        return false
    }
}

export const updateTrainerProfileService = async (id, data) => {
    try {
        const updatedTrainerProfile = await TrainerProfile.findByIdAndUpdate(id, data);
        if (updatedTrainerProfile) {
            return { success: true, message: "TrainerProfile updated succesfully" }
        } else {
            return { success: false, message: "Failed to update" }
        }

    } catch (error) {
        console.log(error);
        return { success: false }

    }
}

export const deleteTrainerProfileService = async (id) => {
    try {
        await TrainerProfile.findByIdAndUpdate(id, { $set: { availability_status: "inactive" } })
        return true;
    } catch (error) {
        console.log(error);
        return false;
    }
}

export const approveTrainerService = async (id, data) => {
    try {
        await TrainerProfile.findByIdAndUpdate(id, { $set: { approvedStatus: "approved", approvedBy: data, approvedAt: new Date() } })
        return true;
    } catch (error) {
        console.log(error);
        return false;
    }
}

export const updateVerificationDocumentService = async (id, data) => {
    try {
        await TrainerProfile.findByIdAndUpdate(id, { $set: { certification: data } })
        return true;
    } catch (error) {
        console.log(error);
        return false;
    }
}