import express from "express"
import cors from "cors"
import { connectDB } from "./config/db.js"
import foodRouter from "./Routes/foodRoute.js"
import userRouter from "./Routes/userRoute.js"
import cartRouter from "./Routes/cartRoute.js"
import orderRouter from "./Routes/orderRoute.js"

//app cinfig
const app = express()
const port = process.env.PORT || 4000;

//middleware
app.use(express.json())
app.use(cors())

//db connection
connectDB();

//api end points
app.use("/api/food",foodRouter);
app.use("/images", express.static("uploads")); // files will be saved here
app.use("/api/user", userRouter)
app.use("/api/cart", cartRouter)
app.use("/api/order", orderRouter)

app.get('/', (req,res) => {
    res.send("mf")
})

app.listen(port, () =>{
    console.log(`Server is running on http://localhost:${port}`)
})