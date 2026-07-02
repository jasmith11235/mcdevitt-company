import { useTranslations } from 'next-intl'
import { TEXAS_IABS_PDF } from '@/lib/disclosures'

export default function TexasIABSNotice() {
  const t = useTranslations('disclosures')

  return (
    <div className="border-t border-navy/20 bg-cream px-6 py-4 text-center md:px-10">
      <p className="font-mercury text-[10pt] leading-[1.6] text-navy/90">
        {t('texasNotice')}{' '}
        <a
          href={TEXAS_IABS_PDF}
          target="_blank"
          rel="noopener noreferrer"
          className="text-navy underline decoration-navy/40 underline-offset-2 transition-colors duration-300 hover:text-green"
        >
          {t('texasLink')}
        </a>
      </p>
    </div>
  )
}
