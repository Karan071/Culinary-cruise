import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";
import "dotenv/config.js"

//login user
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
        const isMatched = await bcrypt.compare(password,user.password)

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

const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET);
}

//register user
const registerUser = async (req, res) => {
    const { name, password, email } = req.body;
    try {
        //if user exists
        const exists = await userModel.findOne({email})
        if(exists){
            return res.json({
                success : false,
                message : "User already exists"
            })
        }
        //validation email formal and string password
        if(!validator.isEmail(email)){
            return res.json({
                success : false,
                message : "Enter a valid email"
            })
        }
        if (password.length < 8) {
            return res.json({
            success: false,
            message: "Password must be at least 8 characters long"
            });
        }

        //hashing password
        const salt = await bcrypt.genSalt(10) // 5-15 range
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new userModel ({
            name : name,
            email : email ,
            password : hashedPassword
        })

        await newUser.save()

        const user = await newUser.save();
        const token = createToken(user._id)
        return res.json({
            success : true,
            token
        })
    } catch (error) {
        console.log(error)
        res.json({
            success : false,
            message : "Error occurred during registration"
        })
    }
};

export { loginUser, registerUser };
