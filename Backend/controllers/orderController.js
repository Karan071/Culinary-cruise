import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Stripe from "stripe"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

//order from front end

const placeOrder = async (req, res) => {

    const frontend_url = "http://localhost:5173";

    try {
        // Save the order to the database
        const newOrder = new orderModel({
            userId: req.body.userId,
            items: req.body.items,
            amount: req.body.amount, // Amount in rupees
            address: req.body.address
        });
        await newOrder.save();

        // Clear the user's cart
        await userModel.findByIdAndUpdate(req.body.userId, { cartData: {} });

        // Prepare line items for Stripe checkout
        const line_items = req.body.items.map((item) => ({
            price_data: {
                currency: "inr",
                product_data: {
                    name: item.name
                },
                unit_amount: item.price * 100, // Convert item price to paise
            },
            quantity: item.quantity
        }));

        // Add delivery charges
        line_items.push({
            price_data: {
                currency: "inr",
                product_data: {
                    name: "Delivery charges"
                },
                unit_amount: 1000, // Assuming delivery charge is Rs. 10, converted to paise
            },
            quantity: 1
        });

        // Create a session for payment
        const session = await stripe.checkout.sessions.create({
            line_items: line_items,
            mode: 'payment',
            success_url: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url: `${frontend_url}/verify?success=false&orderId=${newOrder._id}`
        });

        // Respond with the session URL
        res.json({
            success: true,
            session_url: session.url
        });

    } catch (error) {
        console.error("Error in payment", error);
        res.json({
            success: false,
            message: "Error occurred during the payment process"
        });
    }
};

    const verifyOrder = async (req,res) => {
    const {orderId, success} = req.body;
        try {
            if(success==="true"){
                await orderModel.findByIdAndUpdate(orderId, {payment : true});
                res.json({
                    success : true,
                    message : "Paid"
                })
            }else{
                await orderModel.findByIdAndDelete(orderId);
                res.json({
                    success : false,
                    message : "not Paid"
                })
            }
        } catch (error) {
            console.log(error)
            res.json({
                success : false,
                message : "Error"
            })
        }
    }

    // users order front end
    const userOrders = async (req,res) => {
        try {
            const orders = await orderModel.find({userId : req.body.userId})
            res.json({
                success : true,
                data : orders
            })
        } catch (error) {
            console.log(error);
            res,json({
                success : true,
                data : orders
            })
        }
    }

    //all the orders of all the users : LIsting orders for Admin panel
    const listOrders = async (req,res) => {
        try {
            const orders = await orderModel.find({});
            res.json({
                success : true,
                data : orders
            })
        } catch (error) {
            console.log(error);
            res.json({
                success : false,
                message : "Error"
            })
        }
    }


    //updating the status
    const updateStatus = async(req,res) => {
        try {
            await orderModel.findByIdAndUpdate(req.body.orderId, {status : req.body.status})
            res.json({
                success : true,
                message : 'Status updated'
            })
        } catch (error) {
            console.log(error)
            res.json({
                success : false,
                message : "Error"
            })
        }
    }

export { placeOrder , verifyOrder ,userOrders,listOrders,updateStatus};

