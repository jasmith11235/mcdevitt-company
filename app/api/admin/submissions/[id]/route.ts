import { requireSuperadmin } from '@/lib/api-auth'
import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { error } = await requireSuperadmin()
  if (error) return error

  const { id } = await params
  await prisma.contactSubmission.delete({ where: { id } })

  return new NextResponse(null, { status: 204 })
}
