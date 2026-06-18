import { requireSuperadmin } from '@/lib/api-auth'
import { prisma } from '@/lib/prisma'
import { Role } from '@prisma/client'
import { NextResponse } from 'next/server'

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { error } = await requireSuperadmin()
  if (error) return error

  const { id } = await params
  const { role } = (await req.json()) as { role: Role }

  if (!role || !Object.values(Role).includes(role)) {
    return NextResponse.json({ error: 'Invalid role' }, { status: 400 })
  }

  const user = await prisma.user.update({
    where: { id },
    data: { role },
    select: { id: true, name: true, email: true, role: true },
  })

  return NextResponse.json(user)
}

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { session, error } = await requireSuperadmin()
  if (error) return error

  const { id } = await params

  if (id === session!.user.id) {
    return NextResponse.json({ error: 'Cannot remove your own account' }, { status: 400 })
  }

  await prisma.user.delete({ where: { id } })
  return new NextResponse(null, { status: 204 })
}
