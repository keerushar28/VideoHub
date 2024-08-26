import jwt from "jsonwebtoken"

export const generateCookie = async (res,userID) => {
    const token = jwt.sign({userID},process.env.SECRET_KEY,{expiresIn: "1d"})
    res.cookie('jwt', token , {
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
        maxAge: 86400000 // 1 day in milliseconds
        
    })

}


