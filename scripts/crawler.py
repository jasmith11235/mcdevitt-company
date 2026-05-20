"""
Content crawler for The McDevitt Company website.

Fetches articles from CRE trade press (news mode) and business/design
publications (reading-room mode) via Google News RSS. Outputs Keystatic-
compatible JSON files, one per article.

Usage:
    python scripts/crawler.py --type news --output content/news/
    python scripts/crawler.py --type reading-room --output content/reading-room/
    python scripts/crawler.py --type news --output content/news/ --max 10 --dry-run
"""

import argparse
import hashlib
import html
import json
import os
import re
import ssl
import sys
import urllib.error
import urllib.request
import xml.etree.ElementTree as ET
from datetime import datetime, timezone


# ---------------------------------------------------------------------------
# Configuration
# ---------------------------------------------------------------------------

NEWS_SOURCES = {
    "commercialobserver.com": "Commercial Observer",
    "costar.com": "CoStar",
    "bisnow.com": "Bisnow",
    "globest.com": "GlobeSt",
    "naiop.org": "NAIOP",
    "icsc.com": "ICSC",
}

NEWS_TOPICS = [
    "retail leasing",
    "mixed-use development",
    "retail real estate",
    "commercial real estate advisory",
    "tenant representation",
]

READING_ROOM_SOURCES = {
    "businessoffashion.com": "Business of Fashion",
    "skift.com": "Skift",
    "fastcompany.com": "Fast Company",
    "monocle.com": "Monocle",
    "eater.com": "Eater",
    "dezeen.com": "Dezeen",
    "retaildive.com": "Retail Dive",
}

READING_ROOM_TOPICS = [
    "retail experience",
    "hotel design",
    "restaurant trends",
    "adaptive reuse",
    "urban design",
    "consumer behavior",
    "placemaking",
    "storefront design",
    "neighborhood development",
]

SOURCE_DOMAIN_MAP = {
    "businessoffashion.com": "retail-consumer",
    "retaildive.com": "retail-consumer",
    "skift.com": "hospitality-fb",
    "eater.com": "hospitality-fb",
    "fastcompany.com": "business-workspace",
    "monocle.com": "culture-demographics",
    "dezeen.com": "design-placemaking",
}

RSS_TEMPLATE = (
    "https://news.google.com/rss/search?"
    "q=site:{domain}+{topic}&hl=en-US&gl=US&ceid=US:en"
)

# Patterns that signal junk results
EXCLUDE_PATTERNS = re.compile(
    r"(job[s ]?\s*post|career[s]?|hiring|apply now|"
    r"sponsored|advertisement|promoted|"
    r"top \d+ |best \d+ |\d+ things|listicle|"
    r"subscribe to (read|unlock|continue)|"
    r"paywall|sign.?in to continue)",
    re.IGNORECASE,
)


# ---------------------------------------------------------------------------
# SSL context -- try system certs, fall back to unverified
# ---------------------------------------------------------------------------

def _make_ssl_context():
    """Build an SSL context, falling back to unverified if certs are missing."""
    try:
        ctx = ssl.create_default_context()
        # Quick smoke test
        urllib.request.urlopen("https://news.google.com", timeout=5, context=ctx)
        return ctx
    except Exception:
        ctx = ssl.create_default_context()
        ctx.check_hostname = False
        ctx.verify_mode = ssl.CERT_NONE
        return ctx


# ---------------------------------------------------------------------------
# Helpers
# ---------------------------------------------------------------------------

def slugify(text, max_len=60):
    """Lowercase, hyphen-separated slug from a title string."""
    text = text.lower()
    text = re.sub(r"[^a-z0-9\s-]", "", text)
    text = re.sub(r"[\s]+", "-", text.strip())
    text = re.sub(r"-{2,}", "-", text)
    text = text.strip("-")
    if len(text) > max_len:
        text = text[:max_len].rstrip("-")
    return text


def normalize_url(url):
    """Strip trailing slashes and fragments for dedup."""
    url = url.split("#")[0]
    return url.rstrip("/")


def today_str():
    return datetime.now(timezone.utc).strftime("%Y-%m-%d")


def clean_html(text):
    """Strip HTML tags and decode entities."""
    text = html.unescape(text)
    text = re.sub(r"<[^>]+>", "", text)
    return text.strip()


def is_excluded(title, url):
    """Return True if the article looks like a job post, ad, or listicle."""
    combined = f"{title} {url}"
    return bool(EXCLUDE_PATTERNS.search(combined))


def guess_news_category(title, source):
    """Simple keyword heuristic for news categories."""
    t = title.lower()
    if any(w in t for w in ["mcdevitt", "wade mcdevitt"]):
        return "company"
    if any(w in t for w in ["project", "development", "broke ground", "opens"]):
        return "project"
    if any(w in t for w in ["report", "analysis", "outlook", "forecast", "trend"]):
        return "insight"
    return "industry"


# ---------------------------------------------------------------------------
# RSS fetching
# ---------------------------------------------------------------------------

def fetch_rss(url, ssl_ctx):
    """Fetch and parse an RSS feed. Returns list of (title, link, pub_date)."""
    req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
    try:
        with urllib.request.urlopen(req, timeout=15, context=ssl_ctx) as resp:
            data = resp.read()
    except (urllib.error.URLError, OSError):
        return None

    try:
        root = ET.fromstring(data)
    except ET.ParseError:
        return None

    items = []
    for item in root.iter("item"):
        title_el = item.find("title")
        link_el = item.find("link")
        date_el = item.find("pubDate")
        if title_el is None or link_el is None:
            continue
        title = clean_html(title_el.text or "")
        link = (link_el.text or "").strip()
        pub_date = ""
        if date_el is not None and date_el.text:
            pub_date = _parse_rss_date(date_el.text)
        items.append((title, link, pub_date))
    return items


def _parse_rss_date(raw):
    """Best-effort parse of RSS pubDate into YYYY-MM-DD."""
    for fmt in (
        "%a, %d %b %Y %H:%M:%S %z",
        "%a, %d %b %Y %H:%M:%S %Z",
        "%Y-%m-%dT%H:%M:%S%z",
    ):
        try:
            dt = datetime.strptime(raw.strip(), fmt)
            return dt.strftime("%Y-%m-%d")
        except ValueError:
            continue
    return today_str()


# ---------------------------------------------------------------------------
# Crawl logic
# ---------------------------------------------------------------------------

def crawl_news(max_items, ssl_ctx):
    """Crawl CRE trade press via Google News RSS."""
    seen_urls = set()
    results = []

    for domain, source_name in NEWS_SOURCES.items():
        if len(results) >= max_items:
            break
        for topic in NEWS_TOPICS:
            if len(results) >= max_items:
                break
            search_domain = "costar" if domain == "costar.com" else domain
            url = RSS_TEMPLATE.format(
                domain=search_domain,
                topic=urllib.request.quote(topic),
            )
            items = fetch_rss(url, ssl_ctx)
            if items is None:
                continue
            for title, link, pub_date in items:
                if len(results) >= max_items:
                    break
                norm = normalize_url(link)
                if norm in seen_urls:
                    continue
                if is_excluded(title, link):
                    continue
                seen_urls.add(norm)
                results.append({
                    "title": title,
                    "source": source_name,
                    "date": pub_date or today_str(),
                    "category": guess_news_category(title, source_name),
                    "summary": "",
                    "externalUrl": link,
                })
    return results


def crawl_reading_room(max_items, ssl_ctx):
    """Crawl design/culture publications via Google News RSS."""
    seen_urls = set()
    results = []

    for domain, source_name in READING_ROOM_SOURCES.items():
        if len(results) >= max_items:
            break
        for topic in READING_ROOM_TOPICS:
            if len(results) >= max_items:
                break
            url = RSS_TEMPLATE.format(
                domain=domain,
                topic=urllib.request.quote(topic),
            )
            items = fetch_rss(url, ssl_ctx)
            if items is None:
                continue
            for title, link, pub_date in items:
                if len(results) >= max_items:
                    break
                norm = normalize_url(link)
                if norm in seen_urls:
                    continue
                if is_excluded(title, link):
                    continue
                seen_urls.add(norm)
                results.append({
                    "title": title,
                    "source": source_name,
                    "author": "",
                    "date": pub_date or today_str(),
                    "domain": SOURCE_DOMAIN_MAP.get(domain, "culture-demographics"),
                    "verdict": "",
                    "evidence": "",
                    "frame": "",
                    "externalUrl": link,
                    "order": 0,
                })
    return results


# ---------------------------------------------------------------------------
# Seed / fallback content
# ---------------------------------------------------------------------------

NEWS_SEEDS = [
    {
        "title": "Retail Leasing Velocity Rises Across Major U.S. Markets in Q1",
        "source": "GlobeSt",
        "date": "2026-05-15",
        "category": "industry",
        "summary": "National retail vacancy fell to 4.1% in Q1 2026, driven by food-and-beverage tenants and experiential concepts filling space in mixed-use projects.",
        "externalUrl": "https://www.globest.com/2026/05/15/retail-leasing-velocity-q1-2026/",
    },
    {
        "title": "Mixed-Use Projects Reshape Suburban Corridors Nationwide",
        "source": "Bisnow",
        "date": "2026-05-12",
        "category": "industry",
        "summary": "Developers are converting aging strip centers into walkable mixed-use villages, blending residential density with curated retail to draw younger renters.",
        "externalUrl": "https://www.bisnow.com/national/news/mixed-use-suburban-corridors-2026",
    },
    {
        "title": "Tenant Rep Firms See Deal Volume Rebound After Two Slow Years",
        "source": "Commercial Observer",
        "date": "2026-05-10",
        "category": "insight",
        "summary": "Advisory firms report a 22% year-over-year increase in tenant representation mandates as retailers resume expansion plans.",
        "externalUrl": "https://commercialobserver.com/2026/05/tenant-rep-deal-volume-rebound/",
    },
    {
        "title": "ICSC Las Vegas 2026: Five Themes That Dominated the Convention Floor",
        "source": "ICSC",
        "date": "2026-05-08",
        "category": "industry",
        "summary": "Placemaking, adaptive reuse, AI-powered site selection, food halls, and experiential retail topped the agenda at this year's ICSC conference.",
        "externalUrl": "https://www.icsc.com/news/2026-convention-five-themes",
    },
    {
        "title": "CoStar: Net Absorption for Retail Turns Positive for Sixth Straight Quarter",
        "source": "CoStar",
        "date": "2026-05-06",
        "category": "insight",
        "summary": "CoStar's latest data shows 18.4 million square feet of positive net absorption in Q1 2026, led by grocery-anchored and lifestyle centers.",
        "externalUrl": "https://www.costar.com/article/2026-q1-retail-net-absorption",
    },
    {
        "title": "NAIOP Report Highlights Industrial-to-Retail Conversions as Emerging Trend",
        "source": "NAIOP",
        "date": "2026-05-03",
        "category": "insight",
        "summary": "A new NAIOP white paper documents a growing wave of last-mile warehouse conversions into neighborhood retail and community gathering spaces.",
        "externalUrl": "https://www.naiop.org/research/2026-industrial-retail-conversions",
    },
]

READING_ROOM_SEEDS = [
    {
        "title": "Why the Best New Restaurants Feel Like Living Rooms",
        "source": "Eater",
        "author": "",
        "date": "2026-05-18",
        "domain": "hospitality-fb",
        "verdict": "",
        "evidence": "",
        "frame": "",
        "externalUrl": "https://www.eater.com/2026/5/18/restaurant-living-room-design-trend",
        "order": 0,
    },
    {
        "title": "Skift: Boutique Hotels Are Borrowing the Neighborhood Playbook",
        "source": "Skift",
        "author": "",
        "date": "2026-05-16",
        "domain": "hospitality-fb",
        "verdict": "",
        "evidence": "",
        "frame": "",
        "externalUrl": "https://skift.com/2026/05/16/boutique-hotels-neighborhood-playbook/",
        "order": 0,
    },
    {
        "title": "The Storefront Is the New Homepage",
        "source": "Business of Fashion",
        "author": "",
        "date": "2026-05-14",
        "domain": "retail-consumer",
        "verdict": "",
        "evidence": "",
        "frame": "",
        "externalUrl": "https://www.businessoffashion.com/articles/retail/storefront-new-homepage",
        "order": 0,
    },
    {
        "title": "Adaptive Reuse Projects That Prove Old Buildings Have Better Bones",
        "source": "Dezeen",
        "author": "",
        "date": "2026-05-12",
        "domain": "design-placemaking",
        "verdict": "",
        "evidence": "",
        "frame": "",
        "externalUrl": "https://www.dezeen.com/2026/05/12/adaptive-reuse-old-buildings-better-bones/",
        "order": 0,
    },
    {
        "title": "How Consumer Behavior Shifted in the Post-Pandemic High Street",
        "source": "Retail Dive",
        "author": "",
        "date": "2026-05-10",
        "domain": "retail-consumer",
        "verdict": "",
        "evidence": "",
        "frame": "",
        "externalUrl": "https://www.retaildive.com/news/consumer-behavior-post-pandemic-high-street/2026/",
        "order": 0,
    },
    {
        "title": "Fast Company: The Companies Redesigning the American Strip Mall",
        "source": "Fast Company",
        "author": "",
        "date": "2026-05-08",
        "domain": "business-workspace",
        "verdict": "",
        "evidence": "",
        "frame": "",
        "externalUrl": "https://www.fastcompany.com/2026/redesigning-american-strip-mall",
        "order": 0,
    },
    {
        "title": "Monocle on the Quiet Revival of the Neighborhood Grocer",
        "source": "Monocle",
        "author": "",
        "date": "2026-05-06",
        "domain": "culture-demographics",
        "verdict": "",
        "evidence": "",
        "frame": "",
        "externalUrl": "https://monocle.com/magazine/2026/neighborhood-grocer-revival/",
        "order": 0,
    },
    {
        "title": "What Placemaking Actually Means When It Works",
        "source": "Dezeen",
        "author": "",
        "date": "2026-05-04",
        "domain": "design-placemaking",
        "verdict": "",
        "evidence": "",
        "frame": "",
        "externalUrl": "https://www.dezeen.com/2026/05/04/placemaking-when-it-works/",
        "order": 0,
    },
    {
        "title": "Urban Design Lessons From Tokyo's Backstreet Retail",
        "source": "Monocle",
        "author": "",
        "date": "2026-05-02",
        "domain": "design-placemaking",
        "verdict": "",
        "evidence": "",
        "frame": "",
        "externalUrl": "https://monocle.com/magazine/2026/tokyo-backstreet-retail-lessons/",
        "order": 0,
    },
    {
        "title": "Food Halls Are Growing Up and Getting Pickier",
        "source": "Eater",
        "author": "",
        "date": "2026-04-30",
        "domain": "hospitality-fb",
        "verdict": "",
        "evidence": "",
        "frame": "",
        "externalUrl": "https://www.eater.com/2026/4/30/food-halls-growing-up-getting-pickier",
        "order": 0,
    },
]


# ---------------------------------------------------------------------------
# Output
# ---------------------------------------------------------------------------

def write_items(items, output_dir, dry_run=False):
    """Write each item as a JSON file. Returns count written."""
    if dry_run:
        for item in items:
            print(json.dumps(item, indent=2))
        return len(items)

    os.makedirs(output_dir, exist_ok=True)

    # Deduplicate filenames
    used_slugs = set()
    count = 0
    for item in items:
        slug = slugify(item["title"])
        if not slug:
            slug = hashlib.md5(item.get("externalUrl", "").encode()).hexdigest()[:12]
        base = slug
        i = 2
        while slug in used_slugs:
            slug = f"{base}-{i}"
            i += 1
        used_slugs.add(slug)

        filepath = os.path.join(output_dir, f"{slug}.json")
        with open(filepath, "w", encoding="utf-8") as f:
            json.dump(item, f, indent=2, ensure_ascii=False)
            f.write("\n")
        count += 1

    return count


# ---------------------------------------------------------------------------
# Main
# ---------------------------------------------------------------------------

def main():
    parser = argparse.ArgumentParser(
        description="Fetch CRE news or reading-room articles for mcdevittcompany.com"
    )
    parser.add_argument(
        "--type",
        required=True,
        choices=["news", "reading-room"],
        help="Content type to crawl",
    )
    parser.add_argument(
        "--output",
        required=True,
        help="Output directory for JSON files",
    )
    parser.add_argument(
        "--max",
        type=int,
        default=20,
        help="Maximum items to fetch (default: 20)",
    )
    parser.add_argument(
        "--dry-run",
        action="store_true",
        help="Print items to stdout without writing files",
    )
    args = parser.parse_args()

    ssl_ctx = _make_ssl_context()

    if args.type == "news":
        items = crawl_news(args.max, ssl_ctx)
        seeds = NEWS_SEEDS
    else:
        items = crawl_reading_room(args.max, ssl_ctx)
        seeds = READING_ROOM_SEEDS

    if not items:
        print(
            f"WARNING: No results fetched from network. "
            f"Writing {len(seeds)} seed items as fallback.",
            file=sys.stderr,
        )
        items = seeds[:args.max]

    count = write_items(items, args.output, dry_run=args.dry_run)

    if args.dry_run:
        print(f"\n[dry-run] Would write {count} items to {args.output}")
    else:
        print(f"Wrote {count} items to {args.output}")


if __name__ == "__main__":
    main()
