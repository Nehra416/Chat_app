const express = require('express');
const router = express.Router();
const { getAllMessages, sendMessage } = require('../controllers/ChatController');
const upload = require('../config/Multer');
const checkAuthentication = require('../middlewares/CheckAuthentication');


router.post('/send', checkAuthentication, sendMessage);
router.post('/all', checkAuthentication, getAllMessages);


module.exports = router;