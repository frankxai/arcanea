#!/usr/bin/env node

import { createHash } from "node:crypto";
import { existsSync, mkdirSync, readFileSync, readdirSync, statSync, writeFileSync } from "node:fs";
import { dirname, join, relative, resolve } from "node:path";

const repositoryRoot = resolve(import.meta.dirname, "..");

function filesUnder(root) {
  const absolute = resolve(repositoryRoot, root);
  if (!existsSync(absolute)) return [];
  const output = [];
  const visit = (path) => {
    for (const name of readdirSync(path)) {
      const child = join(path, name);
      const stat = statSync(child);
      if (stat.isDirectory()) visit(child);
      else output.push(child);
    }
  };
  visit(absolute);
  return output;
}

function words(text) {
  return text.match(/\S+/g)?.length ?? 0;
}

function sha256(path) {
  return createHash("sha256").update(readFileSync(path)).digest("hex");
}

function inventory(root) {
  const files = filesUnder(root);
  const markdown = files.filter((path) => path.endsWith(".md"));
  return {
    root,
    file_count: files.length,
    markdown_file_count: markdown.length,
    markdown_whitespace_word_count: markdown.reduce(
      (total, path) => total + words(readFileSync(path, "utf8")),
      0,
    ),
  };
}

function occurrences(root, expressions) {
  const hits = Object.fromEntries(expressions.map((expression) => [expression.source, []]));
  for (const path of filesUnder(root)) {
    if (!/\.(md|mdx|txt|ya?ml|json|ts|tsx|js|mjs)$/i.test(path)) continue;
    const text = readFileSync(path, "utf8");
    for (const expression of expressions) {
      const count = [...text.matchAll(new RegExp(expression.source, expression.flags.includes("g") ? expression.flags : `${expression.flags}g`))].length;
      if (count) hits[expression.source].push({ path: relative(repositoryRoot, path), count });
    }
  }
  return hits;
}

const requiredGovernanceFiles = [
  "LICENSE-CONTENT.md",
  "governance/CANON_REGISTRY.yaml",
  "governance/NAMING_REGISTRY.yaml",
  "governance/MYSTERY_LEDGER.yaml",
  "governance/RIGHTS_REGISTRY.yaml",
  "governance/CONTENT_INVENTORY.yaml",
  "governance/PUBLIC_ESTATE_REGISTRY.yaml",
  "governance/RELEASE_REGISTRY.yaml",
  "governance/releases/ARC-REL-001.yaml",
];

const canonFiles = [
  ".arcanea/lore/CANON_LOCKED.md",
  "arcanea-lore/CANON_LOCKED.md",
  "sync/aios/lore/CANON_LOCKED.md",
].map((path) => {
  const absolute = resolve(repositoryRoot, path);
  return existsSync(absolute)
    ? { path, sha256: sha256(absolute), whitespace_word_count: words(readFileSync(absolute, "utf8")) }
    : { path, missing: true };
});

const audit = {
  schema_version: "1.0",
  generated_at: new Date().toISOString(),
  repository_root: repositoryRoot,
  required_governance_files: requiredGovernanceFiles.map((path) => ({
    path,
    present: existsSync(resolve(repositoryRoot, path)),
  })),
  inventory: [
    inventory(".arcanea/lore"),
    inventory("arcanea-lore"),
    inventory("sync/aios/lore"),
    inventory("book"),
    inventory("book-de"),
  ],
  canon_fingerprints: canonFiles,
  authoritative_lore_legacy_terms: occurrences(".arcanea/lore", [
    /\bAmaterasu\b/i,
    /\bThessara\b/i,
    /\bKael Thornfield\b/i,
    /\bMira Tidecrest\b/i,
  ]),
  public_claim_candidates: occurrences("apps/web", [
    /486K\+?/i,
    /190K\+?/i,
    /open source/i,
    /MIT licensed/i,
    /Book One complete/i,
  ]),
  policy: {
    counts_are_inventory_not_quality: true,
    generated_output_is_not_canon: true,
    failure_condition: "A required governance file is missing.",
  },
};

const missing = audit.required_governance_files.filter((entry) => !entry.present);
const serialized = `${JSON.stringify(audit, null, 2)}\n`;

if (process.argv.includes("--write")) {
  const outputPath = resolve(repositoryRoot, "generated/governance-audit.json");
  mkdirSync(dirname(outputPath), { recursive: true });
  writeFileSync(outputPath, serialized, "utf8");
  process.stderr.write(`Wrote ${relative(repositoryRoot, outputPath)}\n`);
}

process.stdout.write(serialized);
if (missing.length) process.exitCode = 1;
