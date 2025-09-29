import { createTargetGoalService, getTargetGoalService, updateTargetGoalService } from "../services/targetGoalService";

export const createTargetGoal = async (req, res) => {
    let data = req.body
    const result = await createTargetGoalService(data)
    if (result.success) {
        return res.status(201).json({ success: true, message: "TargetGoal created successfully" })
    } else {
       return res.status(500).json({
            success: false,
            message: result.message,
            errors: result.errors,
        });
    }
}

export const getTargetGoal = async (req, res) => {
    const response = await getTargetGoalService(req.params.userId);
    if (response.success)
        return res.status(200).send(response);
    else {
        return res.status(500).json({ success: false, message: "Failed to get TargetGoal" });
    }
}

export const updateTargetGoal = async (req, res) => {
    const response = await updateTargetGoalService(req.params.Id, req.body)
    if (response.success) {
        return res.status(200).send(response)
    } else {
        return res.status(500).json({ success: false, message: "Failed to update TargetGoal" });
    }
}

