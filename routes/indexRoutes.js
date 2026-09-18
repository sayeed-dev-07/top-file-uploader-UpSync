const { Router } = require('express')
const { isLoggedIn } = require('../middlewares/auth')
const passport = require('passport')
const indexRoutes = Router()
const bcrypt = require('bcryptjs')
const userQuery = require('../queries/user.queries')
require('../middlewares/passport')



indexRoutes.get('/', (req, res) => {
    if (req.isAuthenticated()) {
        res.send(`you are logged in ${req.user.username}`)
        console.log(req.user);
    } else {
        res.send('not logged in')
    }
})

indexRoutes.get('/login', (req, res) => {
    res.render('login')
})
indexRoutes.post('/login', (req, res, next) => {
    next()
},
    passport.authenticate("local", {
        successRedirect: "/",
        failureRedirect: "/login",
        failureMessage: true,
    })
)
indexRoutes.get('/signup', (req, res, next) => {
    res.render('signup')
})
indexRoutes.post('/signup', async (req, res, next) => {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10)
    await userQuery.createUser(username, hashedPassword)
    res.redirect('/login')
})
indexRoutes.get('/logout', isLoggedIn, (req, res, next) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        res.redirect("/");
    });
})

module.exports = { indexRoutes }