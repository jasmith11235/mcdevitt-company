# McDevitt Website: Build Spec

**For:** Roman
**From:** J. Smith · Bureau St. James
**Date:** 31 May 2026
**Build under review:** https://mcdevitt-company.vercel.app/
**Goal:** Get this in front of the CEO. Add Capital Markets under Services, make each service open a deeper section, clean the punch-list items below, and add a quiet motion layer so the page reads as a visual piece, not a brochure.

---

## 0. How to work this list

- Work top to bottom. Each item is scoped so you can land it, push, and move on.
- Priority order if time is short: **Part A (Services + Capital Markets) → Part B (global fixes) → Part D (motion).** Parts A and B are what the CEO will notice.
- Branch off dev, deploy to the Vercel preview, drop me the link per section if you want a check before merge.
- Brand rails to hold the whole way through:
  - Type: **Inter** for headlines/body/UI, **JetBrains Mono** for labels, metadata, nav, and any system element. Mono is always uppercase when used as a system element.
  - Color by meaning: **Navy** is the default/analytical color. **Forest** for place and physical sites. **Burgundy** for heritage/milestones. **Gold is digital CTA only** (never on the crest, never in print). When two triggers compete, default to Navy.
  - Founding year is **1997**. Do not let any other year slip in.
  - Accessibility: WCAG AA. All text 4.5:1 contrast. Minimum 11px.

Asset paths referenced below are listed in **Part E**. The deeper-section source copy for Tenant, Landlord, and Development is in the Dropbox collateral folder, named in Part E so you can pull directly.

---

## PART A: Services + Capital Markets (do this first)

### A1. Services section ("WHAT WE DO"): add Capital Markets, make pillars clickable

**Current state:** Three pillars: Tenant Representation, Landlord Representation, Development Advisory.

**Target state:** Four pillars, each a clickable card that opens its own deeper section.

1. **Rename** "Development Advisory" to **"Development"** (drop "Advisory"). Keep the existing copy.
2. **Add a fourth pillar: "Capital Markets."** Short blurb under the heading:
   > Investment-oriented disposals and acquisitions across all retail real-estate asset classes. We advise investors of every category, from institutions to private individuals.
3. **Order of the four pillars:** Tenant Representation · Landlord Representation · Capital Markets · Development.
4. **Make every pillar clickable.** The hover-raise you already built stays; it becomes the affordance that the card opens a deeper section. Each card links to a deep section/page:
   - Tenant Representation → `/practice/tenants`
   - Landlord Representation → `/practice/landlords`
   - Capital Markets → `/practice/capital`
   - Development → `/practice/development`
   (Use in-page expand or routed sub-pages, your call on implementation, but the four must be consistent. Routed sub-pages are cleaner for SEO and for linking from the nav.)
5. The four deep sections are specified in **Part C** (Capital Markets, full copy ready to drop) and **Part D references** (Tenant / Landlord / Development, sourced from the Dropbox books).

> Note for James's review: Capital Markets is the Europe / Amsterdam-led practice and carries the RICS accreditation (below). It belongs in the four because the firm sells it on the current production site; we are bringing it into the new build, not inventing it.

### A2. Capital Markets deep section: see **Part C**. This is the one to build out fully. RICS logo included.

---

## PART B: Global fixes (mapped to the notes)

### B0. Hero: stack the three statements
The hero sub-line runs as one line today: "STRATEGIC VISION. DATA-DRIVEN INSIGHT. GLOBAL REACH." Stack it as three lines, left-aligned, one statement per line:

```
STRATEGIC VISION
DATA-DRIVEN INSIGHT
GLOBAL REACH
```

Set in the system style (JetBrains Mono, uppercase, tracked per the brand scale). These are the spine of the page. The motion in F1 animates them in on load.

### B1. Logo redundancy: nav vs. hero
The wordmark appears in the nav bar and again large in the hero, stacked. Remove the duplication: **hide the nav-bar logo while the hero is in view, reveal it on scroll** once the hero passes. Fade/slide it in; do not pop. The hero wordmark stays as the anchor; the nav wordmark earns its place only after you leave the hero.

### B2. Orphan words (whole site)
Audit every headline and body block for one-word last lines (a single word stranded on its own line). Fix by one of: pull a word up with a non-breaking space, bring more words down, or nudge the font size/measure. Hot spots from the notes: the hero sub-line ("...GLOBAL REACH."), testimonials, news cards, any two-line heading. This is a final-pass typographic sweep, not a one-off.

### B3. News + Reading Room: click through to the source
- **News cards** and **Reading Room** entries must link to the original article (open in a new tab, `rel="noopener"`).
- Where a crawled item has a source URL, the whole card is the link. Show the outlet name (CoStar, Bisnow, Business of Fashion, etc.) as the visible attribution.
- "ALL NEWS" button routes to the full index.

### B4. Crawler coverage
The intelligence/news crawler must pull enough that **every filter option (domain and market) has at least one item.** Right now some filter chips can land on an empty state. Either (a) widen the crawl so each domain/market has coverage, or (b) hide a chip when it has zero items. Preference is (a): populate, don't hide. Confirm with me which markets are thin and I'll get you sources.

### B5. Offices: "Eight," and the count
- The heading currently reads "Nine offices." It should read **"Eight..."** for now (it may move to ten soon, so phrase it so a number change is a one-line edit, not a layout rebuild).
- Reconcile the office list to eight: Philadelphia (HQ), Greenwich, Nashville, Chicago, Los Angeles, London, Amsterdam, Palm Beach. Remove any stray ninth entry (e.g. a legacy New York/Westport line) unless I tell you otherwise.
- Keep the watercolor world map treatment. Remove the "Adobe Photoshop 2022" artifact if it is rendering anywhere.

### B6. Projects: real photography
Every project tile needs a proper photo of that specific project. Placeholders and mismatched images out. I will deliver the correct images per project; build the grid so swapping an image is a single asset replace per tile (named by project slug). Tiles in the notes: Brookfield Place, District La Brea, Fourth Street, Pacific Park, Terrain, [interior], [pergola], Pacific Place. Hold the slots; I will fill them.

### B7. Contact → Salesforce intake (coordinate with Janine)
- **Contact becomes a button link to a Salesforce intake form**, not an inline contact block. One clear CTA (Gold, digital CTA color).
- **Add a section under Contact: "Want to work with us?"**: links to a separate Salesforce intake form for candidates, so all candidates land in one place.
- Both forms are Salesforce-owned. I am coordinating the form endpoints with Janine; build the buttons and section now with placeholder URLs (`SALESFORCE_CONTACT_URL`, `SALESFORCE_CAREERS_URL`) so we drop the live links in without a rebuild.

---

## PART C: Capital Markets deep section (ready to build)

This is the full section. Copy is final unless flagged. Layout direction follows the brand (magazine spread, type fills space, push to edges, earned color). The RICS mark is the credibility anchor; treat it with air, not decoration.

### C1. Hero
- **Display line (Inter, large):** We create investment solutions.
- **Treatment:** Navy field. The line sits over (or above) a real Amsterdam canal-side photo. Place the **RICS mark, white**, beneath the line. Asset: `/logos/rics-nl.svg` (white on navy): see Part E.
- Hero photo: `/photos/practice-capital.png`. Caption (Mono, small): AMSTERDAM, CANAL-SIDE, EVENING.

### C2. Lead paragraph
> The McDevitt team brings exceptional experience in investment-oriented disposals and acquisitions. Our investment advisors have specialist knowledge of all retail real-estate asset classes. We advise investors of all categories, from institutions to private individuals.

### C3. Approach paragraph
> We have played a leading role in numerous successful transactions, building a strong network of purchasers, vendors, and pricing that our investment and transaction experts use on behalf of our clients. We act locally but think and coordinate across our offices globally. We draw on years of experience in leasing and valuation to provide integrated solutions.

### C4. Accreditation block (RICS)
- **RICS mark** (`/logos/rics-regulated.png` or `/logos/rics-nl.svg`).
- Caption (Mono, small): **REGULATED BY RICS. THE NETHERLANDS.**
- Alt text: "Regulated by RICS, Royal Institution of Chartered Surveyors."
- Give it its own quiet band. RICS is the trust signal for the European institutional buyer; do not crowd it.

### C5. "Specialists advise on these segments"
Heading (Inter): Specialists advise on these segments:
Two-tier list. **Retail** is the parent with four children; the other three are siblings.

- **Retail**
  - High Street
  - Shopping Centers
  - Supermarkets
  - Retail Parks and Retail Warehousing
- **Hospitality**
- **Residential**
- **Office**

Set the segment labels in Mono uppercase. Retail's children indent or sit in a sub-column. RICS mark may repeat small here if the layout wants a second anchor.

### C6. "Our Expertise": four blocks
Section heading (Inter): Our Expertise. Four blocks, label in Burgundy or Forest accent (label only, earned color), body in Inter.

1. **Purchase and Sale**: We advise during each phase of the sale process, on individual assets and on portfolios. Care-free, from extensive vendor due diligence through final closing.
2. **Acquisition**: We advise during each phase of the purchase process, from valuation and negotiation to final closing. We are specialists in connecting people.
3. **Valuation and Advisory**: Personal approach and commercial intelligence in combination with structured market data. Reports are written for the decisions they support.
4. **Asset Management**: Asset management is taking care, real care, of a tactical and strategic plan. We act on behalf of the asset and the investor in equal measure.

### C7. "Track Record & Case Studies"
Section heading (Inter): Track Record & Case Studies. Card layout: project photo left, deal facts right (facts in Mono).

**Case Study 1: Retail parks disposition**
- Narrative: Disposition of two large-scale retail parks tenanted by Praxis and De Mandemakers Groep.
- VENDOR: De Mandemakers Groep (DMG)
- PURCHASER: Corum Asset Management
- ASSETS: 2
- LFA: 15,500 sqm
- LOCATION: Capelle aan den IJssel & Bergschenhoek
- PRICE: €21.3 million

**Case Study 2: Supermarket portfolio**
- Narrative: Disposition of a supermarket portfolio via sale-and-leaseback with the second-largest supermarket chain in the Netherlands.
- VENDOR: Jumbo Supermarkten
- PURCHASER: Bouwinvest
- ASSETS: 13
- LFA: 17,700 sqm
- LOCATION: 13 locations
- PRICE: €34.4 million
- TRANSACTION YEAR: Q4 2018

> Optional third case (cleaner, recent), if you want a Dutch grocery example to lead with: a stabilized supermarket on a long-term PLUS lease sold into the Bouwinvest Retail Fund, ~1,700 sqm, Renkum, NL, 2024. Use it or hold it: James's call.

### C8. Team (FLAG: confirm before publishing)
The production page shows two NL managers (Michiel Tahey, Willem Groen) with 2018-era bios. **Do not publish those names without confirmation**: the Amsterdam team has changed. Build the team module so it takes name / title / bio / portrait, leave it unpopulated, and I will give you the current people. Title line for the slot: MANAGER · CAPITAL MARKETS.

### C9. Foot of section
Quiet outbound to Intelligence (same pattern as the other practices):
> Market briefs, rent comps, tenant risk scoring. The intelligence behind every investment thesis.

---

## PART D: Tenant / Landlord / Development deep sections

Same magazine-spread template as Capital Markets: one cover image, one display title, one lead paragraph, then the module(s) that surface earns. Source copy lives in the Dropbox collateral books (named in Part E). Headlines below; pull body copy from the books and from the current production site.

### D1. Tenant Representation (`/practice/tenants`)
- Lead: We combine market knowledge with demographic and psychographic analysis to recommend the best available sites for expanding retail brands. We partner with clients who value unique spaces and an exceptional shopping experience.
- Module: **client roster** (running text, alphabetical). Use the reconciled 2026 active list: I will hand you the final names; do not scrape the old logo wall.
- Case studies: Anthropologie, 158 Regent Street, London (2019); Free People, De Negen Straatjes, Amsterdam (2025).
- Source book: `Tenant Representation Book / McDevitt_TenantRepresentation_2020.pdf`.

### D2. Landlord Representation (`/practice/landlords`)
- Lead: We collaborate with select landlords and developers to create distinctive retail destinations by bringing together targeted, best-in-class tenants.
- Module: **featured asset** (property card). Featured: The Shops at Sportsmen's Lodge, Studio City, CA.
- Case study: URBN portfolio, P.C. Hooftstraat, Amsterdam.
- Source book: `Landlord Representation Book / McDevitt_LandlordRepresentation_2020.pdf`.

### D3. Development (`/practice/development`)
- Lead: We pioneer retail-grounded districts that last. Decisions rooted in experience, supported by research, refined by intuition.
- Module: **acquisition criteria**: what we acquire (value-add and core-plus), desired locations (contiguous 48 states), markets (retail, residential mixed-use, hospitality), and a "required information" checklist for an opportunity.
- **Garden wall:** Development sits behind a visual separation from the three retail-services pillars: it reads as related but distinct, since it will ultimately live on its own. Keep it on the site for now, walled.
- Source: `McDevitt_CompanyProfile 2021.pdf` (Development Perspective pages).

---

## PART E: Asset manifest

### In the repo (`apps/site/public/`)
| Asset | Path | Use |
|---|---|---|
| RICS (NL, line) | `/logos/rics-nl.svg` | Capital Markets hero, white on navy |
| RICS (regulated) | `/logos/rics-regulated.png` | Capital Markets accreditation band |
| Capital hero photo | `/photos/practice-capital.png` | Capital Markets hero |
| Tenant hero photo | `/photos/practice-tenants.png` | Tenant deep section |
| Landlord hero photo | `/photos/practice-landlords.png` | Landlord deep section |
| Development hero photo | `/photos/practice-development.png` | Development deep section |
| Wordmark (white) | `/logos/MCDEVITT_white.svg` | Nav on dark, hero |
| Wordmark (navy/fathom) | `/logos/MCDEVITT_fathom.svg` | Nav on light |

### In Dropbox (collateral, by name: for body copy and deeper content)
- `McDevitt Brand Collateral / McDevitt_CompanyProfile 2021 / McDevitt_CompanyProfile 2021.pdf`
- `McDevitt Brand Collateral / Tenant Representation Book / McDevitt_TenantRepresentation_2020.pdf`
- `McDevitt Brand Collateral / Landlord Representation Book / McDevitt_LandlordRepresentation_2020.pdf`

### From James (pending delivery)
- Correct project photography for the Projects grid (Part B6), named by project slug.
- Final Capital Markets team names + portraits (Part C8).
- Reconciled tenant client roster (Part D1).
- Salesforce form endpoints (Part B7).

---

## PART F: The visual-dynamo layer (motion + storytelling)

The brief is movement and storytelling, not decoration. Keep it quiet, fast, and purposeful. Everything below respects `prefers-reduced-motion` (provide a static fallback for each).

### F1. Hero
- Wordmark draws in once on load: the bracket strokes render first, the letters settle. ~700ms, ease-out, once per session.
- The three stacked statements (STRATEGIC VISION / DATA-DRIVEN INSIGHT / GLOBAL REACH) reveal in sequence on load, one line at a time, ~120ms stagger. They are the spine of the page; let them land like a statement, not a slideshow.
- Scroll cue ("SCROLL") fades out on first scroll.

### F2. Section entrances
- Section labels (Mono) and display headings rise 12–16px and fade in as they enter the viewport. One stagger per section, not per element. No bounce.

### F3. Service pillars
- The existing hover-raise stays. Add a hairline rule that draws left-to-right on hover to signal "this opens." On click, the deep section transitions in (route or expand) with a short cross-fade, not a hard cut.

### F4. Capital Markets
- The RICS mark fades up after the lead paragraph is in view: it should feel earned, like a seal at the foot of a document.
- Case-study facts (Mono) count/reveal line by line as the card enters. Subtle.

### F5. Data Science
- The proprietary-model maps are the natural place for motion: let one map plot/draw as it scrolls into view (points settling onto the map). This is the section that proves the "data-driven" claim: make it move once, well.

### F6. Offices
- The watercolor map holds. On enter, the eight office pins drop in sequence. No looping.

### F7. Rules of restraint
- One motion idea per section, maximum. If two compete, cut one.
- Nothing loops in the viewport. Nothing autoplays with sound.
- Motion never blocks reading or delays interaction. Content is present and legible with motion off.

---

## Punch-list checkbox (for your pass)

- [ ] Services: Development renamed, Capital Markets added, four pillars clickable to deep sections
- [ ] Capital Markets deep section built with RICS mark (Part C)
- [ ] Tenant / Landlord / Development deep sections built from books (Part D)
- [ ] Nav logo hides over hero, reveals on scroll (B1)
- [ ] Orphan-word sweep, whole site (B2)
- [ ] News + Reading Room click through to source, new tab (B3)
- [ ] Crawler populates every filter chip, or thin chips hidden (B4)
- [ ] Offices reads "Eight," count reconciled, Photoshop artifact gone (B5)
- [ ] Projects grid wired for per-slug photo swap (B6)
- [ ] Contact → Salesforce button; "Want to work with us?" section added (B7)
- [ ] Motion layer in, reduced-motion fallbacks (Part F)
- [ ] AA contrast and 11px minimum held throughout

Questions on any item, ping me. I would rather answer than have you build blind.
