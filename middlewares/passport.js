const passport = require('passport')
const { Strategy } = require('passport-local')

const { prisma } = require('../lib/prisma')
const { compare, hash } = require('bcryptjs')

passport.use(
    new Strategy(
        async (name, pass, done) => {
            try {
                const user = await prisma.user.findUnique({
                    where: { username: name }
                })
                if (!user) {
                    return done(null, false, { message: 'Incorrect username!' })
                }
                const passwordMatch = await compare(pass, user.password)
                if (!passwordMatch) {
                    return done(null, false, { message: "Incorrect password" })
                }
                return done(null, user);
            } catch (error) {
                done(error)
            }
        }
    )
)

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = prisma.user.findUnique({
            where: {
                id: id
            }
        })

        done(null, user);
    } catch (err) {
        done(err);
    }
});