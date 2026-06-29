'use client'

import { useState, type FormEvent } from 'react'
import { useTranslations } from 'next-intl'

interface ContactProps {
  email: string
  linkedin?: string
  instagram?: string
}

const SUBJECT_KEYS = ['general', 'tenant', 'landlord', 'capital', 'development'] as const

const fieldClass =
  'w-full rounded-[3px] border border-muted bg-white px-4 py-3 font-mercury text-[16px] text-navy placeholder:text-navy/35 transition-[border-color,box-shadow] duration-300 focus:border-green focus:outline-none focus:shadow-[0_0_0_3px_rgba(74,124,111,0.1)] md:text-[14px]'

const labelClass = 'mb-1.5 block font-gotham text-[9px] font-bold uppercase tracking-[2px] text-green'

const selectStyle = {
  appearance: 'none' as const,
  WebkitAppearance: 'none' as const,
  MozAppearance: 'none' as const,
  backgroundImage:
    "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12' fill='none' stroke='%231C2541' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'><path d='m2.5 4 3.5 3.5L9.5 4'/></svg>\")",
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'right 16px center',
  backgroundSize: '12px',
}

export default function ContactForm({ email, linkedin, instagram }: ContactProps) {
  const t = useTranslations('contact')
  const [status, setStatus] = useState<'idle' | 'submitting' | 'sent' | 'error'>('idle')

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const data = new FormData(form)
    const payload = {
      name: String(data.get('name') || ''),
      email: String(data.get('email') || ''),
      company: String(data.get('company') || ''),
      subject: String(data.get('subject') || t('subjects.general')),
      message: String(data.get('message') || ''),
    }

    setStatus('submitting')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      if (!res.ok) throw new Error('Request failed')
      form.reset()
      setStatus('sent')
    } catch {
      setStatus('error')
    }
  }

  return (
    <section id="contact" className="section-wrap bg-cream pt-12 md:pt-20">
      <div className="section-inner">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr] md:gap-[60px]">
          <div className="fade-in">
            <div className="section-label">{t('eyebrow')}</div>
            <div className="divider" />
            <form onSubmit={handleSubmit} className="mt-6 space-y-6">
              <div>
                <label htmlFor="cf-name" className={labelClass}>{t('name')}</label>
                <input id="cf-name" name="name" type="text" required placeholder={t('namePlaceholder')} className={fieldClass} />
              </div>
              <div>
                <label htmlFor="cf-email" className={labelClass}>{t('email')}</label>
                <input id="cf-email" name="email" type="email" required placeholder={t('emailPlaceholder')} className={fieldClass} />
              </div>
              <div>
                <label htmlFor="cf-company" className={labelClass}>{t('company')}</label>
                <input id="cf-company" name="company" type="text" placeholder={t('companyPlaceholder')} className={fieldClass} />
              </div>
              <div>
                <label htmlFor="cf-subject" className={labelClass}>{t('subject')}</label>
                <select id="cf-subject" name="subject" defaultValue="" required className={`${fieldClass} cursor-pointer pr-10`} style={selectStyle}>
                  <option value="" disabled>{t('subjectPlaceholder')}</option>
                  {SUBJECT_KEYS.map(key => (
                    <option key={key} value={t(`subjects.${key}`)}>{t(`subjects.${key}`)}</option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="cf-message" className={labelClass}>{t('message')}</label>
                <textarea id="cf-message" name="message" rows={5} required placeholder={t('messagePlaceholder')} className={`${fieldClass} min-h-[140px] resize-y`} />
              </div>
              <button type="submit" disabled={status === 'submitting'} className="btn-primary disabled:cursor-not-allowed disabled:opacity-60">
                {status === 'submitting' ? t('sending') : t('send')}
              </button>
              {status === 'sent' && (
                <p className="font-mercury text-[13px] italic text-green" role="status">{t('sent')}</p>
              )}
              {status === 'error' && (
                <p className="font-mercury text-[13px] italic text-[#b4513f]" role="alert">{t('error')}</p>
              )}
            </form>
          </div>

          <div className="fade-in">
            <div className="section-label">{t('connectLabel')}</div>
            <div className="divider" />
            <p className="font-mercury text-[14px] leading-[1.7] text-navy/75">{t('connectBlurb')}</p>
            <a
              href={`mailto:${email}`}
              className="mt-4 inline-block font-mercury text-[15px] text-green transition-colors duration-300 hover:text-navy"
            >
              {email}
            </a>
            {(linkedin || instagram) && (
              <div className="mt-6 flex flex-col gap-2">
                {linkedin && (
                  <a href={linkedin} target="_blank" rel="noopener noreferrer" className="font-gotham text-[11px] font-bold uppercase tracking-[0.2em] text-navy/70 transition-colors duration-300 hover:text-green">
                    LinkedIn
                  </a>
                )}
                {instagram && (
                  <a href={instagram} target="_blank" rel="noopener noreferrer" className="font-gotham text-[11px] font-bold uppercase tracking-[0.2em] text-navy/70 transition-colors duration-300 hover:text-green">
                    Instagram
                  </a>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
