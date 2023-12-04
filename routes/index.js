const express = require('express');
const router = express.Router();

// Require controller modules.
const user_controller = require('../controllers/userController')

// User Routes //

//GET home page
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Members Only', user: req.user });
  });

//Get request for displaying signup form 
router.get('/signup', user_controller.sign_up);

//POST request for creating new users
router.post('/signup', user_controller.create_user);

//POST request for logging in
router.post("/log-in", user_controller.login_post);

//GET request for logging out
router.get("/log-out", user_controller.logout_get);

//Get request for vip secret question
router.get("/vip", user_controller.vip_get)

//POST request for vip secret question
router.post("/vip", user_controller.vip_post)

module.exports = router;
