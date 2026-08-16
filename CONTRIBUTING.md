# Contributing to NgElemental

Thank you for your interest in contributing. NgElemental is an Angular UI component library distributed as copy-paste source via the `@ng-elemental/cli` package.

## Ways to contribute

- Report bugs and request features via [GitHub Issues](https://github.com/AtulFalle/ng-elemental/issues)
- Improve documentation
- Add or refine components in `packages/ui`
- Extend CLI behavior in `packages/cli`
- Add tests and Storybook stories

## Development setup

### Prerequisites

- Node.js 24+
- npm 11+

### Install and verify

```sh
git clone https://github.com/AtulFalle/ng-elemental.git
cd ng-elemental
npm ci
npx nx run-many -t lint stylelint build test
```

### Project layout

```
packages/
  ui/          Component source (Button, Label, …)
  cli/         CLI that copies components into consumer apps
src/           Internal demo app and Storybook host
tools/         Local registry helpers for CLI e2e tests
```

Component files under `packages/ui` are bundled into `dist/packages/cli/registry/` when the CLI is built. End users receive those files through `ng-elemental add`.

### Common tasks

```sh
# Storybook component catalog
npx nx storybook ng-elemental

# Build the CLI
npx nx build cli

# Lint
npx nx run-many -t lint

# CLI end-to-end tests (local Verdaccio + temp consumer app)
npx nx test cli
```

After building the CLI, you can run it locally against an Angular app:

```sh
node dist/packages/cli/index.cjs init --yes
node dist/packages/cli/index.cjs add button
node dist/packages/cli/index.cjs add label
```

## Adding a component

1. Implement the component in `packages/ui/src/lib/<name>/` (`.ts`, `.html`, `.scss`, and a `.stories.ts` file).
2. Export it from `packages/ui/src/index.ts` if needed for the demo app.
3. **Register the component in `packages/cli/src/lib/component-registry.ts`** — add `assetGlobs`, `requiredBasenames`, and usage examples in `add.ts`.
4. Add matching registry asset entries in `packages/cli/project.json` (copy `assetGlobs` exactly; **never use `*` wildcards** in registry globs).
5. Run `npx nx test cli` — registry unit tests verify `project.json` stays in sync and the built registry has no story files.
6. Add an e2e smoke test in `packages/cli/src/e2e/add-<name>.spec.ts` (one file per component; shared setup lives in `helpers.ts`).
7. Document the component in the root `README.md` and `packages/cli/README.md`.

The manifest in `component-registry.ts` is the single source of truth. CI fails if:

- `project.json` registry globs drift from the manifest
- The built registry includes `.stories.` or `.story-host.` files
- Required component source files are missing from `dist/packages/cli/registry/`

Follow existing conventions:

- Encapsulated SCSS with BEM-style class names (`el-block`, `el-block__element`, `el-block--modifier`)
- Design tokens via CSS custom properties in `packages/ui/src/lib/theme/tokens.scss` (generic MD3 color roles + density). Do not add `--el-<name>-*` widget aliases; unique sizes stay in that widget’s SCSS. Hex only in the theme file.
- Selector prefix `el-`
- Modern Angular patterns enforced by ESLint (`input()`, `inject()`, host metadata, `@if` control flow) and Stylelint (BEM selectors, no hex outside tokens)

## Pull requests

Contributors merge work through PRs. CI runs lint, build, and test on every pull request and on every push to `master`. Chromatic visual **review** runs on pull requests only; a merge to `master` only updates the visual baseline. **Merging a PR does not publish anything to npm.**

1. Fork the repository and create a feature branch from `master`.
2. Keep changes focused and include tests when behavior changes.
3. Run `npx nx run-many -t lint stylelint build test` before opening a PR.
4. For user-visible changes, add a note under `[Unreleased]` in `CHANGELOG.md`. Do **not** bump `packages/cli/package.json` version in contributor PRs — the maintainer does that at release time.
5. Describe what changed and how you tested it in the PR description.
6. Chromatic runs only when the PR changes `packages/ui`, `.storybook`, or `chromatic.config.json` (not docs or the website). If it reports visual diffs, review and accept them in Chromatic before merging. Re-run the **Chromatic** check after you accept so GitHub sees a passing status. PRs with no visual diffs, and docs/site-only PRs, pass automatically. Do not re-review on `master` — merge updates the baseline.

## Releases (maintainers only)

Only **`@ng-elemental/cli`** is published to npm.

| Event | What runs |
| --- | --- |
| Pull request | CI — lint, build, test; Chromatic — visual review only if UI/Storybook files changed |
| Push to `master` | CI — lint, build, test; Chromatic Baseline — full capture only if UI/Storybook files changed |
| Push tag `vX.Y.Z` | Opens a release PR (version bump + changelog) |
| Merge release PR | Publishes to npm, updates tag, creates GitHub Release |

Feature PRs do not publish. Contributors only update `[Unreleased]` in `CHANGELOG.md`.

### How to release

1. Ensure `[Unreleased]` in `CHANGELOG.md` has the changes you are shipping.
2. Tag the current `master` commit:

   ```sh
   git tag vX.Y.Z
   git push origin vX.Y.Z
   ```

3. Review and merge the release PR that opens automatically.
4. Confirm:

   ```sh
   npm view @ng-elemental/cli version
   ```

### Manual retry

If automation fails after merge, re-run **Publish Release** from the Actions tab with the release version.

If a tag was pushed but no PR opened, re-run **Prepare Release** with the same version.

Set `NPM_ACCESS_TOKEN` as a repository secret for the publish workflow.

Set `CHROMATIC_PROJECT_TOKEN` as a repository secret so the Chromatic workflow can publish Storybook. Require the **Chromatic** check (the PR visual review job) on `master` branch protection. Chromatic publishes only when `packages/ui`, `.storybook`, or `chromatic.config.json` change; docs and website PRs get a passing skip. Unapproved UI diffs fail that check until you accept them in Chromatic and re-run the workflow. Merging a UI PR then runs **Chromatic Baseline**, which auto-accepts a full snapshot set so later PRs compare against `master`.

If Chromatic’s GitHub App also publishes builds, turn those automatic builds off so this workflow is the only publisher. Dual publishers duplicate snapshots and create extra diffs.

## Code of conduct

This project follows the [Contributor Covenant](CODE_OF_CONDUCT.md). By participating, you agree to uphold it.

## Questions

Open a [GitHub Discussion or Issue](https://github.com/AtulFalle/ng-elemental/issues) if you are unsure whether a change fits the project scope.
