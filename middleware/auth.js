import jwt from "jsonwebtoken";

export const handleAuth = async (req, res, next) => {
    try {
        const authData = req.headers['authorization']
        const token = authData.split(' ')[1]

        if (!token) {
            return res.status(400).json({ success: false, message: "credentials missing!" })
        }
       
        jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
            if (err) {
                return res.status(403).json({ success: false, message: "invalid token" })
            }           
            req.user = user
            next()
        })
    } catch (error) {
        res.status(500).json({ success: false, message: "server error" })
    }
}