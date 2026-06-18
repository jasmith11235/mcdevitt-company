import { requireSuperadmin } from '@/lib/api-auth'
import { prisma } from '@/lib/prisma'
import { Role } from '@prisma/client'
import { NextResponse } from 'next/server'

const USER_SELECT = {
  id: true,
  name: true,
  email: true,
  role: true,
  image: true,
  createdAt: true,
} as const

export async function GET() {
  const { error } = await requireSuperadmin()
  if (error) return error

  const users = await prisma.user.findMany({
    select: USER_SELECT,
    orderBy: { createdAt: 'asc' },
  })

  return NextResponse.json(users)
}

export async function POST(req: Request) {
  const { error } = await requireSuperadmin()
  if (error) return error

  const body = await req.json()
  const { email, name, role } = body as { email: string; name?: string; role?: Role }

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: 'Valid email is required' }, { status: 400 })
  }

  if (role && !Object.values(Role).includes(role)) {
    return NextResponse.json({ error: 'Invalid role' }, { status: 400 })
  }

  const existing = await prisma.user.findUnique({ where: { email } })
  if (existing) {
    return NextResponse.json({ error: 'User already exists' }, { status: 409 })
  }

  const user = await prisma.user.create({
    data: { email, name: name ?? null, role: role ?? Role.admin },
    select: USER_SELECT,
  })

  return NextResponse.json(user, { status: 201 })
}
