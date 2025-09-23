import UserTrainer from "../models/userTrainer.js";

export const createUserTrainer = async (data) => {
    try {
        let newUserTrainer = new UserTrainer(data);
        newUserTrainer = await newUserTrainer.save();
        return {success : true, UserTrainer:newUserTrainer}
    } catch (error) {
        console.log({error});
        return {
            success: false,
            message: error.message || "Failed to create UserTrainer",
            errors: error.errors || null, // contains field-level details (phone, email etc.)
        };
    }
}

export const getAllUserTrainerService = async () => {
    try {
        const allUserTrainers = await UserTrainer.find();
        return { success: true, allUserTrainers };

    } catch (error) {
        return { success: false }
    }
}

export const getUserTrainerWithId = async (id) => {
    try {
        const userTrainer = await UserTrainer.findById(id)
        if (userTrainer) {
            return userTrainer
        }
        return false

    } catch (error) {
        return false
    }
}

export const updateUserTrainerService = async (id, data) => {
    try {
        const updatedUserTrainer = await UserTrainer.findByIdAndUpdate(id, data);
        if (updatedUserTrainer) {
            return { success: true, message: "UserTrainer updated succesfully" }
        } else {
            return { success: false, message: "Failed to update" }
        }

    } catch (error) {
        console.log(error);
        return { success: false }

    }
}

export const deleteUserTrainerService = async(id) =>{
    try {
       await UserTrainer.findByIdAndDelete(id)
       return true;
    } catch (error) {
        console.log(error);
        return false;        
    }
}