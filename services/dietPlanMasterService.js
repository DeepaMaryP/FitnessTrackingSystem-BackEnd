import DietPlan from "../models/dietPlanMaster.js";

export const createDietPlanService = async (data) => {
    try {
        let newDietPlan = new DietPlan (data);
        newDietPlan = await newDietPlan.save();
        return {success : true, DietPlan:newDietPlan}
    } catch (error) {
        console.log({error});
        return {
            success: false,
            message: error.message || "Failed to create DietPlan",
            errors: error.errors || null, // contains field-level details (phone, email etc.)
        };
    }
}


export const getAllDietPlanService = async () => {
    try {
        const allDietPlan = await DietPlan.find();
        return { success: true, allDietPlan };

    } catch (error) {
        return { success: false }
    }
}

export const getDietPlanWithId = async (id) => {
    try {
        const dietPlan = await DietPlan.findById(id)
        if (dietPlan) {
            return dietPlan
        }
        return false

    } catch (error) {
        return false
    }
}

export const updateDietPlanService = async (id, data) => {
    try {
        const updatedDietPlan = await DietPlan.findByIdAndUpdate(id, data);
        if (updatedDietPlan) {
            return { success: true, message: "DietPlan updated succesfully" }
        } else {
            return { success: false, message: "Failed to update" }
        }

    } catch (error) {
        console.log(error);
        return { success: false }

    }
}

export const deleteDietPlanService = async(id) =>{
    try {
       await DietPlan.findByIdAndDelete(id)
       return true;
    } catch (error) {
        console.log(error);
        return false;        
    }
}