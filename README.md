# NgElemental

[![npm version](https://img.shields.io/npm/v/@ng-elemental/cli.svg)](https://www.npmjs.com/package/@ng-elemental/cli)
[![CI](https://github.com/AtulFalle/ng-elemental/actions/workflows/ci.yml/badge.svg)](https://github.com/AtulFalle/ng-elemental/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

Copy-paste Angular UI components for your application. Run the CLI, and component source files land in your project — you own and customize the code.

NgElemental is **not** a traditional npm UI library. Components are added as source (TypeScript, HTML, SCSS) so you can adapt styling, behavior, and structure without fighting a black-box dependency.

## Requirements

- **Angular** 22 or later
- **Node.js** 24 or later (for the CLI)

Components use encapsulated SCSS with BEM-style class names. Tailwind is not required.

## Quick start

From your Angular project:

```sh
npx @ng-elemental/cli init
npx @ng-elemental/cli add button
npx @ng-elemental/cli add label
```

`init` creates `elemental.json` and a components directory (default: `src/app/ui`).

`add` copies the selected component into that directory:

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

Import the component in a standalone Angular component:

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

## Typography

Components expect **Geist** (UI) and **Geist Mono** (code). Install the font packages in your app:

```sh
npm install @fontsource-variable/geist @fontsource-variable/geist-mono
```

Add their CSS to `styles` in `angular.json` or `project.json`, then define:

```scss
:root {
  --el-font-sans: 'Geist Variable', Geist, ui-sans-serif, system-ui, sans-serif;
  --el-font-mono: 'Geist Mono Variable', 'Geist Mono', ui-monospace, monospace;
}
```

## Configuration

`elemental.json` controls where components are copied:

```json
{
  "componentsDir": "src/app/ui"
}
```

Change `componentsDir` before running `add` if you prefer a different location.

## CLI reference

| Command | Description |
| --- | --- |
| `npx @ng-elemental/cli init [--yes]` | Create config and components directory |
| `npx @ng-elemental/cli add <name> [--force]` | Copy a component into your project |

Available components: `button`, `label`.

Use `--force` to overwrite an existing component folder.

## Components

### Button (`el-button`)

```html
<el-button variant="primary">Save</el-button>
<el-button variant="secondary" size="sm">Cancel</el-button>
<el-button variant="ghost" disabled>Disabled</el-button>
```

| Input | Type | Default | Description |
| --- | --- | --- | --- |
| `variant` | `primary` \| `secondary` \| `ghost` | `primary` | Visual style |
| `size` | `sm` \| `md` \| `lg` | `md` | Button size |
| `disabled` | `boolean` | `false` | Disabled state |
| `type` | `button` \| `submit` \| `reset` | `button` | Native button type |

### Label (`el-label`)

```html
<el-label htmlFor="email" variant="default">Email</el-label>
<el-label htmlFor="hint" variant="muted">Optional hint</el-label>
<el-label htmlFor="email" variant="error" [required]="true">Email</el-label>
```

| Input | Type | Default | Description |
| --- | --- | --- | --- |
| `variant` | `default` \| `muted` \| `error` | `default` | Visual style |
| `htmlFor` | `string` | `''` | Associated control id |
| `required` | `boolean` | `false` | Shows required indicator |
| `disabled` | `boolean` | `false` | Muted, non-interactive label |

## Packages

| Package | Published | Purpose |
| --- | --- | --- |
| [`@ng-elemental/cli`](https://www.npmjs.com/package/@ng-elemental/cli) | Yes | CLI that copies components into your app |
| `@ng-elemental/ui` | No | Internal component source in this repository |

Install and use **`@ng-elemental/cli`** in your Angular project. See [packages/cli/README.md](packages/cli/README.md) for npm-focused documentation.

## Contributing

Contributions are welcome. See [CONTRIBUTING.md](CONTRIBUTING.md) for development setup and guidelines.

Please read our [Code of Conduct](CODE_OF_CONDUCT.md) before participating.

## Security

To report a vulnerability, see [SECURITY.md](SECURITY.md).

## License

[MIT](LICENSE) © NgElemental contributors
