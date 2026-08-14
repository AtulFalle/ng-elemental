#!/usr/bin/env bash
set -euo pipefail

VERSION="${1:?version required}"
DATE="${2:-$(date -u +%Y-%m-%d)}"

node -e "
const fs = require('node:fs');
const path = 'packages/cli/package.json';
const pkg = JSON.parse(fs.readFileSync(path, 'utf8'));
pkg.version = process.argv[1];
fs.writeFileSync(path, JSON.stringify(pkg, null, 2) + '\n');
" "$VERSION"

node .github/scripts/finalize-changelog.mjs "$VERSION" "$DATE"
