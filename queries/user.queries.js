const { prisma } = require('../lib/prisma')

const createUser = async (name, password) => {
    await prisma.user.create({
        data: {
            username: name,
            password: password
        }
    })
}
const isUniqueUser = async (name) => {
    const notUnique = await prisma.user.findUnique({
        where: {
            username: name
        }
    })
    if (notUnique) {
        return false
    }
    return true
}

module.exports = { isUniqueUser, createUser }