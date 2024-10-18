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

        // Update the last message and time && also add userId who messages
        // await User.findByIdAndUpdate(userId, { chatWith: { userId: senderId, lastMessage: content, lastMessageTime: Date.now() } })

        const user = await User.findById(userId)
        const isPresent = user.chatWith.filter(item => item.userId.toString() === senderId.toString())
        console.log("value of isPresent", isPresent);

        if (isPresent.length === 0) {
            user.chatWith.push({ userId: senderId, lastMessage: content, lastMessageTime: Date.now() })
            sender.chatWith.push({ userId: userId, lastMessage: content, lastMessageTime: Date.now() })
            console.log("hi")
            await user.save();
        } else {
            isPresent[0].lastMessage = content;
            isPresent[0].lastMessageTime = Date.now();
            await user.save();
            console.log("value of isPresent", isPresent);
            console.log("byy")
        }

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
        console.log(userId, senderId)
        // Check senderId and userId are is present or not
        if (!senderId || !userId) {
            return res.status(400).json({
                message: 'SenderId and userId are required',
                success: false
            })
        }

        // Get all messages between senderId and userId
        const messages = await Chat.find({
            $or: [
                { senderId: userId, userId: senderId },
                { senderId, userId },
            ]
        }).select('content senderId')
        // console.log("messages:", messages)

        const senderDetails = await User.findById(senderId).select('-password')

        // send the result
        return res.status(200).json({
            messages: messages,
            user: senderDetails,
            success: true
        })
    } catch (error) {
        console.log("Error in getAllMessages :", error);
    }
}


module.exports = {
    sendMessage, getAllMessages,
};