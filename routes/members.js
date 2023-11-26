const express = require('express');
const router = express.Router();

// Require controller modules.
const user_controller = require('../controllers/userController')

// User Routes //

//Get request for displaying signup form 
router.get('/signup', user_controller.sign_up);

module.exports = router;