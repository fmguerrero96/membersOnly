const User = require('../models/user')
const Post = require('../models/post')

const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");
const passport = require('passport');

//Display the 'create message' from on GET
exports.create_message = (req, res, next) => {
    res.render('createMessage', { title: "Create Message"})
}
