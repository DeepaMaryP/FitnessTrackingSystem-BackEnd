import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { createUserService, createUserTrainerService, deleteUserService, getAllUsersService, getUserDetailsWithEmail, getUsersCountForDashboardService, getUserStatisticsService, getUserWithId, updateUserService, updateUserTrainerService } from "../services/userService.js"

export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await getUserDetailsWithEmail(email)

        if (!user) {
            return res.status(400).json({ success: false, message: "user do not exist" })
        }

        const isValidUser = await bcrypt.compare(password, user.passwordHash)
        if (!isValidUser) {
            return res.status(400).json({ success: false, message: "Wrong Password" })
        }

        const token = jwt.sign({ name: user.name, email: user.email, id: user._id }, process.env.JWT_SECRET, {
            expiresIn: '1h'
        })
        res.status(200).json({ success: true, token, name: user.name })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: "Failed to sign in" });
    }
}

export const createUser = async (req, res) => {
    let data = req.body
    const updatedPassword = await bcrypt.hash(data.passwordHash, 10)
    data.passwordHash = updatedPassword

    const result = await createUserService(data)
    if (result.success) {
        return res.status(201).json({ success: true, userName: result.user.email, message: "User created successfully" })
    } else {
        return res.status(500).json({
            success: false,
            message: result.message,
            errors: result.errors,
        });
    }
}

export const createUserTrainer = async (req, res) => {
    let {user, trainer} = req.body
    const updatedPassword = await bcrypt.hash(user.passwordHash, 10)
    user.passwordHash = updatedPassword

    const result = await createUserTrainerService(user, trainer)
    if (result.success) {
        return res.status(201).json({ success: true, userName: result.user.email, message: "User created successfully" })
    } else {
        return res.status(500).json({
            success: false,
            message: result.message,
            errors: result.errors,
        });
    }
}

export const getUsers = async (req, res) => {
    const response = await getAllUsersService();
    if (response.success)
        return res.status(200).send(response);
    else {
        return res.status(500).json({ success: false, message: "Failed to get users" });
    }
}

export const getUsersCount = async (req, res) => {
    const response = await getUsersCountForDashboardService();
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

        console.log(monthsList);
        return res.status(200).send(monthsList);
    }
    else {
        return res.status(500).json({ success: false, message: "Failed to get users statistics" });
    }
}

export const getUserById = async (req, res) => {
    const response = await getUserWithId(req.params.userId);
    if (response)
        return res.status(200).send(response);
    else {
        return res.status(500).json({ success: false, message: "Failed to get user" });
    }
}

export const updateUser = async (req, res) => {
    const response = await updateUserService(req.params.userId, req.body)
    if (response.success) {
        return res.status(200).send(response)
    } else {
        return res.status(500).json({ success: false, message: "Failed to update user" });
    }
}

export const updateUserTrainer = async (req, res) => {
    const {user, trainer} = req.body;
    const response = await updateUserTrainerService(req.params.userId, user, trainer)
    if (response.success) {
        return res.status(200).send(response)
    } else {
        return res.status(500).json({ success: false, message: "Failed to update user" });
    }
}

export const updateUserPassword = async (req, res) => {
    let data = req.body
    const updatedPassword = await bcrypt.hash(data.passwordHash, 10)
    data.passwordHash = updatedPassword

    const response = await updateUserService(req.params.userId, data)
    if (response.success) {
        return res.status(200).send(response)
    } else {
        return res.status(500).json({ success: false, message: "Failed to update user" });
    }
}

export const deleteUser = async (req, res) => {
    const response = await deleteUserService(req.params.userId)
    if (response) {
        return res.status(200).json({ success: true, message: "User deleted successfully" })
    } else {
        return res.status(500).json({ success: false, message: "Failed to delete user" });
    }
}

