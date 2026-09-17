const { prisma } = require('./lib/prisma')

const main = async () => {
    const user = await prisma.user.findUnique({
        where: {
            username: 'Sayeed'
        }
    })

    console.log(user);
}
main()