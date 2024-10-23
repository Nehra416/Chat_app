const mongoose = require('mongoose');

const ChatSchema = new mongoose.Schema({
    senderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        req: true
    },
    receiverId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        req: true
    },
    content: {
        type: String,
        req: true
    },

}, { timestamps: true })

module.exports = mongoose.model('Chat', ChatSchema);