const express = require('express');
const router = express.Router();
const { getAllMessages, sendMessage, getAllUsers, userChat } = require('../controllers/ChatController');
const upload = require('../config/Multer');
const checkAuthentication = require('../middlewares/CheckAuthentication');


router.post('/send', checkAuthentication, sendMessage);
router.post('/all', checkAuthentication, getAllMessages);


router.get('/Chat', checkAuthentication, userChat);
router.get('/all-users', checkAuthentication, getAllUsers);

module.exports = router;