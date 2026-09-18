const isLoggedIn = (req, res, next) => {
    if (req.isAuthenticated()) return next();
    res.status(401).json({ message: 'you are not authorized to view this resources. may be u are not logged in yet.' })
}

module.exports = { isLoggedIn }