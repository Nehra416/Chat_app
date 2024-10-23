const express = require('express');
const router = express.Router();
const { signup, signin, updateUser, verifyOtpForForgetPassword, updateForgetPassword, logout } = require('../controllers/UserControllers');
const upload = require('../config/Multer');
const checkAuthentication = require('../middlewares/CheckAuthentication');


router.post('/signup', signup);
// router.post('/signup-verify', otpVerifyForSignup);
router.post('/signin', signin);
router.post('/forget', verifyOtpForForgetPassword);
// router.post('/forget-verify', otpVerifyForForget);
router.post('/forget/update', updateForgetPassword);
router.post('/update', checkAuthentication, upload.single('profile'), updateUser);
router.get('/logout', logout);


module.exports = router;