const User = require('../models/user')

const asyncHandler = require("express-async-handler");

//Display signup form on GET
exports.sign_up = (req, res, next) => {
    res.render('signup_form', {title: 'Sign Up'})
}