import fs from 'fs';
import path from 'path';

const ROOT = process.cwd();

/**
 * Localized content lives under `content/i18n/<locale>/...` and mirrors the
 * structure of the base (English) content under `content/...`. Any file that
 * hasn't been translated yet automatically falls back to the base file, so the
 * site is fully functional with partial translations.
 */
function resolvePath(relativePath: string, locale?: string): string | null {
  if (locale) {
    const localized = path.join(ROOT, 'content', 'i18n', locale, relativePath);
    if (fs.existsSync(localized)) return localized;
  }
  const base = path.join(ROOT, 'content', relativePath);
  return fs.existsSync(base) ? base : null;
}

function readJson(relativePath: string, locale?: string) {
  const fullPath = resolvePath(relativePath, locale);
  if (!fullPath) return null;
  return JSON.parse(fs.readFileSync(fullPath, 'utf-8'));
}

function readFile(fullPath: string) {
  return JSON.parse(fs.readFileSync(fullPath, 'utf-8'));
}

/**
 * Reads every entry in a collection directory, preferring a localized override
 * file (same slug) when one exists for the requested locale.
 */
function readCollection(dir: string, locale?: string) {
  const baseDir = path.join(ROOT, dir);
  if (!fs.existsSync(baseDir)) return [];
  const localizedDir = locale ? path.join(ROOT, 'content', 'i18n', locale, dir.replace(/^content\//, '')) : null;

  return fs.readdirSync(baseDir)
    .filter(f => f.endsWith('.json'))
    .map(f => {
      const localizedFile = localizedDir ? path.join(localizedDir, f) : null;
      const source = localizedFile && fs.existsSync(localizedFile)
        ? localizedFile
        : path.join(baseDir, f);
      return {
        slug: f.replace('.json', ''),
        ...readFile(source),
      };
    });
}

export function getHero(locale?: string) { return readJson('pages/hero.json', locale); }
export function getAbout(locale?: string) { return readJson('pages/about.json', locale); }
export function getServices(locale?: string) { return readJson('pages/services.json', locale); }
export function getDataScience(locale?: string) { return readJson('pages/data-science.json', locale); }
export function getClientPortal(locale?: string) { return readJson('pages/client-portal.json', locale); }
export function getContact(locale?: string) { return readJson('pages/contact.json', locale); }
export function getCapitalMarkets(locale?: string) { return readJson('pages/capital-markets.json', locale); }

/**
 * Deep practice pages that share the generalized magazine-spread template.
 * Capital Markets has its own bespoke page/route and is intentionally not here.
 */
export const PRACTICE_SLUGS = ['tenants', 'landlords', 'development'] as const;
export type PracticeSlug = (typeof PRACTICE_SLUGS)[number];

export function isPracticeSlug(slug: string): slug is PracticeSlug {
  return (PRACTICE_SLUGS as readonly string[]).includes(slug);
}

export function getPractice(slug: string, locale?: string) {
  if (!isPracticeSlug(slug)) return null;
  return readJson(`pages/practice-${slug}.json`, locale);
}

export function getTestimonials(locale?: string) {
  return readCollection('content/testimonials', locale)
    .sort((a: any, b: any) => (a.order || 0) - (b.order || 0));
}

export function getProjects(locale?: string) {
  return readCollection('content/projects', locale)
    .sort((a: any, b: any) => (a.order || 0) - (b.order || 0));
}

export function getOffices(locale?: string) {
  return readCollection('content/offices', locale)
    .sort((a: any, b: any) => (a.order || 0) - (b.order || 0));
}

/**
 * Approval gate: crawler-collected items are written as drafts. Only entries
 * explicitly marked `status: "published"` are served to the public site, so
 * nothing the crawler pulls goes live without a human sign-off in Keystatic.
 */
function isPublished(item: any) {
  return item.status === 'published';
}

export function getNews(locale?: string) {
  return readCollection('content/news', locale)
    .filter(isPublished)
    .sort((a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getReadingRoom(locale?: string) {
  return readCollection('content/reading-room', locale)
    .filter(isPublished)
    .sort((a: any, b: any) => (a.order || 0) - (b.order || 0));
}
