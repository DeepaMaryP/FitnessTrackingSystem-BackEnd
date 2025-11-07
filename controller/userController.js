import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { createUserService, createUserTrainerService, deleteUserService, getAllActivePaidUsersService, getAllActiveUnAssignedPaidUsersService, getAllUsersService, getUserDetailsWithEmail, getUserWithId, updateUserService, updateUserTrainerService } from "../services/userService.js"

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

        const token = jwt.sign({ name: user.name, email: user.email, id: user._id}, process.env.JWT_SECRET, {
            expiresIn: '1h'
        })
        res.status(200).json({ success: true, token, name: user.name, userId:user._id, role: user.role  })
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

export const getActivePaidUsers = async (req, res) => {
    const response = await getAllActivePaidUsersService();
    if (response.success)
        return res.status(200).send(response);
    else {
        return res.status(500).json({ success: false, message: "Failed to get users" });
    }
}

export const getActiveUnAssignedPaidUsers = async (req, res) => {
    const response = await getAllActiveUnAssignedPaidUsersService();
    if (response.success)
        return res.status(200).send(response);
    else {
        return res.status(500).json({ success: false, message: "Failed to get users" });
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

