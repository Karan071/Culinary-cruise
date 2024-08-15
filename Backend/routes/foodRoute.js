import express from "express";
import { addFood } from "../controllers/foodController.js";
import multer from "multer";

const foodRouter = express.Router();

//img storage engine
const storages = multer.diskStorage({
  destination: "uploads",
  filename: (req, res) => {
    return cb(null, `${Date.now()}${file.originalname}`);
  },
});
q;
const upload = multer({ storage: storages });

foodRouter.post("/add", upload.single("image"), addFood);

export default foodRouter;
