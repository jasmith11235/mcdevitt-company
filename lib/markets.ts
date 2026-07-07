/**
 * Single source of truth for office markets.
 *
 * Used by:
 * - `keystatic.config.ts` to define the Reading Room `markets` field options
 * - `components/ReadingRoom.tsx` to render the market filter and tag labels
 *
 * Values match the office slug convention used in `content/offices/*.json`
 * so future cross-linking (filter -> office card) stays consistent.
 */
export const MARKETS = [
  { value: 'amsterdam', label: 'Amsterdam' },
  { value: 'chicago', label: 'Chicago' },
  { value: 'greenwich', label: 'Greenwich' },
  { value: 'london', label: 'London' },
  { value: 'los-angeles', label: 'Los Angeles' },
  { value: 'nashville', label: 'Nashville' },
  { value: 'philadelphia', label: 'Philadelphia' },
  { value: 'west-palm-beach', label: 'Palm Beach' },
] as const

export type MarketValue = (typeof MARKETS)[number]['value']

export const MARKET_LABELS: Record<MarketValue, string> = MARKETS.reduce(
  (acc, market) => {
    acc[market.value] = market.label
    return acc
  },
  {} as Record<MarketValue, string>,
)

export function isMarketValue(value: string): value is MarketValue {
  return MARKETS.some(m => m.value === value)
}
