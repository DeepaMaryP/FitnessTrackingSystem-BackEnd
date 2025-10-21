import WorkOutPlan from "../models/workOutPlan.js";

export const createWorkOutPlanService = async (data) => {
    try {
        let newWorkOutPlan = new WorkOutPlan(data);
        newWorkOutPlan = await newWorkOutPlan.save();
        return {success : true, WorkOutPlan:newWorkOutPlan}
    } catch (error) {
        console.log({error});
        return {
            success: false,
            message: error.message || "Failed to create WorkOutPlan",
            errors: error.errors || null, // contains field-level details (phone, email etc.)
        };
    }
}

export const getAllWorkOutPlanService = async () => {
    try {
        const allWorkOutPlans = await WorkOutPlan.find();
       if (allWorkOutPlans) {
            return {
                success: true, data: allWorkOutPlans, message: "WorkOutPlans fetched successfully",
            };
        }
        return {
            success: true, data: null, message: "WorkOutPlan not found",
        };

    } catch (error) {
        return {
            success: false,
            data: null,
            message: error.message || "Failed to WorkOutPlan",
        };
    }
}

export const getWorkOutPlanWithId = async (id) => {
    try {
        const WorkOutPlan = await WorkOutPlan.findById(id)
        if (WorkOutPlan) {
            return WorkOutPlan
        }
        return false

    } catch (error) {
        return false
    }
}

export const updateWorkOutPlanService = async (id, data) => {
    try {
        const updatedWorkOutPlan = await WorkOutPlan.findByIdAndUpdate(id, data);
        if (updatedWorkOutPlan) {
            return { success: true, message: "WorkOutPlan updated succesfully" }
        } else {
            return { success: false, message: "Failed to update" }
        }

    } catch (error) {
        console.log(error);
        return { success: false }

    }
}

export const deleteWorkOutPlanService = async(id) =>{
    try {
       await WorkOutPlan.findByIdAndDelete(id)
       return true;
    } catch (error) {
        console.log(error);
        return false;        
    }
}