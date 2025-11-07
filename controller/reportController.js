import { getApprovalPendingTrainerCountService, getEarningsService, getGrowthPercentageService, getRevenueGrowthReportService, getSubscribedUsersWithoutTrainersService, getTrainerAssignmentCountService, getUsersMetricsForDashboardService, getUserStatisticsService } from "../services/reportService.js";

export const getRevenueGrowthReport = async (req, res) => {
    try {
        const year = parseInt(req.params.year) || new Date().getFullYear();

        const resData = await getRevenueGrowthReportService(year);
        if (resData.success) {
            const monthlyData = resData.data
            // prepare 12 months with zeros
            const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
            const result = [];
            let prevRevenue = 0;

            for (let i = 1; i <= 12; i++) {
                const match = monthlyData.find((m) => m._id.month === i);
                if (match) {
                    match.totalRevenue = match.totalRevenue / 100; // amount is stored as paise
                }
                const totalRevenue = match ? match.totalRevenue : 0;
                let growth;

                if (prevRevenue === 0 && totalRevenue > 0) {
                    // Revenue started from zero → infinite growth
                    growth = 100;
                } else if (prevRevenue > 0) {
                    growth = (((totalRevenue - prevRevenue) / prevRevenue) * 100).toFixed(1);
                } else {
                    growth = 0;
                }

                result.push({
                    monthYear: `${monthNames[i - 1]} ${year}`,
                    totalRevenue,
                    growth: parseFloat(growth),
                });
                prevRevenue = totalRevenue;
            }

            return res.status(200).json({ success: true, data: result });
        } else {
            return res.status(500).json({
                success: false,
                message: resData.message,
                errors: resData.errors,
            });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error generating revenue growth report" });
    }
};

export const getEarnings = async (req, res) => {
    try {
        const date = new Date(req.params.date) || new Date();
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        
        const resData = await getEarningsService(year, month);     
        if (resData.success) {
            const totalEarnings = resData.data[0].totalRevenue /100 // amount is stored as paise            
            return res.status(200).json({ success: true, earnings: totalEarnings });
        } else {
            return res.status(500).json({
                success: false,
                message: resData.message,
                errors: resData.errors,
            });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error generating revenue growth report" });
    }
};

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
                    month: m + 1,
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

export const getUserMetrics = async (req, res) => {
    const response = await getUsersMetricsForDashboardService();
    if (response.success)
        return res.status(200).send(response);
    else {
        return res.status(500).json({ success: false, message: "Failed to get users count" });
    }
}

function getLastSixMonths() {
    const months = [];
    const today = new Date();

    for (let i = 5; i >= 0; i--) {
        const d = new Date(today.getFullYear(), today.getMonth() - i, 1);
        months.push({
            year: d.getFullYear(),
            month: d.getMonth() + 1, // JS months are 0-based
            label: d.toLocaleString("default", { month: "short", year: "numeric" }),
            registrations: 0
        });
    }
    return months;
}

export const getUserStatistics = async (req, res) => {
    let monthsList = getLastSixMonths();
    const response = await getUserStatisticsService();
    if (response.success) {
        monthsList = monthsList.map(m => {
            const match = response.userCounts.find(r => r._id.year === m.year && r._id.month === m.month);
            return {
                ...m,
                registrations: match ? match.count : 0
            };
        });
        
        return res.status(200).json({success:true, monthsList: monthsList});
    }
    else {
        return res.status(500).json({ success: false, message: "Failed to get users statistics" });
    }
}

export const getTrainerAssignmentCount = async (req, res) => {   
    const response = await getTrainerAssignmentCountService();
    if (response.success) {       
        return res.status(200).json({success:true, trainerStats: response.trainerStats});
    }
    else {
        return res.status(500).json({ success: false, message: "Failed to get trainer statistics" });
    }
}

export const getSubscribedUsersWithoutTrainers = async (req, res) => {   
    const response = await getSubscribedUsersWithoutTrainersService();    
    if (response.success) {       
        return res.status(200).send(response);
    }
    else {
        return res.status(500).send(response);
    }
}

export const getApprovalPendingTrainerCount = async (req, res) => {   
    const response = await getApprovalPendingTrainerCountService();     
    if (response.success) {       
        return res.status(200).send(response);
    }
    else {
        return res.status(500).send(response);
    }
}