const express = require('express');
const router = express.Router();
const { signin, signup, otpVerify } = require('../controllers/UserControllers');

router.post('/signup', signup);
router.post('/otpVerify', otpVerify);
router.post('/signin', signin);

module.exports = router;