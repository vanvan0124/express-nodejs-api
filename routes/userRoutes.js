const express = require('express');

const router = express.Router();

const userControllers = require("../controllers/userControllers");

const auth = require('../auth')

const {verify, verifyAdmin} = auth;

// routes


//user registration

router.post('/register', userControllers.registerUser);

//login user
router.post('/login', userControllers.userLogIn);

// view all users
router.get('/', userControllers.viewAllUsers)

//update regular user to admin
router.put('/updateToAdmin/:id', verify, verifyAdmin, userControllers.updateToAdmin);

// create order 
router.post('/order', verify, userControllers.order)

// retrieve user's list of order

router.get('/retrieveOrders', verify, userControllers.retrieveOrders);

module.exports = router;	