import { createTargetGoalService, getGrowthPercentageService, getTargetGoalAndStatService, getTargetGoalService, updateTargetGoalService } from "../services/targetGoalService.js";

export const createTargetGoal = async (req, res) => {
    let data = req.body
    const startDate = new Date();
    const endDate = new Date(startDate);
    endDate.setDate(startDate.getDate() + Number(data.duration_days));
    const targetGoal = { ...data, start_date: startDate, end_date: endDate }

    const result = await createTargetGoalService(targetGoal)
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
        return res.status(500).json(response);
    }
}

export const getTargetGoalAndStat = async (req, res) => {
    const response = await getTargetGoalAndStatService(req.params.userId);
    if (response.success)
        return res.status(200).send(response);
    else {
        return res.status(500).json(response);
    }
}

export const getGrowthPercentage = async (req, res) => {
    const response = await getGrowthPercentageService();

    if (response.success) {
        const rawData = response.data;
        const fullYear = [];
        const currentYear = new Date().getFullYear();

        for (let m = 0; m < 12; m++) {
            const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
            const found = rawData.find((r) => r._id.year === currentYear && r._id.month === m);
            if (found) found.monthYear = `${monthNames[m]} ${currentYear}`
            fullYear.push(
                found || {
                    year: currentYear,
                    month: m+1,
                    monthYear: `${monthNames[m]} ${currentYear}`,
                    totalGoals: 0,
                    achievedGoals: 0,
                    achievementRate: 0,
                }
            );
        }
        
        return res.status(200).send({ success: true, data: fullYear });
    }
    else {
        return res.status(500).json(response);
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

