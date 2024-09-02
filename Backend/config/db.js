import mongoose from "mongoose"
export const connectDB = async () => {
    await mongoose.connect("mongodb+srv://karan-admin:2t0SM2Q5s5n5yMwq@cluster0.51awh.mongodb.net/culinaryCruise")
    .then(()=>{
        console.log(`DB connected`)
    })
}