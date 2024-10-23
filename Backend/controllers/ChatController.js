const Chat = require('../models/ChatSchema');
const Conversation = require('../models/ConversationSchema');
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
        const msj = await Chat.create({
            content,
            senderId,
            receiverId: userId
        })

        // Update the last message and time && also add userId who messages
        // await User.findByIdAndUpdate(userId, { chatWith: { userId: senderId, lastMessage: content, lastMessageTime: Date.now() } })

        const user = await User.findById(userId)
        const isPresent = user.friends.filter(item => item.senderId.toString() === senderId.toString())
        // console.log("value of isPresent", isPresent);

        // if the senderId user is not friend with us before, then add its id in our friends array
        if (isPresent.length === 0) {
            user.chatWith.push({ userId: senderId, lastMessage: content, lastMessageTime: Date.now() })
            sender.chatWith.push({ userId: userId, lastMessage: content, lastMessageTime: Date.now() })
            await user.save();
        } else {
            isPresent[0].lastMessage = content;
            isPresent[0].lastMessageTime = Date.now();
            await user.save();
            // console.log("value of isPresent after update", isPresent);
        }


        // check that conversation is created or not before between both users
        const conversation = await Conversation.findOne({
            participants: { $all: [userId, senderId] }
        });

        // if not, then create a new conversation and add message id
        if (!conversation) {
            await Conversation.create({
                participants: [userId, senderId],
                message: msj._id
            })

        } else {
            // conversation.message = msj._id;
            conversation.message.push(msj._id);
            await conversation.save();
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

        // Get all messages between senderId and userId in conversation participants by populate message
        const messages = await Conversation.findOne({
            participants: { $all: [userId, senderId] }
        }).populate('message');

        console.log("messages:", messages)

        const senderDetails = await User.findById(senderId).select('userName profilePic')
        console.log("senderDetails:", senderDetails)

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


// list of all the users
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

// list of chats with the friends
const userChat = async (req, res) => {
    try {
        const userId = req.user;

        // find all users except the current user
        const users = await User.findById(userId).select('friends').populate({path:'friends.senderId', select:'userName email profilePic'});
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
    sendMessage, getAllMessages, userChat, getAllUsers
};