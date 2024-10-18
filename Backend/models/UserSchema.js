const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    userName: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    profilePic: {
        type: String,
        default: ''
    },
    chatWith: [
        {
            userId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User'
            },
            lastMessage: {
                type: String
            },
            lastMessageTime: {
                type: Date
            }
        }
    ]
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);