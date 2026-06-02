# Capital Markets: drop-in content

Ready-to-paste content object for the Capital Markets deep section. If the build uses the `practices` content array (slug `capital`), this is the populated entry. If not, the same fields map one-to-one to the section in Part C of the build spec. RICS asset path is real and in the repo.

```ts
{
  slug: "capital",
  label: "Capital Markets",
  displayTitle: ["Capital", "Markets."],
  heroPhoto: "/photos/practice-capital.png",
  heroCaption: "Amsterdam, canal-side, evening",
  heroLine: "We create investment solutions.",

  whatWeDo:
    "The McDevitt team brings exceptional experience in investment-oriented disposals and acquisitions. Our investment advisors have specialist knowledge of all retail real-estate asset classes. We advise investors of all categories, from institutions to private individuals.",

  approach:
    "We have played a leading role in numerous successful transactions, building a strong network of purchasers, vendors, and pricing that our investment and transaction experts use on behalf of our clients. We act locally but think and coordinate across our offices globally. We draw on years of experience in leasing and valuation to provide integrated solutions.",

  accreditation: {
    logo: "/logos/rics-nl.svg",            // white line mark for navy hero
    logoMono: "/logos/rics-regulated.png", // accreditation band
    alt: "Regulated by RICS, Royal Institution of Chartered Surveyors.",
    caption: "Regulated by RICS. The Netherlands.",
  },

  serviceSegments: {
    retail: ["High Street", "Shopping Centers", "Supermarkets", "Retail Parks and Retail Warehousing"],
    other: ["Hospitality", "Residential", "Office"],
  },

  expertise: [
    { title: "Purchase and Sale", description: "We advise during each phase of the sale process, on individual assets and on portfolios. Care-free, from extensive vendor due diligence through final closing." },
    { title: "Acquisition", description: "We advise during each phase of the purchase process, from valuation and negotiation to final closing. We are specialists in connecting people." },
    { title: "Valuation and Advisory", description: "Personal approach and commercial intelligence in combination with structured market data. Reports are written for the decisions they support." },
    { title: "Asset Management", description: "Asset management is taking care, real care, of a tactical and strategic plan. We act on behalf of the asset and the investor in equal measure." },
  ],

  caseStudies: [
    {
      narrative: "Disposition of two large-scale retail parks tenanted by Praxis and De Mandemakers Groep.",
      vendor: "De Mandemakers Groep (DMG)",
      purchaser: "Corum Asset Management",
      assets: 2,
      lfaSqm: 15500,
      location: "Capelle aan den IJssel & Bergschenhoek",
      price: "€21.3 million",
    },
    {
      narrative: "Disposition of a supermarket portfolio via sale-and-leaseback with the second-largest supermarket chain in the Netherlands.",
      vendor: "Jumbo Supermarkten",
      purchaser: "Bouwinvest",
      assets: 13,
      lfaSqm: 17700,
      location: "13 locations",
      price: "€34.4 million",
      transactionYear: "Q4 2018",
    },
  ],

  // FLAG: do not publish old NL names. Populate with current team before launch.
  team: [], // { name, title: "Manager · Capital Markets", bio, portrait }

  intelTeaser:
    "Market briefs, rent comps, tenant risk scoring. The intelligence behind every investment thesis.",
}
```

**Notes**
- Source: McDevitt production Capital Markets (NL) page, recovered and tidied to brand voice. Facts unchanged.
- RICS marks are already in the repo at `/logos/rics-nl.svg` and `/logos/rics-regulated.png`. No need to chase the Dropbox copy.
- Team module left empty on purpose. James is confirming the current Amsterdam people.
