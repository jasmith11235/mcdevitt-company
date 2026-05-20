'use client'

import { useState } from 'react'

interface ReadingRoomItem {
  slug: string
  title: string
  source: string
  author?: string
  date: string
  domain: string
  verdict: string
  evidence: string
  frame: string
  externalUrl?: string
  order?: number
}

const domainLabels: Record<string, string> = {
  'retail-consumer': 'Retail / Consumer',
  'hospitality-fb': 'Hospitality / F&B',
  'culture-demographics': 'Culture / Demographics',
  'business-workspace': 'Business / Workspace',
  'design-placemaking': 'Design / Placemaking',
}

const domains = Object.keys(domainLabels)

export default function ReadingRoom({ items, limit }: { items: ReadingRoomItem[]; limit?: number }) {
  const [activeDomain, setActiveDomain] = useState<string | null>(null)

  const filtered = activeDomain ? items.filter(i => i.domain === activeDomain) : items
  const displayed = limit ? filtered.slice(0, limit) : filtered

  return (
    <section id="reading-room" className="py-24 md:py-32 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="fade-in mb-16">
          <div className="accent-rule mb-6" />
          <h2 className="font-sans text-xs tracking-[0.3em] uppercase text-[#3D9B82] mb-4">Reading Room</h2>
          <p className="text-2xl md:text-3xl font-sans font-light text-[#1D2B45] max-w-2xl">
            Curiosities about the businesses that occupy buildings, and what they signal for the buildings themselves.
          </p>
        </div>

        {/* Domain filter bar */}
        {!limit && (
          <div className="fade-in mb-12 flex flex-wrap gap-3">
            <button
              onClick={() => setActiveDomain(null)}
              className={`font-sans text-[10px] tracking-[0.2em] uppercase px-4 py-2 border transition-colors duration-200 ${
                activeDomain === null
                  ? 'bg-[#1D2B45] text-white border-[#1D2B45]'
                  : 'text-[#1D2B45]/60 border-[#1D2B45]/20 hover:border-[#1D2B45]/40'
              }`}
            >
              All
            </button>
            {domains.map(d => (
              <button
                key={d}
                onClick={() => setActiveDomain(d)}
                className={`font-sans text-[10px] tracking-[0.2em] uppercase px-4 py-2 border transition-colors duration-200 ${
                  activeDomain === d
                    ? 'bg-[#1D2B45] text-white border-[#1D2B45]'
                    : 'text-[#1D2B45]/60 border-[#1D2B45]/20 hover:border-[#1D2B45]/40'
                }`}
              >
                {domainLabels[d]}
              </button>
            ))}
          </div>
        )}

        <div className="space-y-16">
          {displayed.map((item, idx) => (
            <article key={item.slug} className="fade-in">
              <div className="border-t-[3px] border-[#3D9B82] pt-8 max-w-4xl">
                <div className="flex items-center gap-3 mb-4">
                  <span className="font-sans text-[10px] tracking-[0.2em] uppercase text-[#3D9B82]">
                    {domainLabels[item.domain] || item.domain}
                  </span>
                  <span className="text-[#1D2B45]/30">|</span>
                  <span className="font-sans text-[10px] tracking-wider text-[#1D2B45]/50">{item.source}</span>
                  {item.author && (
                    <>
                      <span className="text-[#1D2B45]/30">|</span>
                      <span className="font-sans text-[10px] tracking-wider text-[#1D2B45]/50">{item.author}</span>
                    </>
                  )}
                </div>
                <time className="block font-sans text-[10px] tracking-wider text-[#1D2B45]/40 mb-4">
                  {new Date(item.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                </time>
                <h3 className="font-sans text-xl md:text-2xl font-medium text-[#1D2B45] mb-6 group-hover:text-[#3D9B82] transition-colors">
                  {item.externalUrl ? (
                    <a href={item.externalUrl} target="_blank" rel="noopener noreferrer" className="hover:text-[#3D9B82] transition-colors">
                      {item.title}
                    </a>
                  ) : (
                    item.title
                  )}
                </h3>

                {/* Three-paragraph annotation */}
                <div className="space-y-4">
                  {item.verdict && (
                    <p className="text-base text-[#1D2B45] font-medium leading-relaxed">
                      {item.verdict}
                    </p>
                  )}
                  {item.evidence && (
                    <p className="text-sm text-[#1D2B45]/70 leading-relaxed">
                      {item.evidence}
                    </p>
                  )}
                  {item.frame && (
                    <p className="text-sm text-[#1D2B45]/70 leading-relaxed italic">
                      {item.frame}
                    </p>
                  )}
                </div>

                {item.externalUrl && (
                  <a
                    href={item.externalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block mt-6 font-sans text-[10px] tracking-[0.2em] uppercase text-[#3D9B82] hover:text-[#1D2B45] transition-colors"
                  >
                    Read the original &rarr;
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>

        {limit && items.length > limit && (
          <div className="fade-in mt-12 text-center">
            <a
              href="/reading-room"
              className="inline-block font-sans text-xs tracking-[0.2em] uppercase text-[#3D9B82] border border-[#3D9B82] px-8 py-3 hover:bg-[#3D9B82] hover:text-white transition-colors duration-300"
            >
              Enter the Reading Room
            </a>
          </div>
        )}
      </div>
    </section>
  )
}
