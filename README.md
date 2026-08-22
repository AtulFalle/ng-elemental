# NgElemental

[![npm version](https://img.shields.io/npm/v/@ng-elemental/cli.svg)](https://www.npmjs.com/package/@ng-elemental/cli)
[![MCP](https://img.shields.io/npm/v/@ng-elemental/mcp.svg?label=%40ng-elemental%2Fmcp)](https://www.npmjs.com/package/@ng-elemental/mcp)
[![CLI monthly downloads](https://img.shields.io/npm/dm/@ng-elemental/cli.svg?label=CLI%20downloads%2Fmo)](https://www.npmjs.com/package/@ng-elemental/cli)
[![MCP monthly downloads](https://img.shields.io/npm/dm/@ng-elemental/mcp.svg?label=MCP%20downloads%2Fmo)](https://www.npmjs.com/package/@ng-elemental/mcp)
[![CI](https://github.com/AtulFalle/ng-elemental/actions/workflows/ci.yml/badge.svg)](https://github.com/AtulFalle/ng-elemental/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Website](https://img.shields.io/badge/website-atulfalle.github.io%2Fng--elemental-blue)](https://atulfalle.github.io/ng-elemental/)

**Copy-paste Angular UI components — you receive the source, you own the code.**

Run the CLI, and component source files (TypeScript, HTML, SCSS) are written directly into your project. There is no runtime library to import, no version to pin, and no black-box dependency to fight. Adapt styling, behavior, and structure as freely as first-party code.

> **Links:** [Website & Docs](https://atulfalle.github.io/ng-elemental/) · [Component catalog](https://atulfalle.github.io/ng-elemental/docs) · [npm (CLI)](https://www.npmjs.com/package/@ng-elemental/cli) · [npm (MCP)](https://www.npmjs.com/package/@ng-elemental/mcp) · [MCP endpoint](https://ng-elemental.vercel.app/mcp) · [GitHub](https://github.com/AtulFalle/ng-elemental)

---

## Contents

- [Why NgElemental](#why-ngelemental)
- [How it works](#how-it-works)
- [Five-minute quick start](#five-minute-quick-start)
- [Theming](#theming)
- [Typography](#typography)
- [Configuration](#configuration)
- [CLI reference](#cli-reference)
- [MCP / AI agent integration](#mcp--ai-agent-integration)
- [Component catalog](#component-catalog)
- [Component reference](#components)
- [Packages](#packages)
- [Contributing](#contributing)

---

## Why NgElemental

Most Angular UI libraries ship compiled packages. You get styled components, but you cannot touch the internals without forking the library. When the design system wants pixel-perfect control, accessibility requirements are strict, or the widget simply does not fit the use case — you are out of options.

NgElemental takes a different path: **components are source files, not a runtime dependency**. The CLI copies TypeScript, HTML, and SCSS into your project. From that point the code is yours. You modify it like any other first-party component, run your own lint and tests against it, and ship it without any NgElemental package in `node_modules`.

## How it works

```
Developer machine
│
├── npx @ng-elemental/cli init       # writes elemental.json + tokens.scss
└── npx @ng-elemental/cli add button # copies button.ts / button.html / button.scss
                                     # into src/app/ui/button/
```

After `add`, import the component the same way you import any Angular component in your own code:

```ts
import { ElButton } from './ui/button/button';
```

The NgElemental CLI and MCP packages are dev-time tools. The copied source has no runtime coupling to them.

**Compared to a traditional Angular component library:**

| | Traditional library | NgElemental |
| --- | --- | --- |
| Runtime dependency | Yes — `node_modules` | No — source only |
| Customization | Theme/API surface only | Full source access |
| Breaking changes | Every major version | You control your copy |
| Accessibility | Varies | WCAG 2.1 AA target, ARIA APG patterns |
| Tailwind required | Sometimes | No — encapsulated SCSS |

## Five-minute quick start

**Prerequisites:** Angular 22+, Node.js 24+.

```sh
# 1. Create a new Angular project (skip if you already have one)
npx @angular/cli@latest new my-app --routing --style=scss
cd my-app

# 2. Initialise NgElemental — writes elemental.json and installs theme tokens
npx @ng-elemental/cli init

# 3. Add a component
npx @ng-elemental/cli add button

# 4. Import and use it
```

Open `src/app/app.component.ts` and add `ElButton`:

```ts
import { Component } from '@angular/core';
import { ElButton } from './ui/button/button';

@Component({
  selector: 'app-root',
  imports: [ElButton],
  template: `<el-button variant="primary">Save</el-button>`,
})
export class AppComponent {}
```

```sh
# 5. Run the app
ng serve
```

That is the full loop. Add more components with `npx @ng-elemental/cli add <name>`.

`init` flags:
- `--yes` — skip prompts (default path `src/app/ui`, installs theme)
- `--path <dir>` — custom path, useful for Nx monorepos (e.g. `libs/ui`)
- `--skip-theme` — install theme tokens separately later with `add theme`

## Requirements

- **Angular** 22 or later
- **Node.js** 24 or later (for the CLI)

Components use encapsulated SCSS with BEM-style class names and CSS design tokens. Tailwind is not required.

## Quick start

From any Angular 22+ project:

```sh
npx @ng-elemental/cli init
npx @ng-elemental/cli add button
```

`init` asks where to copy components (default: `src/app/ui`) and installs theme tokens. Use `--yes` in CI, `--path <dir>` for Nx or custom layouts, and `--skip-theme` to add theme tokens later.

`add` copies the selected component source into your project:

```
src/app/ui/button/
  button.ts
  button.html
  button.scss
```

Import it like any first-party component:

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

See the [five-minute quick start](#five-minute-quick-start) for the full developer journey from a fresh Angular project.

## Theming

Add `theme` (included with `init`, or `npx @ng-elemental/cli add theme`) to copy `tokens.scss` and optional `ElThemeService`. Import tokens once in global styles, then **edit the BRAND section** in `tokens.scss`:

```scss
@use './app/ui/theme/tokens';

:root {
  --el-color-primary: light-dark(#0f172a, #f8fafc);
  --el-color-on-primary: light-dark(#f8fafc, #0f172a);
  --el-color-surface: light-dark(#ffffff, #000000);
  --el-color-on-surface: light-dark(#000000, #ffffff);
}
```

Changing `--el-color-primary` updates buttons, chips, checkboxes, sliders, and other widgets. Unique sizes stay in each widget’s SCSS. Switch dark mode with `provideElTheme({ mode: 'dark' })` or `setMode('dark')` — TypeScript only toggles `data-el-theme` and `color-scheme` so `light-dark()` flips. `add theme --force` overwrites brand edits.

## Typography

Defaults are **Inter** (sans) plus a monospace stack, with a shadcn type scale in `tokens.scss` and utilities in `typography.scss` (`.el-text-h1` … `.el-text-muted`, blockquote, inline code).

```scss
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');

@use './app/ui/theme/tokens';
@use './app/ui/theme/typography';
```

Widgets use `var(--el-font-sans)` / `var(--el-font-mono)`. Override those tokens only if you need a different brand face. `init` appends the `@use` lines for tokens and typography when it finds a global stylesheet.

## Configuration

`elemental.json` controls where components are copied:

```json
{
  "componentsDir": "src/app/ui"
}
```

Change `componentsDir` during `init` (`--path` or the interactive prompt) if you prefer a different location.

## CLI reference

| Command | Description |
| --- | --- |
| `npx @ng-elemental/cli init [--yes] [--path <dir>] [--skip-theme]` | Create config, prompt for the components path, and install theme tokens |
| `npx @ng-elemental/cli list [--kind]` | Print the copy-paste catalog (name, title, kind) |
| `npx @ng-elemental/cli add <name> [--force]` | Copy a component into your project |

Use `--force` with `add` to overwrite an existing component folder.

See [packages/cli/README.md](packages/cli/README.md) for the full CLI reference.

## MCP / AI agent integration

NgElemental ships an [MCP (Model Context Protocol)](https://modelcontextprotocol.io/) server so AI coding agents — Cursor, Claude Code, VS Code Copilot, Codex, and compatible tools — can search, inspect, and install components without guessing CLI flags.

```
Human developer  →  website / docs / CLI
AI coding agent  →  MCP server  →  NgElemental knowledge
```

### Configure locally (npx transport)

```sh
# Let the MCP CLI write the config for you:
npx @ng-elemental/mcp init --client cursor
```

Supported clients: `cursor`, `claude`, `vscode`, `codex`.

Or add manually to `.cursor/mcp.json`:

```json
{
  "mcpServers": {
    "ng-elemental": {
      "command": "npx",
      "args": ["-y", "@ng-elemental/mcp"]
    }
  }
}
```

### Configure with the remote HTTP endpoint

A production MCP server is deployed at `https://ng-elemental.vercel.app/mcp` on every NgElemental release. Use the HTTP URL to avoid local `npx` startup time:

```json
{
  "mcpServers": {
    "ng-elemental": {
      "url": "https://ng-elemental.vercel.app/mcp"
    }
  }
}
```

### MCP tools

| Tool | What it does |
| --- | --- |
| `get_guidelines` | Design rules and page-integration playbook |
| `search_components` | Find widgets by name or intent |
| `list_components` | Full catalog dump |
| `get_component` | Metadata, usage, and wire-in checklist |
| `install_components` | Returns CLI commands for the agent to suggest to the user |
| `get_component_source` | Full source (TS, HTML, SCSS) to understand the API |
| `get_component_examples` | Storybook stories showing real usage patterns |
| `init_project` | Creates `elemental.json` and theme tokens |

The MCP server also exposes a resource `ng-elemental://guidelines`.

NgElemental MCP sits beside Angular CLI MCP (`npx @angular/cli mcp`). Use Angular MCP for workspace and builds; use NgElemental MCP for `El*` widgets.

See [packages/mcp/README.md](packages/mcp/README.md) for full MCP documentation.

## Component catalog

50+ accessible, production-quality Angular components distributed as source. Full API docs and live examples are on the [documentation website](https://atulfalle.github.io/ng-elemental/docs).

**Form controls**
`icon` · `button` · `label` · `form-error` · `input` · `checkbox` · `slide-toggle` · `radio` · `select` · `datepicker` · `segmented-button`

**Data display**
`chip` · `avatar` · `card` · `list` · `tree` · `table` · `progress` · `slider` · `carousel` · `skeleton` · `breadcrumb` · `attachment`

**Layout**
`container` · `stack` · `grid` · `aspect-ratio` · `scroll-area` · `separator` · `resizable`

**Navigation & overlays**
`tabs` · `stepper` · `accordion` · `menu` · `menubar` · `popover` · `dialog` · `sheet` · `drawer` · `tooltip`

**Feedback**
`alert` · `toast` · `snackbar` · `empty-state`

**Utility**
`theme` · `infinite-scroll` · `file-upload` · `pagination`

## Components

### Icon (`el-icon`)

[Font Awesome 6](https://fontawesome.com/) icons by name. Requires `@fortawesome/fontawesome-free` and a one-time CSS import — see Installation.

```html
<el-icon name="check" />
<el-icon name="github" variant="brands" />
<el-icon name="heart" variant="regular" size="lg" />
```

| Input | Type | Default | Description |
| --- | --- | --- | --- |
| `name` | `string` | (required) | Icon name without `fa-` prefix |
| `variant` | `solid` \| `regular` \| `brands` | `solid` | Font Awesome style |
| `size` | `sm` \| `md` \| `lg` | `md` | Icon size |
| `decorative` | `boolean` | `true` | Hide from assistive tech when true |
| `label` | `string` | `''` | Accessible label when not decorative |

### Button (`el-button`)

```html
<el-button variant="primary" iconStart="plus">Save</el-button>
<el-button variant="secondary" size="sm">Cancel</el-button>
<el-button variant="ghost" iconEnd="arrow-right">Next</el-button>
```

| Input | Type | Default | Description |
| --- | --- | --- | --- |
| `variant` | `primary` \| `secondary` \| `ghost` | `primary` | Visual style |
| `size` | `sm` \| `md` \| `lg` | `md` | Button size |
| `disabled` | `boolean` | `false` | Disabled state |
| `type` | `button` \| `submit` \| `reset` | `button` | Native button type |
| `iconStart` | `string` | `''` | Font Awesome icon before label |
| `iconEnd` | `string` | `''` | Font Awesome icon after label |
| `iconVariant` | `solid` \| `regular` \| `brands` | `solid` | Icon style |

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

See the [full component docs](https://atulfalle.github.io/ng-elemental) for all 50+ components.

## Packages

| Package | Published | Purpose |
| --- | --- | --- |
| [`@ng-elemental/cli`](https://www.npmjs.com/package/@ng-elemental/cli) | Yes | CLI that copies components into your app |
| [`@ng-elemental/mcp`](https://www.npmjs.com/package/@ng-elemental/mcp) | Yes | MCP server so agents can search and install those components |
| `@ng-elemental/ui` | No | Internal component source in this repository |

Install and use **`@ng-elemental/cli`** in your Angular project. See [packages/cli/README.md](packages/cli/README.md) for npm-focused documentation. Agents should use **`@ng-elemental/mcp`** — see [packages/mcp/README.md](packages/mcp/README.md).

## Contributing

Contributions are welcome — bug reports, documentation improvements, new components, accessibility fixes, and CLI/MCP enhancements all help.

- [CONTRIBUTING.md](CONTRIBUTING.md) — development setup, project layout, adding components, PR guidelines
- [ROADMAP.md](ROADMAP.md) — what the project is working toward
- [Code of Conduct](CODE_OF_CONDUCT.md)
- [GitHub Discussions](https://github.com/AtulFalle/ng-elemental/discussions) — questions, ideas, show & tell

## Support NgElemental

NgElemental is free and open source. If it saves you time or helps your project,
consider supporting its continued development. ❤️

[**Sponsor NgElemental**](https://github.com/sponsors/AtulFalle)

## Security

To report a vulnerability, see [SECURITY.md](SECURITY.md).

## License

[MIT](LICENSE) © NgElemental contributors
