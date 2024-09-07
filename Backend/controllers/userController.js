import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import validator from "validator";
import "dotenv/config.js"

//login user
//login user
const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await userModel.findOne({ email });
        // if user does not exist
        if (!user) {
            return res.json({
                success: false,
                message: "User does not exist"
            });
        }
        // check if the plain-text password matches (no hashing)
        if (password !== user.password) {
            return res.json({
                success: false,
                message: "Invalid Credentials"
            });
        }

        const token = createToken(user._id);
        res.json({
            success: true,
            token
        });
    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            message: "Error"
        });
    }
};

const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET);
}

//register user
const registerUser = async (req, res) => {
    const { name, password, email } = req.body;
    try {
        // if user exists
        const exists = await userModel.findOne({ email });
        if (exists) {
            return res.json({
                success: false,
                message: "User already exists"
            });
        }
        // validation for email format and password length
        if (!validator.isEmail(email)) {
            return res.json({
                success: false,
                message: "Enter a valid email"
            });
        }
        if (password.length < 8) {
            return res.json({
                success: false,
                message: "Password must be at least 8 characters long"
            });
        }

        // Save user with plain-text password (no hashing)
        const newUser = new userModel({
            name: name,
            email: email,
            password: password // no hashing here
        });

        await newUser.save();

        const user = await newUser.save();
        const token = createToken(user._id);
        return res.json({
            success: true,
            token
        });
    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            message: "Error occurred during registration"
        });
    }
};


export { loginUser, registerUser };
