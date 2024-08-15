import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import foodRouter from "./routes/foodRoute.js";
// require is not defined in ES module scope, you can use import instead => we have used type : "modules" in package.json
// This file is being treated as an ES module because it has a '.js' file extension

//App config
const app = express();
const port = 3000;

//Middleware
app.use(express.json());
app.use(cors());

// db connection string
connectDB();

 //api endpoint
app.use("/api/food", foodRouter)
//upload img
app.use("/images",express.static('uploads'))



app.get("/", (req, res) => {
  res.send("Api is working");
});

//listening to the ports
app.listen(port, () =>
  console.log(`App is listening on port http://localhost:${port}`)
);


