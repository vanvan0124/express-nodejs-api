const express = require('express');

const router = express.Router();
	
const productControllers = require("../controllers/productControllers");

const auth = require('../auth')

const {verify, verifyAdmin} = auth;

//router

router.post('/registerProducts', verify, verifyAdmin, productControllers.createProducts)

router.get('/', productControllers.getAllProducts)


module.exports = router;	
