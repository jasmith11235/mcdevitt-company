"""
Reading Room feed crawler for The McDevitt Company.

Feed-first, auto-publishing curation of retail / hospitality / F&B / placemaking
stories from a whitelist of publisher RSS feeds. No editorial authorship: the
taste lives in the source list and the keyword filter.

    python scripts/reading_room_feeds.py --output content/reading-room/
    python scripts/reading_room_feeds.py --dry-run
    python scripts/reading_room_feeds.py --dry-run --show-excluded

Kill switch: set READING_ROOM_ENABLED=0 (or --off) to make a run a no-op.
"""

import argparse
import hashlib
import html
import json
import os
import re
import ssl
import sys
import time
import urllib.error
import urllib.request
import xml.etree.ElementTree as ET
from datetime import datetime, timezone, timedelta

ATOM = "{http://www.w3.org/2005/Atom}"
CONTENT_NS = "{http://purl.org/rss/1.0/modules/content/}encoded"
DC_DATE = "{http://purl.org/dc/elements/1.1/}date"

UA = (
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 "
    "(KHTML, like Gecko) Chrome/120.0 Safari/537.36"
)

# Each source maps to a Reading Room domain (used by the on-site filter) and may
# carry a required RSS <category> the item must match (Skift is whole-site).
SOURCES = [
    {"name": "Monocle", "url": "https://monocle.com/feed/", "domain": "culture-demographics"},
    {"name": "WWD", "url": "https://wwd.com/business-news/feed/", "domain": "retail-consumer"},
    {"name": "Business of Fashion", "url": "https://www.businessoffashion.com/arc/outboundfeeds/rss/", "domain": "retail-consumer"},
    {"name": "Skift", "url": "https://skift.com/feed/", "domain": "hospitality-fb", "require_category": "Hotels"},
    {"name": "Eater", "url": "https://www.eater.com/rss/index.xml", "domain": "hospitality-fb"},
    {"name": "Eater Houston", "url": "https://houston.eater.com/rss/index.xml", "domain": "hospitality-fb"},
    {"name": "Eater LA", "url": "https://la.eater.com/rss/index.xml", "domain": "hospitality-fb"},
    {"name": "Eater NY", "url": "https://ny.eater.com/rss/index.xml", "domain": "hospitality-fb"},
    {"name": "Fast Company", "url": "https://www.fastcompany.com/co-design/rss", "domain": "design-placemaking"},
    {"name": "Dezeen", "url": "https://www.dezeen.com/interiors/feed/", "domain": "design-placemaking"},
    {"name": "Wallpaper*", "url": "https://www.wallpaper.com/feeds.xml", "domain": "design-placemaking"},
    {"name": "Hospitality Design", "url": "https://hospitalitydesign.com/feed/", "domain": "hospitality-fb"},
    {"name": "Sprudge", "url": "https://sprudge.com/feed/", "domain": "hospitality-fb"},
    {"name": "Retail Dive", "url": "https://www.retaildive.com/feeds/news/", "domain": "retail-consumer"},
    {"name": "Modern Retail", "url": "https://www.modernretail.co/feed/", "domain": "retail-consumer"},
    {"name": "Glossy", "url": "https://www.glossy.co/feed/", "domain": "retail-consumer"},
]

INCLUDE_KEYWORDS = [
    "store", "shop", "flagship", "storefront", "boutique", "retail", "retailer",
    "brick-and-mortar", "restaurant", "restaurateur", "cafe", "café", "coffee shop",
    "bakery", "bar", "wine bar", "food hall", "food and beverage", "hotel", "hotelier",
    "resort", "hospitality", "pop-up", "popup", "opening", "opens", "reopens", "reopening",
    "grand opening", "debut", "debuts", "outpost", "first location",
    "new location", "first store", "expansion", "expands", "lease", "leases",
    "high street", "main street", "neighborhood", "showroom", "studio",
    "concept store", "concept", "placemaking", "mall", "shopping center",
    "tasting room", "brewery", "distillery", "chef", "dtc", "direct-to-consumer",
]

EXCLUDE_KEYWORDS = [
    "earnings", "quarterly", "ipo", "stock", "funding", "layoffs", "appoints", "hires", "ceo",
    "airline", "cruise", "flight", "recipe", "review", "streaming", "crypto", "cap rate",
    "reit", "mortgage", "tariff", "election",
    "loyalty", "credit card", "short-term rental", "ota", "podcast", "newsletter",
    "briefing", "webinar", "sponsored", "partner content", "ai", "artificial intelligence",
    "lawsuit", "trademark", "bankruptcy", "acquisition", "merger", "go-private",
    "resigns", "steps down", "back-to-school", "black friday", "cyber monday",
    "supply chain", "logistics", "revpar", "world cup",
]


def _compile(keywords):
    return [(kw, re.compile(r"(?<!\w)" + re.escape(kw) + r"(?!\w)", re.IGNORECASE)) for kw in keywords]


INCLUDE_RE = _compile(INCLUDE_KEYWORDS)
EXCLUDE_RE = _compile(EXCLUDE_KEYWORDS)

# City detection for the Market filter. Values match lib/markets.ts. Ambiguous
# names are constrained (Greenwich requires a CT qualifier; London excludes
# "New London") to keep false positives low.
MARKET_PATTERNS = [
    ("amsterdam", re.compile(r"\bAmsterdam\b", re.I)),
    ("chicago", re.compile(r"\bChicago\b", re.I)),
    ("greenwich", re.compile(r"\bGreenwich,?\s+(?:CT|Conn\.?|Connecticut)\b", re.I)),
    ("london", re.compile(r"(?<!new )\bLondon\b", re.I)),
    ("los-angeles", re.compile(r"\bLos Angeles\b|\bL\.A\.\b", re.I)),
    ("nashville", re.compile(r"\bNashville\b", re.I)),
    ("philadelphia", re.compile(r"\bPhiladelphia\b|\bPhilly\b", re.I)),
    ("west-palm-beach", re.compile(r"\bWest Palm Beach\b|\bPalm Beach\b", re.I)),
]
SOURCE_MARKET = {"Eater LA": "los-angeles"}


def detect_markets(text, source):
    found = {m for m, rx in MARKET_PATTERNS if rx.search(text)}
    if source in SOURCE_MARKET:
        found.add(SOURCE_MARKET[source])
    return sorted(found)


def make_ssl_context():
    ctx = ssl.create_default_context()
    try:
        urllib.request.urlopen("https://monocle.com", timeout=8, context=ctx)
        return ctx
    except Exception:
        ctx.check_hostname = False
        ctx.verify_mode = ssl.CERT_NONE
        return ctx


def clean(text):
    if not text:
        return ""
    text = html.unescape(text)
    text = re.sub(r"<[^>]+>", "", text)
    return re.sub(r"\s+", " ", text).strip()


def slugify(text, max_len=60):
    text = text.lower()
    text = re.sub(r"[^a-z0-9\s-]", "", text)
    text = re.sub(r"\s+", "-", text.strip())
    text = re.sub(r"-{2,}", "-", text).strip("-")
    return text[:max_len].rstrip("-")


def normalize_url(url):
    return (url or "").split("?")[0].split("#")[0].rstrip("/")


def parse_date(raw):
    if not raw:
        return None
    raw = raw.strip()
    for fmt in ("%a, %d %b %Y %H:%M:%S %z", "%a, %d %b %Y %H:%M:%S %Z",
                "%Y-%m-%dT%H:%M:%S%z", "%Y-%m-%dT%H:%M:%SZ", "%Y-%m-%d"):
        try:
            dt = datetime.strptime(raw, fmt)
            if dt.tzinfo is None:
                dt = dt.replace(tzinfo=timezone.utc)
            return dt
        except ValueError:
            continue
    return None


def _text(el, *tags):
    for t in tags:
        found = el.find(t)
        if found is not None and (found.text or "").strip():
            return found.text.strip()
    return ""


def fetch(url, ctx, retries=2):
    req = urllib.request.Request(url, headers={
        "User-Agent": UA,
        "Accept": "application/rss+xml, application/atom+xml, application/xml, text/xml, */*",
    })
    last = None
    for attempt in range(retries + 1):
        try:
            with urllib.request.urlopen(req, timeout=25, context=ctx) as r:
                return r.read()
        except Exception as e:
            last = e
            if attempt < retries:
                time.sleep(2 * (attempt + 1))
    raise last


def parse_feed(data):
    data = data.lstrip(b"\xef\xbb\xbf").lstrip()
    root = ET.fromstring(data)
    entries = list(root.iter("item")) or list(root.iter(ATOM + "entry"))
    items = []
    for e in entries:
        title = clean(_text(e, "title", ATOM + "title"))
        link = _text(e, "link")
        if not link:
            link_el = e.find(ATOM + "link")
            link = link_el.get("href") if link_el is not None else ""
        summary = clean(_text(e, "description", CONTENT_NS, ATOM + "summary", ATOM + "content"))
        date = parse_date(_text(e, "pubDate", ATOM + "published", ATOM + "updated", DC_DATE))
        cats = [c.text.strip() for c in e.iter("category") if c is not None and c.text]
        cats += [c.get("term") for c in e.iter(ATOM + "category") if c.get("term")]
        if title and link:
            items.append({"title": title, "link": link.strip(), "summary": summary, "date": date, "cats": cats})
    return items


def match(text):
    inc = [kw for kw, rx in INCLUDE_RE if rx.search(text)]
    exc = [kw for kw, rx in EXCLUDE_RE if rx.search(text)]
    return inc, exc


def crawl(ctx, per_source_cap, window_days, show_excluded=False):
    cutoff = datetime.now(timezone.utc) - timedelta(days=window_days)
    kept, seen = [], set()
    stats = {}
    for src in SOURCES:
        name = src["name"]
        try:
            items = parse_feed(fetch(src["url"], ctx))
        except Exception as e:
            stats[name] = f"FETCH ERROR ({type(e).__name__})"
            continue
        req_cat = src.get("require_category")
        take, scanned = 0, 0
        for it in items:
            scanned += 1
            if req_cat and req_cat not in it["cats"]:
                continue
            if it["date"] and it["date"] < cutoff:
                continue
            inc, exc = match(f"{it['title']} {it['summary']}")
            if not inc or exc:
                if show_excluded and req_cat is None:
                    reason = "no-include" if not inc else f"excluded:{exc}"
                    print(f"   ✗ [{name}] {it['title'][:70]}  ({reason})")
                continue
            norm = normalize_url(it["link"])
            if norm in seen:
                continue
            seen.add(norm)
            kept.append({
                "title": it["title"],
                "status": "published",
                "source": name,
                "author": "",
                "date": (it["date"] or datetime.now(timezone.utc)).strftime("%Y-%m-%d"),
                "domain": src["domain"],
                "markets": detect_markets(f"{it['title']} {it['summary']}", name),
                "verdict": "",
                "evidence": "",
                "frame": "",
                "externalUrl": it["link"],
                "_sortdate": it["date"] or cutoff,
                "_matched": inc,
            })
            take += 1
            if take >= per_source_cap:
                break
        stats[name] = f"{take} kept / {scanned} scanned"
    kept.sort(key=lambda x: x["_sortdate"], reverse=True)
    return kept, stats


def write_items(items, output_dir, overall_cap):
    os.makedirs(output_dir, exist_ok=True)
    for f in os.listdir(output_dir):
        if f.endswith(".json"):
            os.remove(os.path.join(output_dir, f))
    used, count = set(), 0
    for order, item in enumerate(items[:overall_cap], start=1):
        slug = slugify(item["title"]) or hashlib.md5(item["externalUrl"].encode()).hexdigest()[:12]
        base, i = slug, 2
        while slug in used:
            slug, i = f"{base}-{i}", i + 1
        used.add(slug)
        record = {k: v for k, v in item.items() if not k.startswith("_")}
        record["order"] = order
        with open(os.path.join(output_dir, f"{slug}.json"), "w", encoding="utf-8") as fh:
            json.dump(record, fh, ensure_ascii=False, indent=2)
            fh.write("\n")
        count += 1
    return count


def main():
    ap = argparse.ArgumentParser(description="Feed-first Reading Room crawler")
    ap.add_argument("--output", default="content/reading-room/")
    ap.add_argument("--dry-run", action="store_true")
    ap.add_argument("--show-excluded", action="store_true")
    ap.add_argument("--off", action="store_true", help="kill switch")
    ap.add_argument("--per-source", type=int, default=6)
    ap.add_argument("--cap", type=int, default=40, help="max total published items")
    ap.add_argument("--window-days", type=int, default=45)
    args = ap.parse_args()

    if args.off or os.environ.get("READING_ROOM_ENABLED") == "0":
        print("Reading Room crawler is disabled (kill switch). No-op.")
        return

    ctx = make_ssl_context()
    items, stats = crawl(ctx, args.per_source, args.window_days, args.show_excluded)

    print("\n--- per-source ---")
    for name, s in stats.items():
        print(f"  {name:22} {s}")
    print(f"\nTotal kept (pre-cap): {len(items)}  |  cap: {args.cap}")

    if args.dry_run:
        print("\n--- would publish (most recent first) ---")
        for it in items[:args.cap]:
            print(f"  [{it['date']}] {it['source']:18} {it['title'][:66]}")
            print(f"       ↳ match: {it['_matched'][:6]}")
        print(f"\n[dry-run] {min(len(items), args.cap)} items would be written to {args.output}")
        return

    n = write_items(items, args.output, args.cap)
    print(f"\nWrote {n} published items to {args.output}")


if __name__ == "__main__":
    main()
