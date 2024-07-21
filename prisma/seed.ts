import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()

async function main() {
  await prisma.user.createMany({
    data: [
      {
        name: "sameer bajracharya",
        username: "sam17",
        email: "admin",
        passwordHash:
          "$2a$10$FNNpHEghXzmMucQpJZlXcOkYOPoyWgLVLqYzxWKaZq7Gcpk9ZdZn2",
      },
    ],
    skipDuplicates: true, // Skip inserting users if they already exist
  })
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
