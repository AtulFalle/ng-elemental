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
npx nx run-many -t lint build test
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
3. Register the component in `packages/cli/src/lib/add.ts` (`AVAILABLE_COMPONENTS` and examples).
4. Add the registry asset glob in `packages/cli/project.json`.
5. Extend CLI e2e coverage in `packages/cli/src/e2e/`.
6. Document the component in the root `README.md` and `packages/cli/README.md`.

Follow existing conventions:

- Standalone Angular components with `input()` and `ChangeDetectionStrategy.OnPush`
- Encapsulated SCSS with BEM-style class names
- Selector prefix `el-`

## Pull requests

Contributors merge work through PRs. CI runs lint, build, and test on every pull request and on every push to `master`. **Merging a PR does not publish anything to npm.**

1. Fork the repository and create a feature branch from `master`.
2. Keep changes focused and include tests when behavior changes.
3. Run `npx nx run-many -t lint build test` before opening a PR.
4. For user-visible changes, add a note under `[Unreleased]` in `CHANGELOG.md`. Do **not** bump `packages/cli/package.json` version in contributor PRs — the maintainer does that at release time.
5. Describe what changed and how you tested it in the PR description.

## Releases (maintainers only)

Only **`@ng-elemental/cli`** is published to npm.

This follows the usual open-source library flow:

| Event | What runs |
| --- | --- |
| Pull request | CI — lint, build, test |
| Push to `master` | CI — lint, build, test |
| Push tag `vX.Y.Z` | Build CLI, publish to npm, create GitHub Release |

Merging PRs never publishes. The maintainer decides when to release by pushing a version tag.

### How to release

1. On `master`, bump `version` in `packages/cli/package.json`.
2. Move `[Unreleased]` entries in `CHANGELOG.md` into `[X.Y.Z]`.
3. Commit and push to `master`.
4. Tag and push:

   ```sh
   git tag vX.Y.Z
   git push origin vX.Y.Z
   ```

5. Confirm:

   ```sh
   npm view @ng-elemental/cli version
   ```

The tag must match the version in `packages/cli/package.json` (for example tag `v0.0.3` with version `0.0.3`).

Only tag when shipping CLI or component changes. Documentation, CI, and other repository-only commits do not need a release — merge to `master` and skip tagging.

Set `NPM_ACCESS_TOKEN` as a repository secret for the release workflow.

## Code of conduct

This project follows the [Contributor Covenant](CODE_OF_CONDUCT.md). By participating, you agree to uphold it.

## Questions

Open a [GitHub Discussion or Issue](https://github.com/AtulFalle/ng-elemental/issues) if you are unsure whether a change fits the project scope.
