import ExerciseMaster from "../models/exerciseMaster.js";

export const createExerciseMasterService = async (data) => {
    try {
        let newExerciseMaster = new ExerciseMaster(data);
        newExerciseMaster = await newExerciseMaster.save();
        return { success: true, ExerciseMaster: newExerciseMaster }
    } catch (error) {
        console.log({ error });
        return {
            success: false,
            message: error.message || "Failed to create ExerciseMaster",
            errors: error.errors || null, // contains field-level details (phone, email etc.)
        };
    }
}


export const getAllExerciseMasterService = async () => {
    try {
        const allExerciseMaster = await ExerciseMaster.find();
        return { success: true, allExerciseMaster };

    } catch (error) {
        return { success: false }
    }
}

export const getExerciseMasterWithId = async (id) => {
    try {
        const exerciseMaster = await ExerciseMaster.findById(id)
        if (exerciseMaster) {
            return exerciseMaster
        }
        return false

    } catch (error) {
        return false
    }
}

export const updateExerciseMasterService = async (id, data) => {
    try {
        const updatedExerciseMaster = await ExerciseMaster.findByIdAndUpdate(id, data);
        if (updatedExerciseMaster) {
            return { success: true, message: "ExerciseMaster updated succesfully" }
        } else {
            return { success: false, message: "Failed to update" }
        }

    } catch (error) {
        console.log(error);
        return { success: false }

    }
}

export const deleteExerciseMasterService = async (id) => {
    try {
        await ExerciseMaster.findByIdAndDelete(id)
        return true;
    } catch (error) {
        console.log(error);
        return false;
    }
}