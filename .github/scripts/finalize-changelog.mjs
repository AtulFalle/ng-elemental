#!/usr/bin/env node
import { readFileSync, writeFileSync } from 'node:fs';

const [version, date = new Date().toISOString().slice(0, 10)] = process.argv.slice(2);

if (!version || !/^\d+\.\d+\.\d+/.test(version)) {
  console.error('Usage: finalize-changelog.mjs <version> [date]');
  process.exit(1);
}

const changelogPath = 'CHANGELOG.md';
const content = readFileSync(changelogPath, 'utf8');
const repo = 'AtulFalle/ng-elemental';

const unreleasedMatch = content.match(
  /^## \[Unreleased\]\s*\n([\s\S]*?)(?=^## \[)/m
);

if (!unreleasedMatch) {
  console.error('Could not find ## [Unreleased] section in CHANGELOG.md');
  process.exit(1);
}

const unreleasedBody = unreleasedMatch[1].trim();
if (!unreleasedBody) {
  console.error('[Unreleased] is empty. Add changelog entries before releasing.');
  process.exit(1);
}

const releaseSection = `## [${version}] - ${date}\n\n${unreleasedBody}\n\n`;
let updated = content.replace(
  /^## \[Unreleased\]\s*\n[\s\S]*?(?=^## \[)/m,
  `## [Unreleased]\n\n${releaseSection}`
);

updated = updated.replace(
  /\[Unreleased\]:[^\n]*/,
  `[Unreleased]: https://github.com/${repo}/compare/v${version}...HEAD`
);

if (!updated.includes(`[${version}]:`)) {
  updated = updated.replace(
    /(\n\[[0-9]+\.[0-9]+\.[0-9]+\]:)/,
    `\n[${version}]: https://github.com/${repo}/releases/tag/v${version}$1`
  );
}

writeFileSync(changelogPath, updated);
console.log(`Finalized CHANGELOG.md for ${version}`);
