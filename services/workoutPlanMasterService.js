import WorkOutPlanMaster from "../models/workOutPlanMaster.js";

export const createWorkOutPlanMaster = async (data) => {
    try {
        let newWorkOutPlanMaster = new WorkOutPlanMaster(data);
        newWorkOutPlanMaster = await newWorkOutPlanMaster.save();
        return {success : true, WorkOutPlanMaster:newWorkOutPlanMaster}
    } catch (error) {
        console.log({error});
        return {
            success: false,
            message: error.message || "Failed to create WorkOutPlanMaster",
            errors: error.errors || null, // contains field-level details (phone, email etc.)
        };
    }
}

export const getAllWorkOutPlanMasterService = async () => {
    try {
        const allWorkOutPlanMaster = await WorkOutPlanMaster.find();
        return { success: true, allWorkOutPlanMaster };

    } catch (error) {
        return { success: false }
    }
}

export const getWorkOutPlanMasterWithId = async (id) => {
    try {
        const workOutPlanMaster = await WorkOutPlanMaster.findById(id)
        if (workOutPlanMaster) {
            return workOutPlanMaster
        }
        return false

    } catch (error) {
        return false
    }
}

export const updateWorkOutPlanMasterService = async (id, data) => {
    try {
        const updatedWorkOutPlanMaster = await WorkOutPlanMaster.findByIdAndUpdate(id, data);
        if (updatedWorkOutPlanMaster) {
            return { success: true, message: "WorkOutPlanMaster updated succesfully" }
        } else {
            return { success: false, message: "Failed to update" }
        }

    } catch (error) {
        console.log(error);
        return { success: false }

    }
}

export const deleteWorkOutPlanMasterService = async(id) =>{
    try {
       await WorkOutPlanMaster.findByIdAndDelete(id)
       return true;
    } catch (error) {
        console.log(error);
        return false;        
    }
}