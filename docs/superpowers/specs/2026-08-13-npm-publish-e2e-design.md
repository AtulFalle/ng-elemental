# NPM publish + Verdaccio e2e

Date: 2026-08-13

## Goal

Publish `@ng-elemental/cli` to npm (tag-triggered) and prove `init` / `add button` work via a real npm install against a local Verdaccio registry.

## Decisions

- Only `@ng-elemental/cli` is published. `@ng-elemental/ui` stays internal.
- Fixed versioning with git tags `v{version}`.
- Local: `npx nx release --skip-publish` (first time: `--first-release`). Push commit + tags. GHA publishes.
- E2E: Vitest globalSetup starts Verdaccio, Nx Release publishes `0.0.0-e2e` with tag `e2e`, test installs `@ng-elemental/cli@e2e` into a temp consumer app, then runs the installed CLI `init` + `add button`.
- E2E asserts copied Button source (`button.ts` / `.html` / `.scss`), including registry assets inside the installed package. Does not compile the consumer Angular app.
- CI on PR + `master`. Publish workflow on `v*.*.*` after the same checks. Secret: `NPM_ACCESS_TOKEN`. Provenance enabled.

## Non-goals

- Publishing `@ng-elemental/ui`
- Independent per-package tags
- Fully automated version bumps in CI
