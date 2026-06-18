import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const email = process.env.SUPERADMIN_EMAIL
  if (!email) {
    console.error('SUPERADMIN_EMAIL is not set in environment variables')
    process.exit(1)
  }

  const existing = await prisma.user.findUnique({ where: { email } })
  if (existing) {
    console.log(`Superadmin already exists: ${email}`)
    return
  }

  await prisma.user.create({
    data: {
      email,
      role: 'superadmin',
    },
  })

  console.log(`Created superadmin: ${email}`)
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
