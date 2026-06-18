import { auth } from '@/lib/auth'
import { NextResponse } from 'next/server'

export async function requireSuperadmin() {
  const session = await auth()
  if (!session || session.user.role !== 'superadmin') {
    return { session: null, error: NextResponse.json({ error: 'Forbidden' }, { status: 403 }) }
  }
  return { session, error: null }
}
