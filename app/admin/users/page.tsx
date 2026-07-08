'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import type { Role } from '@prisma/client'

interface User {
  id: string
  name: string | null
  email: string
  role: Role
  image: string | null
  createdAt: string
}

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [role, setRole] = useState<Role>('admin')
  const [adding, setAdding] = useState(false)
  const [formError, setFormError] = useState('')
  const [formSuccess, setFormSuccess] = useState('')

  async function fetchUsers() {
    const res = await fetch('/api/admin/users')
    if (res.ok) setUsers(await res.json())
    setLoading(false)
  }

  useEffect(() => { fetchUsers() }, [])

  async function handleAdd(e: React.FormEvent) {
    e.preventDefault()
    setAdding(true)
    setFormError('')
    setFormSuccess('')

    const res = await fetch('/api/admin/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, name: name || undefined, role }),
    })

    if (res.ok) {
      setFormSuccess(`${email} has been added.`)
      setEmail('')
      setName('')
      setRole('admin')
      fetchUsers()
    } else {
      const data = await res.json()
      setFormError(data.error ?? 'Failed to add user')
    }

    setAdding(false)
  }

  async function handleDelete(id: string, userEmail: string) {
    if (!confirm(`Remove access for ${userEmail}?`)) return

    const res = await fetch(`/api/admin/users/${id}`, { method: 'DELETE' })
    if (res.ok) {
      fetchUsers()
    } else {
      const data = await res.json().catch(() => ({}))
      alert(data.error ?? 'Failed to remove user')
    }
  }

  async function handleRoleChange(id: string, newRole: Role) {
    const res = await fetch(`/api/admin/users/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ role: newRole }),
    })
    if (res.ok) {
      fetchUsers()
    } else {
      const data = await res.json().catch(() => ({}))
      alert(data.error ?? 'Failed to update role')
    }
  }

  return (
    <div className="min-h-screen bg-[#0a1628] text-white">
      <div className="max-w-3xl mx-auto px-6 py-12">
        <div className="mb-10 flex items-end justify-between gap-4">
          <div>
            <p className="text-xs tracking-[0.2em] text-white/40 uppercase mb-1">
              McDevitt &amp; Company — Admin
            </p>
            <h1 className="text-2xl font-light tracking-wide">User Access</h1>
            <p className="text-white/40 text-sm mt-1">
              Manage who can sign in to Content Studio
            </p>
          </div>
          <Link
            href="/admin/submissions"
            className="text-white/30 hover:text-white/60 text-sm transition-colors whitespace-nowrap"
          >
            Form Submissions →
          </Link>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-8">
          <h2 className="text-sm font-medium text-white/70 uppercase tracking-wider mb-4">
            Grant Access
          </h2>
          <form onSubmit={handleAdd} className="space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <input
                type="email"
                placeholder="Email address"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                className="bg-white/10 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-white/30 focus:outline-none focus:border-white/30"
              />
              <input
                type="text"
                placeholder="Name (optional)"
                value={name}
                onChange={e => setName(e.target.value)}
                className="bg-white/10 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-white/30 focus:outline-none focus:border-white/30"
              />
            </div>
            <div className="flex gap-3 items-center">
              <select
                value={role}
                onChange={e => setRole(e.target.value as Role)}
                className="bg-white/10 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-white/30"
              >
                <option value="admin">Admin</option>
                <option value="superadmin">Superadmin</option>
              </select>
              <button
                type="submit"
                disabled={adding}
                className="bg-white text-[#0a1628] font-medium text-sm rounded-xl px-5 py-2.5 hover:bg-white/90 disabled:opacity-50 transition-colors"
              >
                {adding ? 'Adding…' : 'Add user'}
              </button>
            </div>

            {formError && <p className="text-red-400 text-sm">{formError}</p>}
            {formSuccess && <p className="text-green-400 text-sm">{formSuccess}</p>}
          </form>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
          <div className="px-6 py-4 border-b border-white/10">
            <h2 className="text-sm font-medium text-white/70 uppercase tracking-wider">
              Authorised Users
            </h2>
          </div>

          {loading ? (
            <p className="text-white/30 text-sm px-6 py-8 text-center">Loading…</p>
          ) : users.length === 0 ? (
            <p className="text-white/30 text-sm px-6 py-8 text-center">No users yet</p>
          ) : (
            <ul className="divide-y divide-white/5">
              {users.map(user => (
                <li key={user.id} className="flex items-center gap-4 px-6 py-4">
                  <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0 overflow-hidden">
                    {user.image
                      ? <img src={user.image} alt="" className="w-full h-full object-cover" />
                      : <span className="text-sm text-white/50 font-medium">
                          {(user.name ?? user.email)[0].toUpperCase()}
                        </span>
                    }
                  </div>

                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-white truncate">{user.name ?? '—'}</p>
                    <p className="text-xs text-white/40 truncate">{user.email}</p>
                  </div>

                  <select
                    value={user.role}
                    onChange={e => handleRoleChange(user.id, e.target.value as Role)}
                    className="bg-white/10 border border-white/10 rounded-lg px-2.5 py-1.5 text-xs text-white/70 focus:outline-none"
                  >
                    <option value="admin">Admin</option>
                    <option value="superadmin">Superadmin</option>
                  </select>

                  <button
                    onClick={() => handleDelete(user.id, user.email)}
                    className="text-white/20 hover:text-red-400 transition-colors text-sm px-1"
                    title="Remove access"
                  >
                    ✕
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="mt-6 text-center">
          <Link
            href="/keystatic"
            className="text-white/30 hover:text-white/60 text-sm transition-colors"
          >
            ← Back to Content Studio
          </Link>
        </div>
      </div>
    </div>
  )
}
