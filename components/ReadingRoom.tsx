'use client'

import { Suspense, useMemo, type ReactNode } from 'react'
import { useRouter, usePathname, useSearchParams } from 'next/navigation'
import TransitionLink from './TransitionLink'
import { MARKETS, MARKET_LABELS, isMarketValue, type MarketValue } from '@/lib/markets'

interface ReadingRoomItem {
  slug: string
  title: string
  source: string
  author?: string
  date: string
  domain: string
  markets?: MarketValue[]
  verdict: string
  evidence: string
  frame: string
  externalUrl?: string
  order?: number
}

const DOMAIN_LABELS: Record<string, string> = {
  'retail-consumer': 'Retail / Consumer',
  'hospitality-fb': 'Hospitality / F&B',
  'culture-demographics': 'Culture / Demographics',
  'business-workspace': 'Business / Workspace',
  'design-placemaking': 'Design / Placemaking',
}

const DOMAIN_OPTIONS = Object.entries(DOMAIN_LABELS).map(([value, label]) => ({ value, label }))
const DOMAIN_VALUES = new Set(Object.keys(DOMAIN_LABELS))
const MARKET_OPTIONS = MARKETS.map(m => ({ value: m.value, label: m.label }))

function isDomainValue(value: string): boolean {
  return DOMAIN_VALUES.has(value)
}

interface ReadingRoomProps {
  items: ReadingRoomItem[]
  limit?: number
}

export default function ReadingRoom({ items, limit }: ReadingRoomProps) {
  return (
    <section id="reading-room" className="py-24 md:py-32 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <SectionHeader />
        {limit ? (
          <SimpleList items={items} limit={limit} />
        ) : (
          <Suspense fallback={<ArticleList items={items} />}>
            <FilterableList items={items} />
          </Suspense>
        )}
      </div>
    </section>
  )
}

function SectionHeader() {
  return (
    <div className="fade-in mb-16">
      <div className="accent-rule mb-6" />
      <h2 className="font-sans text-xs tracking-[0.3em] uppercase text-[#3D9B82] mb-4">Reading Room</h2>
      <p className="text-2xl md:text-3xl font-sans font-light leading-tight tracking-tight text-[#1D2B45] max-w-2xl">
        Curiosities about the businesses that occupy buildings, and what they signal for the buildings themselves.
      </p>
    </div>
  )
}

function SimpleList({ items, limit }: { items: ReadingRoomItem[]; limit: number }) {
  const displayed = items.slice(0, limit)
  return (
    <>
      <ArticleList items={displayed} />
      {items.length > limit && (
        <div className="enter-fade mt-12 text-center">
          <TransitionLink
            href="/reading-room"
            className="inline-block font-sans text-xs tracking-[0.2em] uppercase text-[#3D9B82] border border-[#3D9B82] px-8 py-3 hover:bg-[#3D9B82] hover:text-white transition-colors duration-300"
          >
            Enter the Reading Room
          </TransitionLink>
        </div>
      )}
    </>
  )
}

function FilterableList({ items }: { items: ReadingRoomItem[] }) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const rawDomain = searchParams.get('domain')
  const rawMarket = searchParams.get('market')
  const activeDomain = rawDomain && isDomainValue(rawDomain) ? rawDomain : null
  const activeMarket = rawMarket && isMarketValue(rawMarket) ? (rawMarket as MarketValue) : null

  const filtered = useMemo(
    () =>
      items.filter(item => {
        if (activeDomain && item.domain !== activeDomain) return false
        if (activeMarket && !(item.markets ?? []).includes(activeMarket)) return false
        return true
      }),
    [items, activeDomain, activeMarket],
  )
  const domainCounts = useMemo(() => {
    const counts: Record<string, number> = {}
    for (const item of items) {
      if (activeMarket && !(item.markets ?? []).includes(activeMarket)) continue
      counts[item.domain] = (counts[item.domain] ?? 0) + 1
    }
    return counts
  }, [items, activeMarket])

  const marketCounts = useMemo(() => {
    const counts: Record<string, number> = {}
    for (const item of items) {
      if (activeDomain && item.domain !== activeDomain) continue
      for (const m of item.markets ?? []) {
        counts[m] = (counts[m] ?? 0) + 1
      }
    }
    return counts
  }, [items, activeDomain])

  const allDomainsCount = useMemo(
    () => items.filter(i => !activeMarket || (i.markets ?? []).includes(activeMarket)).length,
    [items, activeMarket],
  )

  const allMarketsCount = useMemo(
    () => items.filter(i => !activeDomain || i.domain === activeDomain).length,
    [items, activeDomain],
  )

  const updateParam = (key: 'domain' | 'market', value: string | null) => {
    const params = new URLSearchParams(searchParams.toString())
    if (value === null) params.delete(key)
    else params.set(key, value)
    const qs = params.toString()
    router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false })
  }

  const clearFilters = () => {
    router.replace(pathname, { scroll: false })
  }

  const hasActiveFilter = activeDomain !== null || activeMarket !== null

  return (
    <>
      <div className="enter-fade mb-16 space-y-6">
        <FilterRow
          label="Domain"
          allLabel="All Domains"
          allCount={allDomainsCount}
          options={DOMAIN_OPTIONS.map(o => ({ ...o, count: domainCounts[o.value] ?? 0 }))}
          activeValue={activeDomain}
          onSelect={value => updateParam('domain', value)}
        />
        <FilterRow
          label="Market"
          allLabel="All Markets"
          allCount={allMarketsCount}
          options={MARKET_OPTIONS.map(o => ({ ...o, count: marketCounts[o.value] ?? 0 }))}
          activeValue={activeMarket}
          onSelect={value => updateParam('market', value)}
        />
      </div>

      {filtered.length === 0 ? (
        <EmptyState canClear={hasActiveFilter} onClear={clearFilters} />
      ) : (
        <ArticleList items={filtered} />
      )}
    </>
  )
}

function ArticleList({ items }: { items: ReadingRoomItem[] }) {
  return (
    <div className="space-y-16">
      {items.map((item, index) => (
        <Article key={item.slug} item={item} index={index} />
      ))}
    </div>
  )
}

interface FilterOption {
  value: string
  label: string
  count: number
}

interface FilterRowProps {
  label: string
  allLabel: string
  allCount: number
  options: readonly FilterOption[]
  activeValue: string | null
  onSelect: (value: string | null) => void
}

function FilterRow({ label, allLabel, allCount, options, activeValue, onSelect }: FilterRowProps) {
  return (
    <div>
      <span className="block font-sans text-[10px] tracking-[0.3em] uppercase text-[#1D2B45]/40 mb-3">
        {label}
      </span>
      <div className="flex flex-wrap gap-3">
        <FilterChip active={activeValue === null} count={allCount} onClick={() => onSelect(null)}>
          {allLabel}
        </FilterChip>
        {options.map(opt => (
          <FilterChip
            key={opt.value}
            active={activeValue === opt.value}
            count={opt.count}
            onClick={() => onSelect(opt.value)}
          >
            {opt.label}
          </FilterChip>
        ))}
      </div>
    </div>
  )
}

interface FilterChipProps {
  active: boolean
  count: number
  onClick: () => void
  children: ReactNode
}

function FilterChip({ active, count, onClick, children }: FilterChipProps) {
  const isEmpty = count === 0
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`font-sans text-[10px] tracking-[0.2em] uppercase px-4 py-2 border transition-all duration-200 ${
        active
          ? 'bg-[#1D2B45] text-white border-[#1D2B45]'
          : `text-[#1D2B45]/60 border-[#1D2B45]/20 hover:border-[#1D2B45]/40 ${isEmpty ? 'opacity-40' : ''}`
      }`}
    >
      <span>{children}</span>
      <span
        className={`ml-1.5 tabular-nums font-light ${
          active ? 'text-white/60' : 'text-[#1D2B45]/40'
        }`}
        aria-hidden
      >
        {count}
      </span>
    </button>
  )
}

function Article({ item, index }: { item: ReadingRoomItem; index: number }) {
  const markets = item.markets ?? []
  const formattedDate = new Date(item.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  return (
    <article className="enter-fade" style={{ animationDelay: `${Math.min(index, 5) * 60}ms` }}>
      <div className="border-t-[3px] border-[#3D9B82] pt-8 max-w-4xl">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-2 mb-4">
          <span className="font-sans text-[10px] tracking-[0.2em] uppercase text-[#3D9B82]">
            {DOMAIN_LABELS[item.domain] ?? item.domain}
          </span>
          <MetaSeparator />
          <span className="font-sans text-[10px] tracking-wider text-[#1D2B45]/50">{item.source}</span>
          {item.author && (
            <>
              <MetaSeparator />
              <span className="font-sans text-[10px] tracking-wider text-[#1D2B45]/50">{item.author}</span>
            </>
          )}
          {markets.length > 0 && (
            <>
              <MetaSeparator />
              <span className="font-sans text-[10px] tracking-[0.2em] uppercase text-[#1D2B45]/60">
                {markets.map(m => MARKET_LABELS[m] ?? m).join(' · ')}
              </span>
            </>
          )}
        </div>
        <time className="block font-sans text-[10px] tracking-wider text-[#1D2B45]/40 mb-4" dateTime={item.date}>
          {formattedDate}
        </time>
        <h3 className="font-sans text-xl md:text-2xl font-medium text-[#1D2B45] mb-6">
          {item.externalUrl ? (
            <a
              href={item.externalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#3D9B82] transition-colors duration-300"
            >
              {item.title}
            </a>
          ) : (
            item.title
          )}
        </h3>

        <div className="space-y-4">
          {item.verdict && (
            <p className="text-base text-[#1D2B45] font-medium leading-relaxed">{item.verdict}</p>
          )}
          {item.evidence && (
            <p className="text-sm text-[#1D2B45]/70 leading-relaxed">{item.evidence}</p>
          )}
          {item.frame && (
            <p className="text-sm text-[#1D2B45]/70 leading-relaxed italic">{item.frame}</p>
          )}
        </div>

        {item.externalUrl && (
          <a
            href={item.externalUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-6 font-sans text-[10px] tracking-[0.2em] uppercase text-[#3D9B82] hover:text-[#1D2B45] transition-colors duration-300"
          >
            Read the original &rarr;
          </a>
        )}
      </div>
    </article>
  )
}

function MetaSeparator() {
  return (
    <span aria-hidden className="text-[#1D2B45]/30">
      |
    </span>
  )
}

function EmptyState({ canClear, onClear }: { canClear: boolean; onClear: () => void }) {
  return (
    <div className="enter-fade border-t-[3px] border-[#1D2B45]/10 pt-8 max-w-4xl">
      <p className="text-base text-[#1D2B45]/60 mb-4">No articles match the current filters.</p>
      {canClear && (
        <button
          type="button"
          onClick={onClear}
          className="font-sans text-[10px] tracking-[0.2em] uppercase text-[#3D9B82] hover:text-[#1D2B45] transition-colors duration-300"
        >
          Clear filters &rarr;
        </button>
      )}
    </div>
  )
}
