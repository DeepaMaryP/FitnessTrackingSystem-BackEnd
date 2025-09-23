import User from "../models/user.js";

export const createUserService = async (data) => {
    try {
        let newUser = new User(data);
        newUser = await newUser.save();
        return {success : true, user:newUser}
    } catch (error) {
        console.log({error});
        return {
            success: false,
            message: error.message || "Failed to create user",
            errors: error.errors || null, // contains field-level details (phone, email etc.)
        };
    }
}

export const getUserDetailsWithEmail = async (email) => {
    try {
        const user = await User.findOne({ email })
        if (user) {
            return user
        }
        return false
    } catch (error) {
        return false
    }
}

export const getAllUsersService = async () => {
    try {
        const allUsers = await User.find();
        return { success: true, allUsers };

    } catch (error) {
        return { success: false }
    }
}

export const getUserWithId = async (id) => {
    try {
        const user = await User.findById(id)
        if (user) {
            return user
        }
        return false

    } catch (error) {
        return false
    }
}

export const updateUserService = async (id, data) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(id, data);
        if (updatedUser) {
            return { success: true, message: "User updated succesfully" }
        } else {
            return { success: false, message: "Failed to update" }
        }

    } catch (error) {
        console.log(error);
        return { success: false }

    }
}

export const deleteUserService = async(id) =>{
    try {
       await User.findByIdAndUpdate(id, { $set: { status: "InActive" } } )
       return true;
    } catch (error) {
        console.log(error);
        return false;        
    }
}