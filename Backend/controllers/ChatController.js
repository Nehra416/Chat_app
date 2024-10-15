const Chat = require('../models/ChatSchema');
const User = require('../models/UserSchema');

const sendMessage = async (req, res) => {
    try {
        const { content, senderId } = req.body;
        const userId = req.user;

        // Check senderId and userName are is present or not
        if (!senderId || !userId) {
            return res.status(400).json({
                message: 'SenderId and userId are required',
                success: false
            })
        }

        // Check content is present or not
        if (!content) {
            return res.status(400).json({
                message: 'Content is required',
                success: false
            })
        }

        // Check that senderId is a valid user
        const sender = await User.findById(senderId);
        if (!sender) {
            return res.status(400).json({
                message: "Invalid senderId",
                success: false
            })
        }

        // Create new message
        await Chat.create({
            content,
            senderId,
            userId
        })

        return res.status(201).json({
            message: 'Message sent successfully',
            success: true
        })

    } catch (error) {
        console.log("Error in sendMessage :", error);
    }
}

const getAllMessages = async (req, res) => {
    try {
        const { senderId } = req.body;
        const userId = req.user;

        // Check senderId and userId are is present or not
        if (!senderId || !userId) {
            return res.status(400).json({
                message: 'SenderId and userId are required',
                success: false
            })
        }

        // Get all messages between senderId and userId
        const messages = await Chat.find({ senderId, userId }).select('content')

        // send the result
        return res.status(200).json({
            messages: messages,
            success: true
        })
    } catch (error) {
        console.log("Error in getAllMessages :", error);
    }
}


module.exports = {
    sendMessage, getAllMessages,
};