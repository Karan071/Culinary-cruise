import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

//placing user order from front-end
//logic to placeorder
const placeOrder = async (req, res) => {

    const frontend_url = "http://localhost:5173";

  try {
    const newOrder = new orderModel({
      userId: req.body.userId,
      items: req.body.items,
      amount: req.body.amount,
      address: req.body.address,
    });

    await newOrder.save(); //saving 
    await userModel.findByIdAndUpdate(req.body.userId, { cartData: {} }); //cleaning uer cart data

    //for stripe payment
    const line_items = req.body.item.map((item) => ({
        price_data : {
            currency : "inr",
            product_data : {
                name : item.name
            },
            unit_amount : item.price * 100 * 80 // we'll get the data in $ so, we'll convert to inr
        },
        quantity : item.quantity
    }))

    //delivery charges
    line_items.push({
        price_data : {
            currency : "inr",
            product_data : {
                name : "Delivery charges"
            },
            unit_amount : 2*100*80 // for conversion to inr
        }
    })

    //session : for payment
    const session = await stripe.checkout.sessions.create({
        line_items : line_items,
        mode : 'payment',
        success_url : `${frontend_url}/verify?success=true&orderId=${newOrder._id}`, //success url
        cancel_url : `${frontend_url}/verify?success=false&orderId=${newOrder._id}`, //cancel url
    })

    res.json({
        success : true,
        session_url : session.url
    })
  } catch (error) {
    console.log(error);
    res.json({
        success : false,
        message : "error"
    })
  }
};

export { placeOrder };
