const User = require('../models/user')

const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs")
const passport = require('passport');
const user = require('../models/user');

//Display signup form on GET
exports.sign_up = (req, res, next) => {
    res.render('signup_form', {title: 'Sign Up', errors: null})
}

//Create new user on POST
exports.create_user = [
// Validate and sanitize input fields.
  body("first_name")
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage("Please enter your name."),
body("username")
    .trim()
    .isLength({ min: 3})
    .escape()
    .withMessage('Username must be at least 3 characters long'),
body("password")
    .trim()
    .isLength({ min: 3})
    .escape()
    .withMessage('Password must be at least 3 characters long'),
body('confirm_password').custom((value, { req }) => {
    if (value !== req.body.password) {
        throw new Error('Passwords do not match');
      }
      return true
      }),

// Process request after validation and sanitization.
asyncHandler(async (req, res, next) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);

    // Create User object with escaped and trimmed data
    const user = new User({
      first_name: req.body.first_name,
      username: req.body.username,
      password: '', //Set empty password for now
    });

    if (!errors.isEmpty()) {
      // There are errors. Render form again with sanitized values/errors messages.
      res.render("signup_form", {
        title: "Sign Up",
        user: user,
        errors: errors.array(),
      });
      return;
    } else {
      // Data from form is valid.
      // Hash the password using bcrypt before saving it to the database.
      bcrypt.hash(req.body.password, 10, async (err, hashedPassword) => {
        if (err) {
          console.error(err);
          return res.redirect('error');
        }
        // Set user.password to the hashed password
        user.password = hashedPassword;

        // Save user.
        await user.save();
        // Redirect to home page
        res.redirect('/');
      });
    }
  }),
]

//Handle log in on POST
exports.login_post = passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/"
  })

//Handle log out on GET
exports.logout_get =  (req, res, next) => {
    req.logout((err) => {
      if (err) {
        return next(err);
      }
      res.redirect("/");
    });
  }

//Handle VIP secrete question on GET
exports.vip_get = (req, res, next) => {
    res.render("vipQuestion", {title: "Secret Question"})
}

//Handle VIP secret question POST request
exports.vip_post = asyncHandler(async (req, res, next) => {
    // Validate and sanitize user answer
    body('answer', "Please enter an aswer")
    .trim()
    .isLength({ min: 1 })
    .escape()
    .toLowerCase()

    const userAnswer = req.body.answer.toLowerCase();
    
    if(userAnswer != 'true') {
        //if answer is incorrect, render the secret question again
        res.render('vipQuestion', {title: "Secret Question", tryAgain: 'Try Again'});
    } else {
        //answer is correct
        const userId = req.user._id; 
        const updatedUser = await User.findByIdAndUpdate(userId, { is_vip: true }, { new: true });
        res.redirect('/')
    }
})