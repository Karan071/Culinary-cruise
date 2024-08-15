import mongoose from "mongoose";

export const connectDB = async () => {
    await mongoose.connect("mongodb+srv://karan-projects:746042@cluster0.nmzgx.mongodb.net/culinary-cruise")
    .then(()=>{
        console.log(`DB connected`)
    })
}