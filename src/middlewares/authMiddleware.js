import jwt from 'jsonwebtoken'

export const verifyToken = async (req, res, next) => {
    try {
        const token = req.cookies.jwt
        if (!token) {
            res.status(400).json({ message: "No token Provided" })
        }
        const decoded = jwt.verify(token, process.env.SECRET_KEY)
        if (!decoded) {
            res.status(400).json({ message: "Unauthorized Access" })
        }
        req.userID = decoded.userID;
        next();


    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" })


    }

}