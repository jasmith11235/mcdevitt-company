import { config, fields, collection, singleton } from '@keystatic/core';
import { MARKETS } from './lib/markets';

/**
 * Shared schema for the generalized practice deep pages (Tenant, Landlord,
 * Development). A factory so each singleton gets its own field controllers.
 * Capital Markets has a bespoke schema below.
 */
function practiceSchema() {
  return {
    heroLine: fields.text({ label: 'Hero Display Line' }),
    heroCaption: fields.text({ label: 'Hero Photo Caption', description: 'Optional. Shown small under the hero.' }),
    heroPhoto: fields.text({ label: 'Hero Photo Path', description: 'Optional. Path under /public, e.g. /photos/practice-tenants.png. Leave empty for the branded navy treatment.' }),
    lead: fields.text({ label: 'Lead Paragraph', multiline: true }),
    sections: fields.array(
      fields.object({
        heading: fields.text({ label: 'Heading' }),
        body: fields.text({ label: 'Body', multiline: true }),
      }),
      { label: 'Approach Sections', itemLabel: props => props.fields.heading.value || 'Section' },
    ),
    criteriaHeading: fields.text({ label: 'Criteria Section Heading', description: 'Optional. e.g. Acquisition Criteria.' }),
    criteria: fields.array(
      fields.object({
        heading: fields.text({ label: 'Group Heading' }),
        items: fields.array(fields.text({ label: 'Item' }), { label: 'Items', itemLabel: props => props.value || 'Item' }),
      }),
      { label: 'Criteria Groups', itemLabel: props => props.fields.heading.value || 'Group' },
    ),
    featured: fields.object(
      {
        title: fields.text({ label: 'Title' }),
        location: fields.text({ label: 'Location' }),
        assetType: fields.text({ label: 'Asset Type' }),
        body: fields.text({ label: 'Description', multiline: true }),
        photo: fields.text({ label: 'Photo Path', description: 'Optional. Path under /public.' }),
      },
      { label: 'Featured Asset (optional)' },
    ),
    caseStudies: fields.array(
      fields.object({
        title: fields.text({ label: 'Title' }),
        location: fields.text({ label: 'Location' }),
        year: fields.text({ label: 'Year' }),
        narrative: fields.text({ label: 'Narrative', multiline: true }),
      }),
      { label: 'Case Studies', itemLabel: props => props.fields.title.value || 'Case study' },
    ),
    roster: fields.array(fields.text({ label: 'Client name' }), {
      label: 'Client Roster (leave empty to show "available on request")',
      itemLabel: props => props.value || 'Client',
    }),
    quote: fields.object(
      {
        quote: fields.text({ label: 'Quote', multiline: true }),
        name: fields.text({ label: 'Name' }),
        role: fields.text({ label: 'Role' }),
      },
      { label: 'Pull Quote (optional)' },
    ),
    intelTeaser: fields.text({ label: 'Intelligence Teaser', multiline: true }),
  };
}

export default config({
  storage: {
    kind: 'local',
  },
  singletons: {
    hero: singleton({
      label: 'Hero Section',
      path: 'content/pages/hero',
      format: { data: 'json' },
      schema: {
        tagline: fields.text({ label: 'Tagline', description: 'Main hero tagline' }),
        subtitle: fields.text({ label: 'Subtitle', multiline: true }),
      },
    }),
    about: singleton({
      label: 'Our Story',
      path: 'content/pages/about',
      format: { data: 'json' },
      schema: {
        heading: fields.text({ label: 'Section Heading' }),
        foundedYear: fields.text({ label: 'Founded Year' }),
        intro: fields.text({ label: 'Introduction', multiline: true }),
        mission: fields.text({ label: 'Mission Statement', multiline: true }),
        vision: fields.text({ label: 'Vision Statement', multiline: true }),
        capabilities: fields.text({ label: 'Capabilities Summary', multiline: true }),
      },
    }),
    services: singleton({
      label: 'Services Section',
      path: 'content/pages/services',
      format: { data: 'json' },
      schema: {
        heading: fields.text({ label: 'Section Heading' }),
        tenantRepTitle: fields.text({ label: 'Tenant Rep Title' }),
        tenantRepDescription: fields.text({ label: 'Tenant Rep Description', multiline: true }),
        landlordRepTitle: fields.text({ label: 'Landlord Rep Title' }),
        landlordRepDescription: fields.text({ label: 'Landlord Rep Description', multiline: true }),
        capitalMarketsTitle: fields.text({ label: 'Capital Markets Title' }),
        capitalMarketsDescription: fields.text({ label: 'Capital Markets Description', multiline: true }),
        developmentTitle: fields.text({ label: 'Development Title' }),
        developmentDescription: fields.text({ label: 'Development Description', multiline: true }),
      },
    }),
    capitalMarkets: singleton({
      label: 'Capital Markets (deep page)',
      path: 'content/pages/capital-markets',
      format: { data: 'json' },
      schema: {
        heroLine: fields.text({ label: 'Hero Display Line' }),
        heroCaption: fields.text({ label: 'Hero Photo Caption' }),
        heroPhoto: fields.text({ label: 'Hero Photo Path', description: 'Optional. Path under /public, e.g. /photos/practice-capital.png. Leave empty for the branded navy treatment.' }),
        lead: fields.text({ label: 'Lead Paragraph', multiline: true }),
        approach: fields.text({ label: 'Approach Paragraph', multiline: true }),
        accreditationLogo: fields.text({ label: 'RICS Logo Path (dark, for light band)', description: 'Optional. e.g. /logos/rics-regulated.png. Leave empty for the typographic RICS treatment.' }),
        accreditationLogoLight: fields.text({ label: 'RICS Logo Path (white, for navy hero)', description: 'Optional. e.g. /logos/rics-white.png. Falls back to the dark logo if empty.' }),
        segmentsRetail: fields.array(fields.text({ label: 'Retail segment' }), {
          label: 'Retail segments',
          itemLabel: props => props.value || 'Segment',
        }),
        segmentsOther: fields.array(fields.text({ label: 'Other segment' }), {
          label: 'Other segments',
          itemLabel: props => props.value || 'Segment',
        }),
        expertise: fields.array(
          fields.object({
            title: fields.text({ label: 'Title' }),
            body: fields.text({ label: 'Description', multiline: true }),
          }),
          { label: 'Our Expertise', itemLabel: props => props.fields.title.value || 'Expertise block' },
        ),
        caseStudies: fields.array(
          fields.object({
            narrative: fields.text({ label: 'Narrative', multiline: true }),
            vendor: fields.text({ label: 'Vendor' }),
            purchaser: fields.text({ label: 'Purchaser' }),
            assets: fields.text({ label: 'Assets (count)' }),
            lfa: fields.text({ label: 'LFA' }),
            location: fields.text({ label: 'Location' }),
            price: fields.text({ label: 'Price' }),
            year: fields.text({ label: 'Transaction Year (optional)' }),
          }),
          { label: 'Case Studies', itemLabel: props => props.fields.vendor.value || 'Case study' },
        ),
        team: fields.array(
          fields.object({
            name: fields.text({ label: 'Name' }),
            title: fields.text({ label: 'Title', description: 'e.g. Manager · Capital Markets' }),
            bio: fields.text({ label: 'Bio', multiline: true }),
            portrait: fields.text({ label: 'Portrait Path' }),
          }),
          { label: 'Team (confirm names before publishing)', itemLabel: props => props.fields.name.value || 'Team member' },
        ),
        intelTeaser: fields.text({ label: 'Intelligence Teaser', multiline: true }),
      },
    }),
    practiceTenants: singleton({
      label: 'Tenant Representation (deep page)',
      path: 'content/pages/practice-tenants',
      format: { data: 'json' },
      schema: practiceSchema(),
    }),
    practiceLandlords: singleton({
      label: 'Landlord Representation (deep page)',
      path: 'content/pages/practice-landlords',
      format: { data: 'json' },
      schema: practiceSchema(),
    }),
    practiceDevelopment: singleton({
      label: 'Development (deep page)',
      path: 'content/pages/practice-development',
      format: { data: 'json' },
      schema: practiceSchema(),
    }),
    dataScience: singleton({
      label: 'Data Science Section',
      path: 'content/pages/data-science',
      format: { data: 'json' },
      schema: {
        heading: fields.text({ label: 'Section Heading' }),
        intro: fields.text({ label: 'Introduction', multiline: true }),
        proprietaryIntro: fields.text({ label: 'Proprietary Methods Intro', multiline: true }),
      },
    }),
    clientPortal: singleton({
      label: 'Client Portal',
      path: 'content/pages/client-portal',
      format: { data: 'json' },
      schema: {
        heading: fields.text({ label: 'Heading' }),
        description: fields.text({ label: 'Description', multiline: true }),
        buttonText: fields.text({ label: 'Button Text' }),
        buttonUrl: fields.url({ label: 'Portal URL' }),
      },
    }),
  },
  collections: {
    testimonials: collection({
      label: 'Testimonials',
      slugField: 'name',
      path: 'content/testimonials/*',
      format: { data: 'json' },
      columns: ['title', 'company', 'order'],
      schema: {
        name: fields.slug({ name: { label: 'Name' } }),
        title: fields.text({ label: 'Title/Role' }),
        company: fields.text({ label: 'Company' }),
        quote: fields.text({ label: 'Quote', multiline: true }),
        order: fields.integer({ label: 'Display Order', defaultValue: 0 }),
      },
    }),
    projects: collection({
      label: 'Select Projects',
      slugField: 'name',
      path: 'content/projects/*',
      format: { data: 'json' },
      columns: ['location', 'assetType', 'order'],
      schema: {
        name: fields.slug({ name: { label: 'Project Name' } }),
        location: fields.text({ label: 'City, State' }),
        totalSf: fields.text({ label: 'Total Square Footage' }),
        mcdevittSf: fields.text({ label: 'SF Leased by McDevitt' }),
        assetType: fields.text({ label: 'Asset Type' }),
        description: fields.text({ label: 'Description', multiline: true }),
        image: fields.text({ label: 'Image Path', description: 'Path relative to /public, e.g. /images/anthro-rock-center.jpg' }),
        order: fields.integer({ label: 'Display Order', defaultValue: 0 }),
      },
    }),
    offices: collection({
      label: 'Offices',
      slugField: 'city',
      path: 'content/offices/*',
      format: { data: 'json' },
      columns: ['phone', 'order'],
      schema: {
        city: fields.slug({ name: { label: 'City' } }),
        address: fields.text({ label: 'Street Address', multiline: true }),
        phone: fields.text({ label: 'Phone Number' }),
        order: fields.integer({ label: 'Display Order', defaultValue: 0 }),
      },
    }),
    news: collection({
      label: 'News',
      slugField: 'title',
      path: 'content/news/*',
      format: { data: 'json' },
      columns: ['source', 'category', 'date'],
      schema: {
        title: fields.slug({ name: { label: 'Headline' } }),
        status: fields.select({
          label: 'Status',
          description: 'Crawler-collected items arrive as Draft. Set to Published to make an item live on the site.',
          options: [
            { label: 'Draft (pending review)', value: 'draft' },
            { label: 'Published', value: 'published' },
          ],
          defaultValue: 'draft',
        }),
        source: fields.text({ label: 'Publication', description: 'e.g. Commercial Observer, CoStar News' }),
        date: fields.date({ label: 'Date' }),
        category: fields.select({
          label: 'Category',
          options: [
            { label: 'Industry', value: 'industry' },
            { label: 'Company News', value: 'company' },
            { label: 'Market Insight', value: 'insight' },
            { label: 'Project Update', value: 'project' },
          ],
          defaultValue: 'industry',
        }),
        summary: fields.text({ label: 'Summary', multiline: true, description: 'Two to three sentences.' }),
        externalUrl: fields.url({ label: 'Article Link' }),
      },
    }),
    readingRoom: collection({
      label: 'Reading Room',
      slugField: 'title',
      path: 'content/reading-room/*',
      format: { data: 'json' },
      columns: ['source', 'domain', 'date', 'order'],
      schema: {
        title: fields.slug({ name: { label: 'Article Title' } }),
        status: fields.select({
          label: 'Status',
          description: 'Crawler-collected items arrive as Draft. Set to Published to make an item live on the site.',
          options: [
            { label: 'Draft (pending review)', value: 'draft' },
            { label: 'Published', value: 'published' },
          ],
          defaultValue: 'draft',
        }),
        source: fields.text({ label: 'Publication' }),
        author: fields.text({ label: 'Author (optional)' }),
        date: fields.date({ label: 'Date' }),
        domain: fields.select({
          label: 'Domain',
          options: [
            { label: 'Retail / Consumer', value: 'retail-consumer' },
            { label: 'Hospitality / F&B', value: 'hospitality-fb' },
            { label: 'Culture / Demographics', value: 'culture-demographics' },
            { label: 'Business / Workspace', value: 'business-workspace' },
            { label: 'Design / Placemaking', value: 'design-placemaking' },
          ],
          defaultValue: 'retail-consumer',
        }),
        markets: fields.multiselect({
          label: 'Markets',
          description:
            'Tag with one or more office markets when the piece is locally relevant. Leave empty for general / macro trend articles.',
          options: MARKETS.map(m => ({ label: m.label, value: m.value })),
        }),
        verdict: fields.text({ label: 'Verdict', multiline: true, description: 'One sentence. The so-what for a real estate principal.' }),
        evidence: fields.text({ label: 'Evidence', multiline: true, description: 'Supporting paragraph. What the article actually found or reported.' }),
        frame: fields.text({ label: 'McDevitt Frame', multiline: true, description: 'Why it matters for the built environment. Spatial consequence or taste signal.' }),
        externalUrl: fields.url({ label: 'Article Link' }),
        order: fields.integer({ label: 'Display Order', defaultValue: 0 }),
      },
    }),
  },
});
