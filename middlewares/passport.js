const passport = require('passport')
const { Strategy } = require('passport-local')

const { prisma } = require('../lib/prisma')
const { compare, hash } = require('bcryptjs')

passport.use(
    new Strategy(
        async (username, password, done) => {
            try {
                const username = await prisma.user.findUnique({

                })
            } catch (error) {

            }
        }
    )
)