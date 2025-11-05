import { getGrowthPercentageService, getRevenueGrowthReportService } from "../services/reportService.js";

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
            return res.status(200).json({ year, data: result });
           
        } else {
            return res.status(500).json({
                success: false,
                message: result.message,
                errors: result.errors,
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
