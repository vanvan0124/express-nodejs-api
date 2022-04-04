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



module.exports = router;	