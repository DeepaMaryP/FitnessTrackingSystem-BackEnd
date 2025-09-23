import FoodMaster from "../models/foodMaster.js";

export const createFoodMasterService = async (data) => {
    try {
        let newfoodMaster = new FoodMaster (data);
        newfoodMaster = await newfoodMaster.save();
        return {success : true, foodMaster:newfoodMaster}
    } catch (error) {
        console.log({error});
        return {
            success: false,
            message: error.message || "Failed to create FoodMaster",
            errors: error.errors || null, // contains field-level details (phone, email etc.)
        };
    }
}


export const getAllFoodMasterService = async () => {
    try {
        const allFoodMaster = await FoodMaster.find();
        return { success: true, allFoodMaster };

    } catch (error) {
        return { success: false }
    }
}

export const getFoodMasterWithId = async (id) => {
    try {
        const foodMaster = await FoodMaster.findById(id)
        if (foodMaster) {
            return foodMaster
        }
        return false

    } catch (error) {
        return false
    }
}

export const updateFoodMasterService = async (id, data) => {
    try {
        const updatedFoodMaster = await FoodMaster.findByIdAndUpdate(id, data);
        if (updatedFoodMaster) {
            return { success: true, message: "FoodMaster updated succesfully" }
        } else {
            return { success: false, message: "Failed to update" }
        }

    } catch (error) {
        console.log(error);
        return { success: false }

    }
}

export const deleteFoodMasterService = async(id) =>{
    try {
       await FoodMaster.findByIdAndDelete(id)
       return true;
    } catch (error) {
        console.log(error);
        return false;        
    }
}