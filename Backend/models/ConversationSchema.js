const mongoose = require('mongoose');

const conversationSchema = mongoose.Schema({
    participants: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    ],
    message: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Chat"
        }
    ]
})

module.exports = mongoose.model('Conversation', conversationSchema);