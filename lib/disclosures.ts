export interface Disclosure {
  state: string
  title: string
  description: string
  file: string
  statute: string
}

export const DISCLOSURES: Disclosure[] = [
  {
    state: 'Texas',
    title: 'Information About Brokerage Services (IABS)',
    description:
      'Required by the Texas Real Estate Commission (TREC). Form IABS 1-2, effective January 2026.',
    file: '/disclosures/Texas-IABS.pdf',
    statute: 'Texas Occupations Code, Chapter 1101',
  },
  {
    state: 'California',
    title: 'Disclosure Regarding Real Estate Agency Relationships',
    description: 'Required disclosure of agency relationships in real estate transactions.',
    file: '/disclosures/California-Agency-Disclosure.pdf',
    statute: 'Cal. Civ. Code §§ 2079.13–2079.24',
  },
  {
    state: 'Illinois',
    title: 'Disclosure of Brokerage Relationships',
    description:
      'Required disclosure of brokerage relationship types and duties owed to all parties.',
    file: '/disclosures/Illinois-Brokerage-Disclosure.pdf',
    statute: 'Illinois Real Estate License Act of 2000 (225 ILCS 454)',
  },
]

export const TEXAS_IABS_PDF = '/disclosures/Texas-IABS.pdf'
