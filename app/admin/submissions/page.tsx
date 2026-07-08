'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'

interface Submission {
  id: string
  name: string
  email: string
  company: string | null
  subject: string
  message: string
  source: string
  createdAt: string
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  })
}

export default function SubmissionsPage() {
  const [submissions, setSubmissions] = useState<Submission[]>([])
  const [loading, setLoading] = useState(true)

  async function fetchSubmissions() {
    const res = await fetch('/api/admin/submissions')
    if (res.ok) setSubmissions(await res.json())
    setLoading(false)
  }

  useEffect(() => { fetchSubmissions() }, [])

  async function handleDelete(id: string) {
    if (!confirm('Delete this submission?')) return
    const res = await fetch(`/api/admin/submissions/${id}`, { method: 'DELETE' })
    if (res.ok) {
      setSubmissions(prev => prev.filter(s => s.id !== id))
    } else {
      alert('Failed to delete submission')
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
            <h1 className="text-2xl font-light tracking-wide">Form Submissions</h1>
            <p className="text-white/40 text-sm mt-1">
              Inbound inquiries from the site contact form
            </p>
          </div>
          <Link
            href="/admin/users"
            className="text-white/30 hover:text-white/60 text-sm transition-colors whitespace-nowrap"
          >
            User Access →
          </Link>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
          <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between">
            <h2 className="text-sm font-medium text-white/70 uppercase tracking-wider">
              Inquiries
            </h2>
            {!loading && (
              <span className="text-xs text-white/40">{submissions.length}</span>
            )}
          </div>

          {loading ? (
            <p className="text-white/30 text-sm px-6 py-8 text-center">Loading…</p>
          ) : submissions.length === 0 ? (
            <p className="text-white/30 text-sm px-6 py-8 text-center">No submissions yet</p>
          ) : (
            <ul className="divide-y divide-white/5">
              {submissions.map(s => (
                <li key={s.id} className="px-6 py-5">
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-1.5">
                        <span className="text-sm text-white">{s.subject}</span>
                        <span className="text-[10px] uppercase tracking-wider text-white/40 bg-white/10 rounded px-1.5 py-0.5">
                          {s.source}
                        </span>
                      </div>
                      <p className="text-sm text-white/80">
                        {s.name}
                        {s.company ? <span className="text-white/40"> · {s.company}</span> : null}
                      </p>
                      <a
                        href={`mailto:${s.email}`}
                        className="text-xs text-[#7fb3a3] hover:text-white transition-colors"
                      >
                        {s.email}
                      </a>
                    </div>
                    <div className="flex flex-col items-end gap-2 flex-shrink-0">
                      <time className="text-xs text-white/30 whitespace-nowrap">{formatDate(s.createdAt)}</time>
                      <button
                        onClick={() => handleDelete(s.id)}
                        className="text-white/20 hover:text-red-400 transition-colors text-sm"
                        title="Delete"
                      >
                        ✕
                      </button>
                    </div>
                  </div>
                  <p className="mt-3 text-sm text-white/60 leading-relaxed whitespace-pre-wrap">{s.message}</p>
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
