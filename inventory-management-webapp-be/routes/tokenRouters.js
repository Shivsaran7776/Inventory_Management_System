require('dotenv').config();
const express=require('express');
const authenticateToken=require('../middleware/tokenFunction');
const {postApi,verifyUser,unhashToken}=require('../controllers/tokenApi');
const schema=require('../models/userSchema');
const router=express.Router();
const jwt=require('jsonwebtoken');

//router.get('/verifyToken',authenticateToken,postApi);
router.post('/verifyuser',verifyUser);

router.post('/getuserdetails',unhashToken);

module.exports=router;