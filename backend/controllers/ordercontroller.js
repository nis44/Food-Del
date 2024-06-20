import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
// import stripe from "stripe"

// placing user order from frontend
const placeOrder = async(req,res) =>{
    // try {
    //     const newOrder = new orderModel({
    //         userid:req.body.userid,
    //         items:req.body.items,
    //         amount:req.body.amount,
    //         address:req.body.address
    //     })
    //     await newOrder.save()
    //     await userModel.findByIdAndUpdate(req.body.userid , {cartData:{}})
    // } catch (error) {
    //     console.log(error)
    //     res.json({success:false,message:"Error"})
    // }
}

const userOrder = async(req,res) => {
    try {
        const order = await orderModel.find({userid:req.body.userid})
        res.json({success:true,data:order})
    } catch (error) {
        console.log(error)
        res.json({success:false,data:"Error"})

    }
}

export {placeOrder , userOrder}