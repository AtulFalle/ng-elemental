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

## Install and add components

From your Angular app:

```sh
npx @ng-elemental/cli init
npx @ng-elemental/cli add button
npx @ng-elemental/cli add label
```

`init` creates `elemental.json` and the components directory (`src/app/ui` by default).

`add button` / `add label` copy:

```
src/app/ui/button/
  button.ts
  button.html
  button.scss

src/app/ui/label/
  label.ts
  label.html
  label.scss
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

### Label

```ts
import { ElLabel } from './ui/label/label';
```

```html
<el-label htmlFor="email" variant="default">Email</el-label>
<el-label htmlFor="hint" variant="muted">Optional hint</el-label>
<el-label htmlFor="email" variant="error" [required]="true">Email</el-label>
```

Inputs: `variant` (`default` | `muted` | `error`), `htmlFor`, `required`, `disabled`.

If the target folder already exists, pass `--force` to overwrite:

```sh
npx @ng-elemental/cli add button --force
npx @ng-elemental/cli add label --force
```

## Local development (this repo)

```sh
# Storybook — Button catalog
npx nx storybook ng-elemental

# Build the CLI (bin + registry)
npx nx build cli

# E2E: publish CLI to local Verdaccio, npm install, init + add button/label
npx nx test cli
```

`nx test cli` starts Verdaccio (`nx local-registry`), publishes `@ng-elemental/cli@0.0.0-e2e`, then installs that package into a temp consumer app and runs `init` / `add button` / `add label`. Needs network once so Verdaccio can proxy `@angular/core`.

After `nx build cli`, the CLI is at `dist/packages/cli/index.cjs` with registry files at `dist/packages/cli/registry/button/` and `dist/packages/cli/registry/label/`.

You can run it against a local Angular app:

```sh
node dist/packages/cli/index.cjs init --yes
node dist/packages/cli/index.cjs add button
node dist/packages/cli/index.cjs add label
```

## Release checklist

Only **`@ng-elemental/cli`** is published to npm. The workspace root (`@ng-elemental/source`) is private. `@ng-elemental/ui` stays internal.

CI on pull requests and `master` runs lint, build, and e2e. After those pass on a **`master` push**, GitHub Actions publishes `dist/packages/cli` only (`npm publish` from that folder — never the repo root).

Optional: pushing tag `vX.Y.Z` creates a GitHub Release from `CHANGELOG.md`.

### Every release

1. Bump `packages/cli/package.json` `version` and update `CHANGELOG.md`.
2. Commit on `master` (do not publish from your machine).
3. Push **only** the git remote yourself:

   ```sh
   git push origin master
   ```

4. Confirm **CI** is green, then **Publish @ng-elemental/cli**.
5. Confirm:

   ```sh
   npm view @ng-elemental/cli version
   ```
