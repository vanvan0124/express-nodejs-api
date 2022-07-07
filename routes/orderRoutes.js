const express = require('express');

const router = express.Router();
	
const orderControllers = require("../controllers/orderControllers")

const auth = require('../auth')

const {verify, verifyAdmin} = auth;

//router
// get all orders (admin only)
router.get('/retrieveAllOrders', verify, verifyAdmin, orderControllers.retrieveAllOrders); 

module.exports = router;