#!/usr/bin/env python3
"""Arcanea Arena — Season 0 entry validator.

Zero-dependency. Run by .github/workflows/validate-entries.yml on PRs that
touch challenges/season-0/entries/, and locally:

    python3 challenges/season-0/scripts/validate_entry.py <entry-dir> [--author <github-handle>]

Checks (spec: arcanea-ai-app/docs/superpowers/specs/2026-07-02-worldsmith-trials-season-0-design.md §3):
  1. directory name is <handle>--<skill-name>; --author (PR author) must match handle
  2. SKILL.md frontmatter: name (lowercase-hyphenated, == dir suffix), description
     (<=1024 chars), body <=500 lines
  3. entry.json satisfies the arena-entry-v1 schema; license accepted
  4. world/ contains the five layer files, each non-empty
  5. injection lint over all submitted text (hit = fail, maintainer-reviewable)
"""
from __future__ import annotations

import json
import re
import sys
from pathlib import Path

WORLD_FILES = ["cosmology.md", "systems.md", "geography.md", "factions.md", "timeline.md"]
LICENSE_ID = "SUBMISSIONS-LICENSE-v1"
NAME_RE = re.compile(r"^[a-z0-9]+(-[a-z0-9]+)*$")
DIR_RE = re.compile(r"^(?P<handle>[A-Za-z0-9-]+)--(?P<skill>[a-z0-9]+(?:-[a-z0-9]+)*)$")

# Judge-manipulation patterns. Case-insensitive. A hit fails validation and is
# flagged for maintainer review (false positives can be waived by label).
INJECTION_PATTERNS = [
    r"ignore (all |any )?(previous|prior|above) instructions",
    r"disregard (the |your )?(system|previous) prompt",
    r"you are (now )?the judge",
    r"score (this|it|the entry) (a |an )?(100|hundred|maximum)",
    r"give (this|it) (a )?(perfect|maximum|top) score",
    r"as the (judge|evaluator|scorer),",
    r"\[system\]|<\|system\|>|<system>",
    r"new system prompt",
    r"override (the )?rubric",
]
INJECTION_RE = re.compile("|".join(f"(?:{p})" for p in INJECTION_PATTERNS), re.IGNORECASE)


def parse_frontmatter(text: str) -> tuple[dict, str]:
    """Minimal YAML-ish frontmatter parser: top-level `key: value` lines only."""
    if not text.startswith("---"):
        return {}, text
    parts = text.split("---", 2)
    if len(parts) < 3:
        return {}, text
    meta = {}
    for line in parts[1].splitlines():
        if ":" in line and not line.startswith(" ") and not line.startswith("#"):
            key, _, value = line.partition(":")
            meta[key.strip()] = value.strip().strip("'\"")
    return meta, parts[2]


def validate(entry_dir: Path, author: str | None) -> list[str]:
    errors: list[str] = []

    m = DIR_RE.match(entry_dir.name)
    if not m:
        return [f"directory name '{entry_dir.name}' must be <github-handle>--<skill-name>"]
    handle, skill_from_dir = m.group("handle"), m.group("skill")
    if author and handle.lower() != author.lower():
        errors.append(f"directory handle '{handle}' does not match PR author '{author}'")

    # --- SKILL.md ---
    skill_path = entry_dir / "SKILL.md"
    if not skill_path.is_file():
        errors.append("SKILL.md is missing")
    else:
        text = skill_path.read_text(encoding="utf-8", errors="replace")
        meta, body = parse_frontmatter(text)
        name = meta.get("name", "")
        if not NAME_RE.match(name):
            errors.append(f"SKILL.md frontmatter name '{name}' must be lowercase-hyphenated")
        elif name != skill_from_dir:
            errors.append(f"SKILL.md name '{name}' must equal directory suffix '{skill_from_dir}'")
        description = meta.get("description", "")
        if not description:
            errors.append("SKILL.md frontmatter is missing a description")
        elif len(description) > 1024:
            errors.append(f"SKILL.md description is {len(description)} chars (max 1024)")
        if len(body.splitlines()) > 500:
            errors.append(f"SKILL.md body is {len(body.splitlines())} lines (max 500)")

    # --- entry.json ---
    manifest_path = entry_dir / "entry.json"
    manifest = None
    if not manifest_path.is_file():
        errors.append("entry.json is missing")
    else:
        try:
            manifest = json.loads(manifest_path.read_text(encoding="utf-8"))
        except json.JSONDecodeError as exc:
            errors.append(f"entry.json is not valid JSON: {exc}")
    if isinstance(manifest, dict):
        if manifest.get("schema") != "arena-entry-v1":
            errors.append("entry.json schema must be 'arena-entry-v1'")
        if manifest.get("entrant", {}).get("github", "").lower() != handle.lower():
            errors.append("entry.json entrant.github must match the directory handle")
        if manifest.get("skill", {}).get("name") != skill_from_dir:
            errors.append("entry.json skill.name must match the directory suffix")
        if not manifest.get("seed_used"):
            errors.append("entry.json seed_used is required (a public seed id)")
        if not manifest.get("models_declared"):
            errors.append("entry.json models_declared must list the models your workflow uses")
        if manifest.get("license_accepted") != LICENSE_ID:
            errors.append(f"entry.json license_accepted must be '{LICENSE_ID}' — see docs/community/SUBMISSIONS-LICENSE.md")
        if len(str(manifest.get("notes", ""))) > 500:
            errors.append("entry.json notes exceeds 500 chars")

    # --- world/ ---
    world_dir = entry_dir / "world"
    if not world_dir.is_dir():
        errors.append("world/ directory is missing")
    else:
        for fname in WORLD_FILES:
            fpath = world_dir / fname
            if not fpath.is_file():
                errors.append(f"world/{fname} is missing")
            elif len(fpath.read_text(encoding="utf-8", errors="replace").strip()) < 40:
                errors.append(f"world/{fname} is empty or placeholder-thin")

    # --- injection lint ---
    for path in sorted(entry_dir.rglob("*")):
        if path.is_file() and path.suffix in {".md", ".json", ".txt"}:
            for i, line in enumerate(path.read_text(encoding="utf-8", errors="replace").splitlines(), 1):
                if INJECTION_RE.search(line):
                    errors.append(
                        f"injection lint: suspicious instruction in {path.relative_to(entry_dir)}:{i} "
                        f"(maintainers can waive false positives by label)"
                    )

    return errors


def main() -> int:
    args = sys.argv[1:]
    if not args:
        print("usage: validate_entry.py <entry-dir> [--author <github-handle>]", file=sys.stderr)
        return 2
    author = None
    if "--author" in args:
        idx = args.index("--author")
        author = args[idx + 1]
        del args[idx : idx + 2]
    entry_dir = Path(args[0]).resolve()
    if not entry_dir.is_dir():
        print(f"FAIL: {entry_dir} is not a directory", file=sys.stderr)
        return 1
    errors = validate(entry_dir, author)
    if errors:
        print(f"FAIL: {entry_dir.name} — {len(errors)} problem(s):")
        for err in errors:
            print(f"  - {err}")
        return 1
    print(f"OK: {entry_dir.name} is a valid Season 0 entry")
    return 0


if __name__ == "__main__":
    sys.exit(main())
