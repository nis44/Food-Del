import userModel from "../models/userModel.js"
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import validator from 'validator'

//login user
const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
      const user = await userModel.findOne({ email });
      if (!user) {
        return res.json({ success: false, message: "User Does Not Exist" });
      }
  
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.json({ success: false, message: "Wrong Password" });
      }
  
      const token = createToken(user._id);
      return res.json({ success: true, token });
    } catch (error) {
      console.log(error);
      return res.json({ success: false, message: "Error logging in" });
    }
  };
const createToken = (id) => {
    // eslint-disable-next-line no-undef
    if (!process.env.JWT_SECRET) {
        throw new Error("JWT_SECRET is not defined in environment variables");
    }
    // eslint-disable-next-line no-undef
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '1h' });
};

//register user
const registerUser = async (req,res) =>{
    const {name,password,email} = req.body
    try {
        //checking is user already exist
        const exist = await userModel.findOne({email})
        if (exist) {
            return res.json({success:false , message:"User Already Exist"})
        }
        //validating email and strong password
        if (!validator.isEmail(email)) {
            return res.json({success:false , message:"Please Enter A Valid Email"})
        }

        if (password.length<8) {
            return res.json({success:false , message:"Please Enter A Strong Password"})
        }
        //hashing user password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password,salt)

        const newUser = new userModel({
            name:name,
            email:email,
            password:hashedPassword
        })

         const user = await newUser.save()
         const token = createToken(user._id)
         res.json({success:true,token})

    } catch (error) {
        console.log(error)
        res.json({success:false,message:"Error"})
    }
}

export  {loginUser,registerUser}






