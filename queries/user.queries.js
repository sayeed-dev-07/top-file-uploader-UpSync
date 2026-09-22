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
    const notUnique = await prisma.user.findFirst({
        where: {
            username: name
        }
    })
    if (notUnique) {
        return false
    }
    return true
}

const isUniqueFolder = async (name) => {
    const existingFolder = await prisma.folder.findFirst({
        where: {
            name: {
                equals: name,
                mode: "insensitive"
            }

        },
        select: {
            id: true
        }
    })
    return !existingFolder;
}


const createFolder = async (id, folderName) => {
    await prisma.folder.create({
        data: {
            name: folderName,
            userId: id
        }
    })
}

const getFolderViaName = async (name) => {
    return await prisma.folder.findFirst({
        where: {
            name: name
        },
        select: {
            id: true
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

const getFilesByFolder = async (folderId) => {
    const files = await prisma.file.findMany({
        where: {
            folderId: folderId
        }
    })
    return files;
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
const getAllFolderByUser = async (id) => {
    const folders = await prisma.folder.findMany({
        where: {
            userId: id
        }
    })
    return folders
}


module.exports = { isUniqueUser, createUser, createFolder, addFiles, deleteFile, deleteFolder, isUniqueFolder, getAllFolderByUser, getFilesByFolder, getFolderViaName }