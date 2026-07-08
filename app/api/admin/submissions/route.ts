import { requireSuperadmin } from '@/lib/api-auth'
import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET() {
  const { error } = await requireSuperadmin()
  if (error) return error

  const submissions = await prisma.contactSubmission.findMany({
    orderBy: { createdAt: 'desc' },
    take: 500,
  })

  return NextResponse.json(submissions)
}
