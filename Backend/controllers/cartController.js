import userModel from "../models/userModel.js";

// add items to user cart
const addToCart = async(req,res) => {
    try {
        let userData = await userModel.findOne({_id : req.body.userId})
        let cartData = await userData.cartData;
        if(!cartData[req.body.itemId]){
            cartData[req.body.itemId] = 1; // new entry
        }else{
            cartData[res.body.itemId] += 1;
        }
        //update the new usercart data
        await userModel.findByIdAndUpdate(req.body.userId, {cartData}) // userid and object: {new cartdata}
        res.json({
            success : true,
            message : "Added to cart"
        });
        
    } catch (error) {
        console.log(error);
        res.json({
            success : false,
            message : "Error"
        });
    }
}
// remove items to user cart
const removeFromCart = async(req,res) => {

}
//fetch-user-cart data
const getCart = async(req,res) => {

}

export {addToCart,removeFromCart,getCart}