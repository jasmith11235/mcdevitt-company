import fs from 'fs';
import path from 'path';

function readJson(filePath: string) {
  const fullPath = path.join(process.cwd(), filePath);
  if (!fs.existsSync(fullPath)) return null;
  return JSON.parse(fs.readFileSync(fullPath, 'utf-8'));
}

function readCollection(dir: string) {
  const fullDir = path.join(process.cwd(), dir);
  if (!fs.existsSync(fullDir)) return [];
  return fs.readdirSync(fullDir)
    .filter(f => f.endsWith('.json'))
    .map(f => ({
      slug: f.replace('.json', ''),
      ...JSON.parse(fs.readFileSync(path.join(fullDir, f), 'utf-8')),
    }))
    .sort((a: any, b: any) => (a.order || 0) - (b.order || 0));
}

export function getHero() { return readJson('content/pages/hero.json'); }
export function getAbout() { return readJson('content/pages/about.json'); }
export function getServices() { return readJson('content/pages/services.json'); }
export function getDataScience() { return readJson('content/pages/data-science.json'); }
export function getClientPortal() { return readJson('content/pages/client-portal.json'); }
export function getTestimonials() { return readCollection('content/testimonials'); }
export function getProjects() { return readCollection('content/projects'); }
export function getOffices() { return readCollection('content/offices'); }
export function getNews() {
  const fullDir = path.join(process.cwd(), 'content/news');
  if (!fs.existsSync(fullDir)) return [];
  return fs.readdirSync(fullDir)
    .filter(f => f.endsWith('.json'))
    .map(f => ({
      slug: f.replace('.json', ''),
      ...JSON.parse(fs.readFileSync(path.join(fullDir, f), 'utf-8')),
    }))
    .sort((a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getReadingRoom() {
  const fullDir = path.join(process.cwd(), 'content/reading-room');
  if (!fs.existsSync(fullDir)) return [];
  return fs.readdirSync(fullDir)
    .filter(f => f.endsWith('.json'))
    .map(f => ({
      slug: f.replace('.json', ''),
      ...JSON.parse(fs.readFileSync(path.join(fullDir, f), 'utf-8')),
    }))
    .sort((a: any, b: any) => (a.order || 0) - (b.order || 0));
}
