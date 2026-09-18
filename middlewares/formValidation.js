const { body } = require('express-validator')
const { isUniqueUser } = require('../queries/user.queries')

const signUpFormValidator = [
    body('username').trim().notEmpty()
        .withMessage('username cant be empty')
        .isLength({ min: 3, max: 32 })
        .withMessage('username should be between 3 to 32 characters')
        .custom(async (value) => {
            const unique = isUniqueUser(value);
            if (!unique) {
                throw new Error('The username already exists')
            }
            return true;
        })
    ,
    body('password').trim()
        .notEmpty().withMessage('password cant be empty')
        .isLength({ min: 4, max: 48 })
        .withMessage('password should be between 4 to 48 characters'),
]

module.exports = { signUpFormValidator }