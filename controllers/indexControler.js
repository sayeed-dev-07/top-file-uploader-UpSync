const bcrypt = require("bcryptjs");
const { matchedData } = require("express-validator");
const passport = require("passport");
const userQuery = require('../queries/user.queries')

const getHomePage = (req, res) => {
    res.send('Home Page Where when ppl firstt comes')
}

const getMainInterFace = (req, res) => {
    res.send(`Hello ${req.user.username} \n how are u??`)
}

const getLogIn = (req, res) => {
    const messages = req.session.messages || [];

    req.session.messages = [];
    res.render('login', {
        errorMessage: messages.length > 0 ? messages[messages.length - 1] : null
    });
}

const postLogIn = passport.authenticate("local", {
    successRedirect: "/app",
    failureRedirect: "/login",
    failureMessage: true,
})

const getSignUp = (req, res) => {
    res.render('signup')
}

const postSignUp = async (req, res, next) => {
    try {
        const { username, password } = matchedData(req);
        const name = username.toLowerCase()
        const hashedPassword = await bcrypt.hash(password, 10)
        await userQuery.createUser(name, hashedPassword)
        res.redirect('/login')
    } catch (error) {
        if (error.code === 'P2002') {
            return res.status(400).render('signup', {
                uniqueNameError: 'Username is already taken. Please choose another.'
            });
        }

        console.log(error);
        next(error);
    }
}

const logOut = async (req, res, next) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        res.redirect("/");
    });
}

module.exports = { getHomePage, getMainInterFace, getLogIn, getSignUp, postLogIn, postSignUp, logOut }