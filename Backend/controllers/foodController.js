import foodModel from "../models/foodModel.js";
import fs from "fs";

//add food item
const addFood = async (req, res) => {
  let image_filename = `${req.file.filename}`;

  const food = new foodModel({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    category: req.body.category,
    image: image_filename,
  });
  try {
    await food.save();
    res.json({ success: true, message: "Food Added" });
} catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
}
};

//list all food
const listFood = async (req,res) => {
    try {
        const food = await foodModel.find({});
        res.json({
            success : true,
            data : food
        })
    } catch (error) {
        console.log(error)
        res.json({
            success : false,
            message : "Error"
        })
    }
}

//remove food
const removeFood = async(req,res) => {
    try {
        const food = await foodModel.findById(req.body.id);
        //delete the image
        fs.unlink(`uploads/${food.image}` , () => {}) // delete from uploads folder
        await foodModel.findByIdAndDelete(req.body.id) // delete it by mongo db
        res.json({
            success : true,
            message : "Food removed"
        })
    } catch (error) {
        console.log(error)
        res.json({
            success : false,
            message : "Error"
        })
    }
}

export { addFood ,listFood, removeFood};
