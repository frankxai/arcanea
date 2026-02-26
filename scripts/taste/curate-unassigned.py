"""
TASTE Curation Script for Arcanea Media Library
================================================
Auto-assigns Guardians to unassigned media entries using filename/scene pattern matching,
then applies a 5-dimension TASTE score and generates a hero image shortlist.

Idempotent: safe to run multiple times.
"""

import json
import os
import re
from collections import defaultdict

# ── Paths ──────────────────────────────────────────────────────────────────────
MANIFEST_PATH = r"C:\Users\frank\arcanea-manifest.json"
SHORTLIST_PATH = r"C:\Users\frank\Arcanea\scripts\taste\hero-shortlist.json"

# ── Canon: Guardian metadata ───────────────────────────────────────────────────
GUARDIAN_META = {
    "Draconia":   {"gate": "Fire",       "element": "Fire",       "frequency_hz": 396},
    "Leyla":      {"gate": "Flow",       "element": "Water",      "frequency_hz": 285},
    "Lyssandria": {"gate": "Foundation", "element": "Earth",      "frequency_hz": 174},
    "Maylinn":    {"gate": "Heart",      "element": "Wind",       "frequency_hz": 417},
    "Alera":      {"gate": "Voice",      "element": "Void",       "frequency_hz": 528},
    "Lyria":      {"gate": "Sight",      "element": "Spirit",     "frequency_hz": 639},
    "Aiyami":     {"gate": "Crown",      "element": "Spirit",     "frequency_hz": 741},
    "Elara":      {"gate": "Shift",      "element": "Earth",      "frequency_hz": 852},
    "Ino":        {"gate": "Unity",      "element": "Void",       "frequency_hz": 963},
    "Shinkami":   {"gate": "Source",     "element": "Spirit",     "frequency_hz": 1111},
}

# ── Pattern rules (evaluated in order; first match wins) ──────────────────────
# Each rule: (guardian_or_None, tag_or_None, keyword_list)
# None guardian = keep Unassigned but add lore tag
PATTERN_RULES = [
    # ── Lore override (check before Guardians so lumina/nero don't bleed into others)
    (None, "lore", [
        "lumina", "nero", "dark-lord", "malachar", "academy",
        "dark lord", "order of lumina", "malachar lumenbright",
    ]),

    # ── Draconia  (Fire/Power/Will)
    ("Draconia", None, [
        "draconia", "dragon", "draconis", "draconic",
        "fire", "flame", "blazing", "inferno", "volcanic",
        "teacher dragon", "dragon rider", "creator dragon",
        "arcanean dragon", "arcanean creator dragon",
        "corrupted cyber dragon", "sky serpent drag",
        "dragon goddess",
    ]),

    # ── Leyla  (Flow/Water/Creativity)
    ("Leyla", None, [
        "leyla", "veloura",
        "water", "ocean", "wave", "aqua",
        "moon", "lunar", "flow", "atlantia",
        "aquarion", "futuristic oceanic",
    ]),

    # ── Lyssandria  (Foundation/Earth/Survival)
    ("Lyssandria", None, [
        "lyssandria", "kaelith",
        "earth", "mountain", "stone",
        "cave", "forest", "tree goddess",
        "vibrant tree goddess", "vibrant full body tree goddess",
        "vibrant full female body tree goddess",
        "vibrant full wooden female body tree goddess",
    ]),

    # ── Maylinn  (Heart/Wind/Love/Healing)
    ("Maylinn", None, [
        "maylinn", "laeylinn",
        "heart", "love", "heal", "healing",
        "rose", "pink", "flower",
        "butterfly",                             # Maylinn's Elara overlap — check before Elara
        "a legendary arcanean healer",
        "healing sanctuary",
        "consciousness restoration",
    ]),

    # ── Alera  (Voice/Truth/Expression/Sound)
    ("Alera", None, [
        "alera", "otome",
        "voice", "sound", "singing", "music",
        "musical spirit animal", "arcanea vibes",
        "democratizing music", "suno",
        "goddess rockstar", "rockstar",
        "video ready epic rockstar",
    ]),

    # ── Lyria  (Sight/Intuition/Vision)
    ("Lyria", None, [
        "lyria", "yumiko",
        "violet", "purple", "eye",
        "vision", "oracle", "third-eye", "third eye",
        "arcanea starlight in our minds",
        "heterochromia",
    ]),

    # ── Aiyami  (Crown/Enlightenment/Gold/White)
    ("Aiyami", None, [
        "aiyami", "sol",
        "crown", "lotus", "enlighten", "divine",
        "celestial", "dawn bringer", "radiant figure",
        "cosmic queen",
        "quantum consciousness",
        "order of lumina",                        # also lore, but Aiyami-aligned if not caught above
        "agentic ai architecture",
        "starlight intelligence",
        "consciousness restoration ritual",
        "arcanea radiant awakening",
    ]),

    # ── Elara  (Shift/Transform/Emerald/Green)
    ("Elara", None, [
        "elara", "vaelith",
        "green", "emerald",
        "shift", "transform",
        "butterfly spirit",
        "a legendary arcanean hunter",
        "a legendary hunter",
        "a legendary magician",
        "a legendary necromancer",
        "a legendary summoner",
    ]),

    # ── Ino  (Unity/Partnership/Teal-Pink/Dual)
    ("Ino", None, [
        "ino", "kyuro",
        "unity", "partnership", "dual",
        "teal-pink", "teal pink",
        "family intelligence",
        "cultural integration",
        "unified arcanean civilization",
        "trinity",
        "imagine a charismatic pair",
        "imagine a striking pair",
        "two beautiful blonde women",
        "two women",
        "codex of collaboration",
    ]),

    # ── Shinkami  (Source/Meta/Cosmic/Galaxy)
    ("Shinkami", None, [
        "shinkami", "amaterasu",
        "source", "cosmic", "galaxy", "universe", "infinite",
        "prism", "all-seeing",
        "starlight intelligence systems",
        "consciousness networks spanning",
        "mamoru", "starlight wolf",
        "mind body soul",
        "creator intelligence systems",
        "framework systems",
        "next generation",
        "arcanean codex",
        "arcanean floating islands",
        "futuristic cityscape of arcanea",
        "cinematic scene of arcanea",
        "arcanea in 2025",
    ]),
]

# ── Emotional-impact keywords for TASTE scoring ──────────────────────────────
HIGH_IMPACT_WORDS = {
    "divine", "epic", "celestial", "cosmic", "goddess", "legendary",
    "arcanean", "arcanea", "guardian", "mythic", "radiant", "vibrant",
    "ascended", "transcendent", "enlighten", "shimmer", "ancient",
    "dragon", "warrior", "trinity", "sovereign", "glowing", "majestic",
    "infinite", "sacred", "primal", "awakening", "draconia", "alera",
    "lyria", "elara", "ino", "shinkami", "maylinn", "leyla", "lyssandria",
    "aiyami",
}
GENERIC_WORDS = {
    "image", "generated", "video", "grok", "download", "output",
    "tmp", "replicate", "prediction", "social", "frankx", "frankx77",
    "frame", "cover", "art",
}


# ── Helper: build a single searchable text blob from an entry ─────────────────
def _search_text(entry: dict) -> str:
    parts = [
        entry.get("original_name", ""),
        entry.get("suggested_name", ""),
        entry.get("scene", ""),
        entry.get("folder", ""),
        entry.get("notes", ""),
    ]
    return " ".join(p for p in parts if p).lower()


# ── Guardian assignment ───────────────────────────────────────────────────────
def assign_guardian(entry: dict) -> tuple[str | None, str | None]:
    """
    Returns (guardian_name_or_None, extra_tag_or_None).
    None guardian means keep as Unassigned.
    """
    text = _search_text(entry)
    for guardian, tag, keywords in PATTERN_RULES:
        for kw in keywords:
            # Whole-word or substring match (case-insensitive already lowered)
            if kw in text:
                return guardian, tag
    return None, None


# ── TASTE scoring ─────────────────────────────────────────────────────────────
def taste_score(entry: dict, all_suggested_names: list[str]) -> int:
    """
    5 dimensions → weighted sum → 0-100 integer.

    1. Canon Alignment    25 %
    2. Design Compliance  15 %
    3. Emotional Impact   20 %
    4. Technical Fit      15 %
    5. Uniqueness         25 %   (weights tweaked to sum to 100)
    """

    # 1. Canon Alignment (0-100)
    guardian = entry.get("guardian")
    if guardian and guardian != "Unassigned":
        canon = 100
    else:
        # Has a lore tag? partial credit
        tags = entry.get("tags", [])
        canon = 40 if "lore" in tags else 10

    # 2. Design Compliance (0-100)
    webp = entry.get("webp_path") or ""
    design = 100 if webp else 0

    # 3. Emotional Impact (0-100)
    text = _search_text(entry)
    words = set(re.findall(r"[a-z]+", text))
    high_hits = len(words & HIGH_IMPACT_WORDS)
    generic_hits = len(words & GENERIC_WORDS)
    if high_hits >= 5:
        emotional = 90
    elif high_hits >= 3:
        emotional = 75
    elif high_hits >= 2:
        emotional = 60
    elif high_hits == 1:
        emotional = 45
    elif generic_hits >= 3:
        emotional = 15
    else:
        emotional = 30

    # Bonus for "epic", "divine", "celestial" in scene description
    scene_lower = (entry.get("scene") or "").lower()
    for word in ("epic", "divine", "celestial", "legendary", "ascended"):
        if word in scene_lower:
            emotional = min(100, emotional + 10)
            break

    # 4. Technical Fit (0-100)
    thumb = entry.get("thumbnail_path") or ""
    if webp and thumb:
        technical = 100
    elif webp:
        technical = 80
    elif thumb:
        technical = 40
    else:
        technical = 0

    # 5. Uniqueness (0-100)
    # Entries with duplicate_of set are clearly duplicates
    if entry.get("duplicate_of"):
        uniqueness = 20
    else:
        # Count how many entries share the same base suggested name stem
        suggested = entry.get("suggested_name") or ""
        # Strip the trailing -NNN counter (e.g. -001, -002)
        stem = re.sub(r"-\d{3}\.webp$", "", suggested.lower())
        if stem:
            clones = sum(1 for n in all_suggested_names
                         if re.sub(r"-\d{3}\.webp$", "", n.lower()) == stem)
            if clones <= 1:
                uniqueness = 100
            elif clones <= 3:
                uniqueness = 70
            elif clones <= 6:
                uniqueness = 50
            else:
                uniqueness = 25
        else:
            uniqueness = 50

    # Weighted sum
    score = (
        canon     * 0.25 +
        design    * 0.15 +
        emotional * 0.20 +
        technical * 0.15 +
        uniqueness * 0.25
    )
    return round(score)


def score_to_tier(score: int) -> str:
    if score >= 80:
        return "hero"
    elif score >= 60:
        return "gallery"
    elif score >= 40:
        return "thumbnail"
    else:
        return "archive"


# ── Main ──────────────────────────────────────────────────────────────────────
def main():
    print(f"Reading manifest: {MANIFEST_PATH}")
    with open(MANIFEST_PATH, encoding="utf-8-sig") as f:
        data = json.load(f)

    media: list[dict] = data.get("media", [])
    print(f"Total entries: {len(media)}")

    # Pre-collect all suggested names for uniqueness scoring
    all_suggested = [m.get("suggested_name") or "" for m in media]

    # ── Pass 1: Guardian assignment for entries with no guardian ─────────────
    assigned_counts: dict[str, int] = defaultdict(int)
    newly_assigned = 0
    lore_tagged = 0

    for entry in media:
        if entry.get("guardian") and entry["guardian"] != "Unassigned":
            # Already assigned — skip reassignment
            pass
        else:
            guardian, extra_tag = assign_guardian(entry)
            if guardian is not None:
                entry["guardian"] = guardian
                # Copy canon metadata into entry
                meta = GUARDIAN_META[guardian]
                entry["gate"] = meta["gate"]
                entry["element"] = meta["element"]
                entry["frequency_hz"] = meta["frequency_hz"]
                assigned_counts[guardian] += 1
                newly_assigned += 1
            else:
                # Keep as Unassigned (or None → normalise to "Unassigned")
                entry["guardian"] = "Unassigned"
                if extra_tag and extra_tag not in (entry.get("tags") or []):
                    if not isinstance(entry.get("tags"), list):
                        entry["tags"] = []
                    entry["tags"].append(extra_tag)
                    lore_tagged += 1

    # ── Pass 2: TASTE scoring for all entries ────────────────────────────────
    tier_counts: dict[str, int] = defaultdict(int)
    for entry in media:
        score = taste_score(entry, all_suggested)
        tier = score_to_tier(score)
        entry["taste_score"] = score
        entry["tier"] = tier
        # Also back-fill quality_tier if still None
        if not entry.get("quality_tier"):
            entry["quality_tier"] = tier
        tier_counts[tier] += 1

    # ── Update manifest top-level summary ────────────────────────────────────
    guardian_summary: dict[str, int] = defaultdict(int)
    for entry in media:
        guardian_summary[entry.get("guardian") or "Unassigned"] += 1
    data["by_guardian"] = dict(guardian_summary)

    # ── Save manifest ────────────────────────────────────────────────────────
    print(f"Saving manifest: {MANIFEST_PATH}")
    with open(MANIFEST_PATH, "w", encoding="utf-8") as f:
        json.dump(data, f, indent=2, ensure_ascii=False)

    # ── Hero shortlist: top 5 hero-tier images per Guardian ──────────────────
    hero_entries: dict[str, list[dict]] = defaultdict(list)
    for entry in media:
        g = entry.get("guardian")
        if not g or g == "Unassigned":
            continue
        if entry.get("tier") == "hero" and entry.get("type") == "image":
            hero_entries[g].append({
                "id": entry.get("id"),
                "path": entry.get("webp_path") or entry.get("original_path"),
                "original_name": entry.get("original_name"),
                "score": entry.get("taste_score"),
                "scene": entry.get("scene", ""),
            })

    shortlist: dict[str, list] = {}
    for g in sorted(GUARDIAN_META.keys()):
        entries = hero_entries.get(g, [])
        entries_sorted = sorted(entries, key=lambda x: x["score"], reverse=True)
        shortlist[g] = entries_sorted[:5]

    shortlist_dir = os.path.dirname(SHORTLIST_PATH)
    os.makedirs(shortlist_dir, exist_ok=True)
    with open(SHORTLIST_PATH, "w", encoding="utf-8") as f:
        json.dump(shortlist, f, indent=2, ensure_ascii=False)

    # ── Print summary ─────────────────────────────────────────────────────────
    still_unassigned = guardian_summary.get("Unassigned", 0)

    print()
    print("=" * 50)
    print("=== CURATION COMPLETE ===")
    print("=" * 50)
    print(f"Auto-assigned: {newly_assigned} files")
    for g in sorted(GUARDIAN_META.keys()):
        count = assigned_counts.get(g, 0)
        if count:
            meta = GUARDIAN_META[g]
            print(f"  {g}: {count}  (Gate: {meta['gate']}, {meta['frequency_hz']} Hz)")
    if lore_tagged:
        print(f"  Lore-tagged (kept Unassigned): {lore_tagged}")
    print(f"Still unassigned: {still_unassigned}")
    print()
    print("TASTE Scoring:")
    print(f"  Hero     (80-100): {tier_counts.get('hero', 0)} files")
    print(f"  Gallery  (60-79):  {tier_counts.get('gallery', 0)} files")
    print(f"  Thumbnail(40-59):  {tier_counts.get('thumbnail', 0)} files")
    print(f"  Archive  (<40):    {tier_counts.get('archive', 0)} files")
    print()
    print(f"Manifest saved to:  {MANIFEST_PATH}")
    print(f"Hero shortlist at:  {SHORTLIST_PATH}")
    print()
    print("Hero shortlist preview:")
    for g, items in shortlist.items():
        if items:
            top = items[0]
            print(f"  {g}: {top['score']} pts — {top['original_name'][:60]}")


if __name__ == "__main__":
    main()
