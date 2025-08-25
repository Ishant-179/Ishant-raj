import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const registerUser = async(req, res) => {
    try {
        const {name, email, password} = req.body;

        if(!name || !email || !password) {
            res.status(400).json({message: "please fill all the inputs"});
        }

        const existingUser = await User.findOne({email});

        if(existingUser) {
            res.status(404).json({message: "user email already exists"});
        }

        const hashPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            name,
            email,
            password: hashPassword
        });

        await newUser.save();


        return res.status(201).json({message: "user Registered Successfully", success: true});

    } catch (error) {
        console.error("Error in registering User", error);
        return res.status(500).json({message: "Internal Server Error"});
    }
};

export const loginUser = async(req, res) => {
    try {
        const {email, password} = req.body;

        if(!email || !password){
            return res.status(400).json({message: "fill all the fields"});
        }

        const user = await User.findOne({email});

        if(!user){
            return res.status(404).json({message: "email does not exists"});
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if(!isPasswordValid) {
            return res.status(403).json({message: "incorrect password"});
        }

        const token = jwt.sign({
            id: user._id,
            email: user.email,
        }, process.env.JWT_SECRET, {
            expiresIn: "1d",
        }
    )

    console.log("Token length", token.length);

    return res.status(201).json({message: "user login successfully", token})
        
    } catch (error) {
           console.error("Error in login User", error);
        return res.status(500).json({message: "Internal Server Error"});
    }
};