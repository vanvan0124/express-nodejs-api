const express = require('express');

const router = express.Router();
	
const productControllers = require("../controllers/productControllers");

const auth = require('../auth')

const {verify, verifyAdmin} = auth;

//router
//register
router.post('/registerProducts', verify, verifyAdmin, productControllers.createProducts);

// retrieve all products
router.get('/', productControllers.getAllProducts);

// retrive single products
router.get('/getSingleProduct/:id', productControllers.getSingleProduct)

// update product information
router.put('/updateProductDetails/:id', verify, verifyAdmin, productControllers.updateProductDetails);

// archive product
router.put('/archiveProduct/:id', verify, verifyAdmin, productControllers.archiveProduct);

// view all archiveProduct
router.get('/viewArchive', verify, verifyAdmin, productControllers.viewArchive)

// activate a product 
router.put('/activateProduct/:id', verify, verifyAdmin, productControllers.activateProduct)

// search a product by name
router.get('/findProduct', productControllers.findProduct)


router.post('/addToCart', verify, productControllers.addToCart)




module.exports = router;	
