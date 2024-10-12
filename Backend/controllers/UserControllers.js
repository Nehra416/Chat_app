const User = require('../models/UserSchema')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt')
const nodemailer = require('../config/NodeMailer')
let data = {};

const signup = async (req, res) => {
    try {
        var { userName, email, password } = req.body;

        // Check that all fields are given
        if (!userName || !email || !password) {
            return res.status(400).json({ message: "All fields are required", success: false })
        }

        // Check userName already exists or not in the database
        const user = await User.findOne({ userName })
        if (user) {
            return res.status(400).json({ message: "Username already exists", success: false })
        }

        // Hashing the Password
        const hashedPassword = await bcrypt.hash(password, 10);

        // OTP send to the email by the nodemailer
        const otp = nodemailer(email);
        console.log("ji", otp);

        // store data as a object
        data = { userName, email, password: hashedPassword, otp };

        return res.status(201).json({
            message: 'OTP Send to Your Email',
            success: true
        })

    } catch (error) {
        console.log("Error in signup ", error)
    }
}

const otpVerify = async (req, res) => {
    try {
        const { OTP } = req.body;
        const { userName, email, password, otp } = data;

        if (otp == OTP) {
            // Now create a new user
            User.create({ userName, email, password })

            return res.status(201).json({
                message: "New Account created successfully", success: true
            })
        } else {
            return res.status(400).json({
                message: "OTP is Wrong", success: false
            })
        }

    } catch (error) {
        console.log("Error in the otpVerify :", error)
    }
}

const signin = async (req, res) => {
    try {
        const { userName, password } = req.body;

        // Check that all fields are given
        if (!userName || !password) {
            return res.status(400).json({ message: "All fields are required", success: false })
        }

        // Check the UserName is exist or not 
        const user = await User.findOne({ userName })
        if (!user) {
            return res.status(404).json({ message: "User not found", success: false })
        }

        // Compare with user's password from DB
        const isValidPwd = await bcrypt.compare(password, user.password);

        // Check the password is correct or not
        if (!isValidPwd) {
            return res.status(401).json({ message: "InCorrect Password", success: false })
        }

        // Generate a JWT token for the client
        const token = jwt.sign({ userName: user.userName, email: user.email }, process.env.JWT_SECRET, { expiresIn: '365d' })

        // return the response with the token
        return res.cookie(token).status(201)
            .json({
                message: `Welcome ${user.userName}`, success: true, token
            });

    } catch (error) {
        console.log("Error in signin ", error)
    }
}

module.exports = {
    signup, signin, otpVerify
}