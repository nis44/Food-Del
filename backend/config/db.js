import mongoose from "mongoose"

export const connectDB = async ()=>{
    (await mongoose.connect("mongodb+srv://nishant:842004@cluster0.6q36czi.mongodb.net/Food-Del").then(()=>console.log('DB Connected')));
}
