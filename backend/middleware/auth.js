import jwt from "jsonwebtoken"

const authMiddleware = async (req,res,next ) =>{
    const {token} = req.headers;
    if (!token) {
        return res.json({success:false,message:"Not Authorised Login Again"})
    }
    try {
        // eslint-disable-next-line no-undef
        const token_decode = jwt.verify(token,process.env.JWT_SECRET) 
        req.body.userid = token_decode.id
        next()
    } catch (error) {
        console.log(error)
        return res.json({success:false,message:"Error"})
    }
}

export default authMiddleware