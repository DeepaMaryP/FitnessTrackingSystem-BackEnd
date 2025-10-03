export const handleValidateUserSignIn = async (req, res, next) => {
    const { email, password } = req.body

    if (!email) {
        return res.status(400).json({ success: false, message: "please enter email" })
    }
    if (!password) {
        return res.status(400).json({ success: false, message: "please enter password" })
    }
    next()
}

export const validateUser = async (req, res, next) => {
    const { name, email, passwordHash, phone } = req.body

    if (!name) {
        return res.status(400).json({ success: false, message: "please enter name" })
    }
    if (!email) {
        return res.status(400).json({ success: false, message: "please enter email" })
    }
    if (!passwordHash) {
        return res.status(400).json({ success: false, message: "please enter password" })
    }

    if (phone) {
        const tenDigit = /^[0-9]{10}$/;
        // Allow: + followed by 1–3 digit country code and 7–12 digit number
        // Example: +91XXXXXXXXXX, +1415XXXXXXX
        const withCountryCode = /^\+[0-9]{1,3}[0-9]{7,12}$/;

        if (!(tenDigit.test(phone) || withCountryCode.test(phone))) {
            return res.status(400).json({
                success: false,
                message:
                    "Invalid phone number. Please enter a 10-digit number (e.g., 9876543210) or include country code (e.g., +919876543210)."
            });
        }
    }

    next()

}

export const validateUserForAdmin = async (req, res, next) => {
    const { name, email, passwordHash, role, phone } = req.body

    if (!name) {
        return res.status(400).json({ success: false, message: "please enter name" })
    }
    if (!email) {
        return res.status(400).json({ success: false, message: "please enter email" })
    }
    if (!passwordHash) {
        return res.status(400).json({ success: false, message: "please enter password" })
    }
    if (!role) {
        return res.status(400).json({ success: false, message: "please enter role" })
    }

    if (phone) {
        const tenDigit = /^[0-9]{10}$/;
        // Allow: + followed by 1–3 digit country code and 7–12 digit number
        // Example: +91XXXXXXXXXX, +1415XXXXXXX
        const withCountryCode = /^\+[0-9]{1,3}[0-9]{7,12}$/;

        if (!(tenDigit.test(phone) || withCountryCode.test(phone))) {
            return res.status(400).json({
                success: false,
                message:
                    "Invalid phone number. Please enter a 10-digit number (e.g., 9876543210) or include country code (e.g., +919876543210)."
            });
        }
    }

    next()

}

export const validateUserTrainerForAdmin = async (req, res, next) => {
    const { user, trainer } = req.body
    const { name, email, passwordHash, role, phone } = user
    const { qualification, experience_years, specialization, certification } = trainer

    if (!name) {
        return res.status(400).json({ success: false, message: "Please enter name" })
    }
    if (!email) {
        return res.status(400).json({ success: false, message: "Please enter email" })
    }
    if (!passwordHash) {
        return res.status(400).json({ success: false, message: "Please enter password" })
    }
    if (!role) {
        return res.status(400).json({ success: false, message: "Please enter role" })
    }

    if (phone) {
        const tenDigit = /^[0-9]{10}$/;
        // Allow: + followed by 1–3 digit country code and 7–12 digit number
        // Example: +91XXXXXXXXXX, +1415XXXXXXX
        const withCountryCode = /^\+[0-9]{1,3}[0-9]{7,12}$/;

        if (!(tenDigit.test(phone) || withCountryCode.test(phone))) {
            return res.status(400).json({
                success: false,
                message:
                    "Invalid phone number. Please enter a 10-digit number (e.g., 9876543210) or include country code (e.g., +919876543210)."
            });
        }
    }

    if (!qualification) {
        return res.status(400).json({ success: false, message: "Please enter qualification" })
    }
    if (!experience_years) {
        return res.status(400).json({ success: false, message: "Please enter experience" })
    }
    if (!specialization) {
        return res.status(400).json({ success: false, message: "Please enter specialization" })
    }
    if (!certification) {
        return res.status(400).json({ success: false, message: "Please enter certification" })
    }

    next()

}