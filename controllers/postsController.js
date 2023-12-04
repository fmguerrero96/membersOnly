const User = require('../models/user')
const Post = require('../models/post')

const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");
const passport = require('passport');

//Display the 'create message' from on GET
exports.create_message = (req, res, next) => {
    res.render('createMessage', { title: "Create Message", errors:null})
}

//Handle create new message on POST
exports.create_message_post = [
// Validate and sanitize input fields.
    body("title")
        .trim()
        .isLength({ min: 1 })
        .escape()
        .withMessage("Please enter a title for your message."),
    body("message")
        .trim()
        .isLength({ min: 1 })
        .escape()
        .withMessage("Please enter a message"),

    asyncHandler(async (req, res, next) => {
        // Extract the validation errors from a request.
        const errors = validationResult(req);

        //Create a new post object with sanitized data
        const post = new Post({
            title: req.body.title,
            message: req.body.message,
            author: req.user._id,
        })

        if (!errors.isEmpty()) {
            //there are errors, render form again
            res.render('createMessage', { title: "Create Message", errors: errors.array(),})
            return
        } else {
            // Data from form is valid. Save the new post.
            await post.save();
            res.redirect('/');
        }
    })
]
