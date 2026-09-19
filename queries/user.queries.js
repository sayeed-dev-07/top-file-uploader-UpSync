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

const createFolder = async (id, folderName) => {
    await prisma.folder.create({
        data: {
            name: folderName,
            userId: id
        }
    })
}
const addFiles = async (fileLink, id, fileType) => {
    await prisma.file.create({
        data: {
            type: fileType,
            link: fileLink,
            folderId: id
        }
    })
}
const deleteFolder = async (id) => {
    await prisma.folder.delete({
        where: {
            id: id
        }
    })
}
const deleteFile = async (id) => {
    await prisma.file.delete({
        where: {
            id: id
        }
    })
}



module.exports = { isUniqueUser, createUser, createFolder, addFiles }