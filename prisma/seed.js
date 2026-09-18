const { prisma } = require('../lib/prisma')
const { hash } = require('bcryptjs')



async function main() {
    const passwordHash = await hash('664651', 10)
    await prisma.user.create({
        data: {
            username: 'Sayeed2',
            password: passwordHash,
            folders: {
                create: {
                    name: "Images",
                    files: {
                        create: {
                            type: 'IMAGE',
                            link: 'https://i.pinimg.com/736x/79/c5/e2/79c5e273432286899243a83fe472b977.jpg',
                        }
                    }
                }
            }
        }
    })

    const users = await prisma.user.findMany({
        include: {
            folders: {
                include: {
                    files: true
                }
            },

        }
    })
    console.log(JSON.stringify(users, null, 2));
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });