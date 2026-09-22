const { Router } = require('express')
const { isLoggedIn } = require('../middlewares/auth')
const indexRoutes = Router()
const { signUpFormValidator } = require('../middlewares/formValidation')
const indexControler = require('../controllers/indexControler')
const { validationResult } = require('express-validator')


indexRoutes.get('/', (req, res, next) => {
    if (req.isAuthenticated()) {
        return res.redirect('/app')
    }
    next()
}, indexControler.getHomePage)

indexRoutes.get('/app', isLoggedIn, indexControler.getMainInterFace)

indexRoutes.post('/app', indexControler.postFolder)

indexRoutes.get('/app/:folder', indexControler.getFolderFiles)
indexRoutes.post('/app/:folder', indexControler.uploadFile)




indexRoutes.get('/login', (req, res, next) => {
    if (req.isAuthenticated()) {
        return res.redirect('/app')
    }
    next()
}, indexControler.getLogIn)
indexRoutes.get('/signup', (req, res, next) => {
    if (req.isAuthenticated()) {
        return res.redirect('/app')
    }
    next()
}, indexControler.getSignUp)



indexRoutes.post('/login', (req, res, next) => {
    next()
}, indexControler.postLogIn)


indexRoutes.post('/signup', signUpFormValidator, (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const userData = req.body;
        return res.status(400).render('signup', {
            prevData: userData,
            err: errors.mapped()
        })
    }
    next()
}, indexControler.postSignUp)
indexRoutes.get('/logout', isLoggedIn, indexControler.logOut)

module.exports = { indexRoutes }