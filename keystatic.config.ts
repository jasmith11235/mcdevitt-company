import { config, fields, collection, singleton } from '@keystatic/core';

export default config({
  storage: {
    kind: 'local',
  },
  singletons: {
    hero: singleton({
      label: 'Hero Section',
      path: 'content/pages/hero',
      schema: {
        tagline: fields.text({ label: 'Tagline', description: 'Main hero tagline' }),
        subtitle: fields.text({ label: 'Subtitle', multiline: true }),
      },
    }),
    about: singleton({
      label: 'Our Story',
      path: 'content/pages/about',
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
      schema: {
        heading: fields.text({ label: 'Section Heading' }),
        tenantRepTitle: fields.text({ label: 'Tenant Rep Title' }),
        tenantRepDescription: fields.text({ label: 'Tenant Rep Description', multiline: true }),
        landlordRepTitle: fields.text({ label: 'Landlord Rep Title' }),
        landlordRepDescription: fields.text({ label: 'Landlord Rep Description', multiline: true }),
        developmentTitle: fields.text({ label: 'Development Advisory Title' }),
        developmentDescription: fields.text({ label: 'Development Advisory Description', multiline: true }),
      },
    }),
    dataScience: singleton({
      label: 'Data Science Section',
      path: 'content/pages/data-science',
      schema: {
        heading: fields.text({ label: 'Section Heading' }),
        intro: fields.text({ label: 'Introduction', multiline: true }),
        proprietaryIntro: fields.text({ label: 'Proprietary Methods Intro', multiline: true }),
      },
    }),
    clientPortal: singleton({
      label: 'Client Portal',
      path: 'content/pages/client-portal',
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
      schema: {
        title: fields.slug({ name: { label: 'Headline' } }),
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
      schema: {
        title: fields.slug({ name: { label: 'Article Title' } }),
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
        verdict: fields.text({ label: 'Verdict', multiline: true, description: 'One sentence. The so-what for a real estate principal.' }),
        evidence: fields.text({ label: 'Evidence', multiline: true, description: 'Supporting paragraph. What the article actually found or reported.' }),
        frame: fields.text({ label: 'McDevitt Frame', multiline: true, description: 'Why it matters for the built environment. Spatial consequence or taste signal.' }),
        externalUrl: fields.url({ label: 'Article Link' }),
        order: fields.integer({ label: 'Display Order', defaultValue: 0 }),
      },
    }),
  },
});
