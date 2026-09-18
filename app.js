const expressSession = require('express-session');
require('dotenv').config();
const { PrismaPg } = require('@prisma/adapter-pg');
const { PrismaClient } = require('./generated/prisma/client')
const { PrismaSessionStore } = require('@quixo3/prisma-session-store');
const { indexRoutes } = require('./routes/indexRoutes')
const express = require('express')
const path = require('node:path');
const passport = require('passport')

const connectionString = `${process.env.DATABASE_URL}`;
const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

const app = express()

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
const assetsPath = path.join(__dirname, "public");
app.use(express.static(assetsPath));
app.use(express.urlencoded({ extended: true }));

require('./middlewares/passport')


app.use(
    expressSession({
        cookie: {
            maxAge: 7 * 24 * 60 * 60 * 1000
        },
        secret: process.env.DB_SECRET || "project data secret",
        resave: false,
        saveUninitialized: false,
        store: new PrismaSessionStore(
            prisma,
            {
                checkPeriod: 2 * 60 * 1000,
                dbRecordIdIsSessionId: true,
                dbRecordIdFunction: undefined,
            }
        )
    })
);

app.use(passport.session())
app.use(express.urlencoded({ extended: false }));

const port = process.env.PORT || 5001

app.use('/', indexRoutes)




app.get('/{*splat}', (req, res) => {
    res.render('404')
})

app.listen(port, (error) => {
    if (error) {
        throw error;
    }
    console.log(`app listening on port ${port}!`);
});