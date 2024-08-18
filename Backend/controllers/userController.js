import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bicrypt from "bcrypt";
import validator from "validator";

//login user - logic
const loginUser = async (req, res) => {
    const {email,password} = req.body;
    try {
        const user = await userModel.findOne({email});
        // if user does not exist
        if(!user){
            return res.json({
                success : false,
                message : "User does not exist"
            })
        }
        // of the user is found in db
        const isMatched = await bicrypt.compare(password,user.password)

        if(!isMatched){
            return res.json({
                success : false,
                message : "Invalid Credentials"
            })
        }

        const token = createToken(user._id); 
        res.json({
            success : true,
            token
        })

        
    } catch (error) {
        console.log(error);
        res.json({
            success : false,
            message : "Error"
        })
    }
};

//jwt token - CREATED
const createToken = (id) => {
    return jwt.sign({id},process.env.JWT_SECRET);
}

//register - logic
const registerUser = async (req, res) => {
    const {name,password,email} = req.body;
    try {
        //checking user already exists
        const exists = await userModel.findOne({email});
        if (exists) {
            return res.json({
                success: false,
                message : "User already exists"
            })
        }
        //validation - email format / passord
        if(!validator.isEmail(email)){
            return res.json({
                success: false,
                message : "Enter a valid Email"
            })
        }
        if(!validator.isStrongPassword(password)){
            return res.json({
                success: false,
                message : "Provide a strong password"
            })
        }

        //hashing the password
        const salt = await bicrypt.genSalt(10) // 5-15 range
        const hashedPassword = await bicrypt.hash(password,salt);

        //PUTTING THE CREDS IN DB
        const newUser = new userModel({
            name : name,
            email : email,
            password : hashedPassword, //using the hashed password
        })

        //save the user
        const user = await newUser.save();
        //create a token jwt
        const token = createToken(user._id);
        res.json({
            success: true,
            token
        })

    } catch (error) {
        console.log(error);
        res.json({
            success : false,
            message : "Error"
        })
    }
};

export { loginUser, registerUser };
