import UserTrainer from "../models/userTrainer.js";

export const createUserTrainerService = async (data) => {
    try {
        let newUserTrainer = new UserTrainer(data);
        newUserTrainer = await newUserTrainer.save();
        return { success: true, UserTrainer: newUserTrainer }
    } catch (error) {
        console.log({ error });
        return {
            success: false,
            message: error.message || "Failed to create UserTrainer",
            errors: error.errors || null, // contains field-level details (phone, email etc.)
        };
    }
}

export const getAllUserTrainersService = async (userId) => {
    try {
        const allUserTrainers = await UserTrainer.find({ userId: userId });
        return { success: true, allUserTrainers };

    } catch (error) {
        console.log(error);
        return { success: false }
    }
}

export const getUserTrainerStatisticsService = async () => {
    try {
        const trainerUserCount = await UserTrainer.aggregate([
            {
                $group: {
                    _id: "$trainer_id",
                    userCount: { $sum: 1 }
                }
            }, { $sort: { userCount: -1 } },
            { $limit: 5 }, {
                $lookup: {
                    from: "Users",
                    localField: "_id",
                    foreignField: "_id",
                    as: "trainer"
                }
            }, { $unwind: "$trainer" }, {
                $project: {
                    _id: 0,
                    trainerId: "$trainer._id",
                    name: "$trainer.name",
                    email: "$trainer.email",
                    userCount: 1
                }
            }
        ])
        return { success: true, trainerUserCount };

    } catch (error) {
        console.log(error);
        return { success: false }
    }
}

export const deleteUserTrainerService = async (id) => {
    try {
        await UserTrainer.findByIdAndDelete(id)
        return true;
    } catch (error) {
        console.log(error);
        return false;
    }
}