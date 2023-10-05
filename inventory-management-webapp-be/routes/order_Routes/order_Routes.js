const express = require('express');

const {orderDetails, updateStock, rentOrderDetails}=require('../../controllers/order_Controllers/orderApi');

const router = express.Router();

router.post('/orderDetails',orderDetails);

router.post('/rentOrderDetails',rentOrderDetails);

router.post('/updateStock', updateStock);

module.exports = router;