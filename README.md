# NgElemental

Copy-paste Angular components for your app — a shadcn-style workflow, not an npm UI kit.

You run a CLI, the component source (HTML, TypeScript, SCSS) lands in your project, and you own it.

## Prerequisites

An Angular application (v22+ recommended). No Tailwind. Components use encapsulated SCSS / BEM.

Default type: **Geist** (UI) and **Geist Mono** (code). This repo loads them with `@fontsource-variable/geist` and `@fontsource-variable/geist-mono`. In your app, install those packages, add their CSS to `styles` in `angular.json` / `project.json`, and set:

```scss
:root {
  --el-font-sans: 'Geist Variable', Geist, ui-sans-serif, system-ui, sans-serif;
  --el-font-mono: 'Geist Mono Variable', 'Geist Mono', ui-monospace, monospace;
}
```

## Install and add Button

From your Angular app:

```sh
npx @ng-elemental/cli init
npx @ng-elemental/cli add button
```

`init` creates `elemental.json` and the components directory (`src/app/ui` by default).

`add button` copies:

```
src/app/ui/button/
  button.ts
  button.html
  button.scss
```

## Usage

Import `ElButton` into a standalone component and use it in the template:

```ts
import { Component } from '@angular/core';
import { ElButton } from './ui/button/button';

@Component({
  selector: 'app-root',
  imports: [ElButton],
  template: `<el-button variant="primary" size="md">Save</el-button>`,
})
export class App {}
```

```html
<el-button variant="primary">Save</el-button>
<el-button variant="secondary" size="sm">Cancel</el-button>
<el-button variant="ghost" disabled>Disabled</el-button>
```

Inputs: `variant` (`primary` | `secondary` | `ghost`), `size` (`sm` | `md` | `lg`), `disabled`, `type` (`button` | `submit` | `reset`).

If the target folder already exists, pass `--force` to overwrite:

```sh
npx @ng-elemental/cli add button --force
```

## Local development (this repo)

```sh
# Storybook — Button catalog
npx nx storybook ng-elemental

# Build the CLI (bin + registry)
npx nx build cli

# E2E: publish CLI to local Verdaccio, npm install, init + add button
npx nx test cli
```

`nx test cli` starts Verdaccio (`nx local-registry`), publishes `@ng-elemental/cli@0.0.0-e2e`, then installs that package into a temp consumer app and runs `init` / `add button`. Needs network once so Verdaccio can proxy `@angular/core`.

After `nx build cli`, the CLI is at `dist/packages/cli/index.cjs` with registry files at `dist/packages/cli/registry/button/`.

You can run it against a local Angular app:

```sh
node dist/packages/cli/index.cjs init --yes
node dist/packages/cli/index.cjs add button
```

## Publish checklist

Only `@ng-elemental/cli` is published. `@ng-elemental/ui` stays internal (source of truth for Storybook and the CLI registry).

Versioning is **fixed**. Git tags look like `v1.2.3`. Pushing a matching tag publishes via GitHub Actions.

### One-time setup

1. Create the `@ng-elemental` org on [npmjs.com](https://www.npmjs.com/) (or get publish access).
2. Create a granular npm token with read/write on `@ng-elemental/cli` and the org.
3. Add GitHub repo secret `NPM_ACCESS_TOKEN` with that token.
4. Confirm `master` CI is green.

### Every release

1. On a clean `master`:

   ```sh
   # First public release only:
   npx nx release --first-release --skip-publish

   # Later releases:
   npx nx release --skip-publish
   ```

   This bumps the version, writes `CHANGELOG.md`, commits, and creates tag `vX.Y.Z`. Do **not** publish from your machine.

2. Push the commit and tag:

   ```sh
   git push && git push --tags
   ```

3. Confirm the **Publish** workflow is green.
4. Confirm the package:

   ```sh
   npm view @ng-elemental/cli
   npx @ng-elemental/cli@latest add button
   ```

Do not run `npx nx release` (without `--skip-publish`) unless you intend to publish from your laptop.
