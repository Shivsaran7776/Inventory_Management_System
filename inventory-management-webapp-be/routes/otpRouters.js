const express=require('express');
const {verifyUser,verifyOtp}=require('../controllers/verifyApi');

const router=express.Router();

router.post('/userverify',verifyUser);

router.post('/verifyotp',verifyOtp);

module.exports=router;