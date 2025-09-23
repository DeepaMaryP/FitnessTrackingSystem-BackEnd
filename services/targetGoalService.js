import TargetGoal from "../models/targetGoal.js";

export const createTargetGoalService = async (data) => {
    try {
        let newTargetGoal = new TargetGoal (data);
        newTargetGoal = await newTargetGoal.save();
        return {success : true, TargetGoal:newTargetGoal}
    } catch (error) {
        console.log({error});
        return {
            success: false,
            message: error.message || "Failed to create TargetGoal",
            errors: error.errors || null, // contains field-level details (phone, email etc.)
        };
    }
}


export const getAllTargetGoalService = async () => {
    try {
        const allTargetGoal = await TargetGoal.find();
        return { success: true, allTargetGoal };

    } catch (error) {
        return { success: false }
    }
}

export const getTargetGoalWithId = async (id) => {
    try {
        const targetGoal = await TargetGoal.findById(id)
        if (targetGoal) {
            return targetGoal
        }
        return false

    } catch (error) {
        return false
    }
}

export const updateTargetGoalService = async (id, data) => {
    try {
        const updatedTargetGoal = await TargetGoal.findByIdAndUpdate(id, data);
        if (updatedTargetGoal) {
            return { success: true, message: "TargetGoal updated succesfully" }
        } else {
            return { success: false, message: "Failed to update" }
        }

    } catch (error) {
        console.log(error);
        return { success: false }

    }
}
