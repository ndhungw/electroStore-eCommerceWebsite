var userModel = require('../models/userModel');
const mailer = require('../config/nodemailer')
const bcrypt = require('bcryptjs')
const passport = require('passport')
//import logger from '../core/logger/app-logger'

const controller = {};

controller.displayLoginPage = (req, res) => {
    res.render('pages/users/login', { title: 'Đăng nhập', message: req.flash('error')});
}

controller.displayResgiterPage = (req, res) => {
    res.render('pages/users/register', { title: 'Đăng kí', message: req.flash('error')});
}

controller.displayLogoutPage = (req, res) => {
    req.logout();
    req.flash('success_msg', 'You are logged out');
    res.redirect('/users/login');
}

controller.loginInto = (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/users/login',
        failureFlash: true
      })(req, res, next);
}

controller.registerNewUser = async (req, res) => {
    //console.log('Thong tin dang ky:', req.body.name, req.body.email, req.body.password, req.body.password2, req.body.avatarURL);

    let { firstname, lastname, email, username, password, password2, avatarURL } = req.body;

    let errors = [];

    //check required fields
    if (!firstname || !lastname || !email || !username || !password || !password2) {
        errors.push({ msg: 'Please fill all fields' });
    }

    //check password match
    if (password !== password2) {
        errors.push({ msg: 'Passwords do not match' });
    }

    //check pass length
    if (password.length < 6) {
        errors.push({ msg: 'Password should be at least 6 characters' })
    }

    if (errors.length > 0) {
        console.log("have issues in register info");
        res.render('pages/users/register', { errors, firstname, lastname, email, username, password, password2, avatarURL });
    } else {
        const existUser = await userModel.findOne({ username: username })

        if (existUser) {
            //user exists
            errors.push({ msg: 'Email is already registered' });
            res.render('pages/users/register', { errors, firstname, lastname, email, username, password, password2, avatarURL });
        } else {
            if (avatarURL == '') {
                avatarURL = "https://image.flaticon.com/icons/svg/64/64096.svg"
            }
            const hashedPassword = await bcrypt.hash(password, 10);
            const newUser = new userModel({
                firstname: firstname,
                lastname: lastname,
                email: email,
                username: username,
                password: hashedPassword,
                avatarURL: avatarURL
            });
            try {
                await newUser.save();
                console.log('new user\n' + newUser);
                
                // Send verification email
                await mailer.sendVerificationEmail(newUser);

                req.flash('verification_msg', 'Your account is registered and need to verify');
                res.redirect('/users/requireVerification');

                // req.flash('success_msg', 'You are now registered and can log in');
                // res.redirect('/users/login');
            } catch (err) {
                console.log('Error in newUser.save() + ', err);
            }
        }
    }
}

// VERIFICATION
controller.activateUser = async (req, res) => {
    const userID = req.query.id;
    console.log('const userID = req.query.id = '+userID);

    try {
        const activatedUser = await userModel.setActiveStatus(userID);
        console.log(activatedUser);
        res.render('pages/users/verified');
    } catch (err) {
        console.log('ERROR in VERIFICATION: userModel.setActiveStatus(userID) false - ' + err);
    }

}

controller.displayRequireVerification = (req,res) => {
    res.render('pages/users/requireVerification')
}
module.exports = controller;