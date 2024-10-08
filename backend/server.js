import express from "express"
import cors from "cors"
import { connectDB } from "./config/db.js"
import foodRouter from "./routes/FoodRoute.js"
import userRouter from "./routes/userRoute.js"
import dotenv from 'dotenv';
import cartRouter from "./routes/cartroute.js"
import orderRouter from "./routes/orderRoute.js"

dotenv.config()

// app config
const app = express()
const port = process.env.PORT ||  4000


//middleware
app.use(express.json())
app.use(cors())

//DB Connection
connectDB()

//api endpoint
app.use("/api/food" , foodRouter)
app.use("/images" , express.static('upload'))
app.use("/api/user",userRouter)
app.use("/api/cart",cartRouter)
app.use("/api/order",orderRouter)


app.get("/" , (req,res)=>{
    res.send("API Working")
})

app.listen(port,()=>{
    console.log(`server is running on http://localhost:${port}`)
})

