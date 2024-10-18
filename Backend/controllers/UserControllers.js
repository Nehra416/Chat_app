const User = require('../models/UserSchema')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt')
const uploadToCloudinary = require('../config/Cloudinary');
const sendOTP = require('../config/NodeMailer');
let data = {};

const signup = async (req, res) => {
    try {
        const { userName, email, password } = req.body;
        // console.log(req.body);

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
        const otp = sendOTP(email);
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

const otpVerifyForSignup = async (req, res) => {
    try {
        const { OTP } = req.body;
        const { userName, email, password, otp } = data;

        if (otp == OTP) {
            // Now create a new user
            await User.create({ userName, email, password })

            return res.status(201).json({
                message: "New Account created successfully", success: true
            })
        } else {
            return res.status(400).json({
                message: "OTP is Wrong", success: false
            })
        }

    } catch (error) {
        console.log("Error in the otpVerifyForSignup :", error)
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
        const token = jwt.sign({ _id: user._id, userName: user.userName, email: user.email }, process.env.JWT_SECRET, { expiresIn: '365d' })

        // return the response with the token
        return res.cookie('token', token).status(201)
            .json({
                message: `Welcome ${user.userName}`, success: true
            });

    } catch (error) {
        console.log("Error in signin ", error)
    }
}

const sendOtpForForgetPwd = async (req, res) => {
    try {
        const { userName } = req.body;

        // userName is required for further process
        if (!userName) {
            return res.status(404).json({
                message: 'UserName is Required',
                success: false
            })
        }

        // check the user exist or not
        const user = await User.findOne({ userName })
        if (!user) {
            return res.status(404).json({
                message: "Can't found Account",
                success: false
            })
        }

        // send otp to the email of client and save the otp in data object for comparision
        const otp = sendOTP(user.email);
        data[userName] = otp;

        // return with a success message
        return res.status(201).json({
            message: 'OTP Send to you Email',
            success: false
        })

    } catch (error) {
        console.log("Error in sendOtpForForgetPwd :", error)
    }
}

const otpVerifyForForget = async (req, res) => {
    try {
        const { userName, receivedOTP } = req.body;

        // if receivedOTP is wrong then return back
        if (data[userName] != receivedOTP) {
            return res.status(400).json({
                message: 'OTP Wrong',
                success: false
            })
        }

        // delete the otp object for this username
        delete data[userName];

        // return with success message
        return res.status(201).json({
            message: 'Verification Successfully',
            success: true
        })

    } catch (error) {
        console.log("Error in verifyOtp :", error)
    }
}

const updateForgetPwd = async (req, res) => {
    try {
        const { userName, newPassword } = req.body;

        // Check that userName is exixt or not
        const user = await User.findOne({ userName })
        if (!user) {
            return res.status(404).json({
                message: "Can't found Account",
                success: false
            })
        }

        // Hashing the password then update the pwd in db
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;
        await user.save();

        return res.status(201).json({
            message: 'Password is Updated',
            success: false
        })

    } catch (error) {
        console.log("Error in updatePwd :", error)
    }
}

const updateUser = async (req, res) => {
    try {
        const { newUserName, password, newPassword } = req.body;
        const { userName: user } = req.cookies.token;
        const profile = req.file;

        // Atleast one thing is required for further process
        if (!profile && !newUserName && !newPassword) {
            return res.status(404).json({
                message: 'Atleast one update parameter is required',
                success: false
            })
        }

        // check the user exist or not
        const userData = await User.findOne({ user })
        if (!userData) {
            return res.status(400).json({
                message: "User can't found",
                success: false,
            })
        }

        // if user can send password then update 
        if (newPassword) {

            // Compare the recieved current password by hashing with the password in db
            const isPwdValid = await bcrypt.compare(password, userData.password);

            if (isPwdValid) {
                const hashedPassword = await bcrypt.hash(newPassword, 10);
                userData.password = hashedPassword;
                await userData.save();

                return res.status(400).json({
                    message: 'Password is Updated Successfully',
                    success: false
                })
            } else {
                return res.status(400).json({
                    message: 'Current Password is Wrong',
                    success: false
                })
            }
        }

        // if user can send userName then update that
        if (newUserName) {

            // check that account is already exist or not on this userName
            const isValid = await User.findOne({ newUserName })
            if (isValid) {
                return res.status(400).json({
                    message: 'This userName is also taken',
                    success: false
                })
            }

            // if not exist then we will update the userName
            userData.userName = newUserName;
            await userData.save();

            // return with update message
            return res.status(201).json({
                message: 'UserName is updated Successfully',
                success: true
            })
        }

        // if user can send profile string
        if (profile) {
            // send the profile to the cloudinary
            const ImgUrl = uploadToCloudinary(profile.path);
            if (!ImgUrl) {
                return res.status(400).json({
                    message: 'Error in Uploading',
                    success: false
                })
            }

            // update the profile string in the dataBase
            userData.profile = ImgUrl;
            await userData.save();

            // return the suucess message
            return res.status(201).json({
                message: 'Profile Updated Successfully',
                success: true
            })
        }

    } catch (error) {
        console.log("Error in UpdateUser :", error);
    }
}

const logout = async (req, res) => {
    try {
        // clear the cookie value so, the user logout
        res.clearCookie('token');
        return res.status(201).json({
            message: 'Logout Successfully',
            success: true
        })

    } catch (error) {
        console.log("Error in Logout :", error);
    }
}

const getAllUsers = async (req, res) => {
    try {
        // get all users from db (without password)
        const users = await User.find({}).select('-password');

        // return the users
        return res.status(200).json({
            users,
            message: 'All Users',
            success: true
        })
    } catch (error) {
        console.log("Error in getAllUsers :", error);
    }
}

const userChat = async (req, res) => {
    try {
        const userId = req.user;

        // find all users except the current user
        const users = await User.findById(userId).select('chatWith').populate('chatWith.userId', 'userName email profilePic');
        // console.log("userChat :", users);

        // return the users
        return res.status(200).json({
            users,
            message: 'Chat Users',
            success: true
        })
    } catch (error) {
        console.log("Error in userChat :", error);
    }
}

module.exports = {
    signup, signin, otpVerifyForSignup, updateUser, sendOtpForForgetPwd, otpVerifyForForget, updateForgetPwd, logout, getAllUsers, userChat
}