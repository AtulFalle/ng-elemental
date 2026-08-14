# NgElemental

[![npm version](https://img.shields.io/npm/v/@ng-elemental/cli.svg)](https://www.npmjs.com/package/@ng-elemental/cli)
[![CI](https://github.com/AtulFalle/ng-elemental/actions/workflows/ci.yml/badge.svg)](https://github.com/AtulFalle/ng-elemental/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

Copy-paste Angular UI components for your application. Run the CLI, and component source files land in your project — you own and customize the code.

NgElemental is **not** a traditional npm UI library. Components are added as source (TypeScript, HTML, SCSS) so you can adapt styling, behavior, and structure without fighting a black-box dependency.

## Requirements

- **Angular** 22 or later
- **Node.js** 24 or later (for the CLI)

Components use encapsulated SCSS with BEM-style class names and CSS design tokens. Tailwind is not required.

## Quick start

From your Angular project:

```sh
npx @ng-elemental/cli init
npx @ng-elemental/cli add theme
npx @ng-elemental/cli add button
npx @ng-elemental/cli add <component>
```

Add `theme` first for design tokens, then copy only the components you need. See [CLI reference](#cli-reference) for available component names.

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

## Theming

Add `theme` to copy `tokens.scss` and optional `ElThemeService`. Import tokens once in global styles:

```scss
@use './app/ui/theme/tokens';

:root {
  --el-color-accent: #6366f1;
}
```

Override tokens on `:root` for global changes, on a wrapper element for scoped styling, or via `provideElTheme()` for runtime theming. Each component reads its colors from `--el-button-*`, `--el-label-*`, and related variables.

## Typography

Geist (UI) and Geist Mono (code) ship with the theme package — no separate font install. Import `tokens.scss` once and fonts load automatically. If bundled fonts are unavailable, components fall back to the system UI stack (`system-ui`, `Segoe UI`, `Roboto`, etc.).

```scss
@use './app/ui/theme/tokens';
```

Override `--el-font-sans` or `--el-font-mono` on `:root` to use your own typeface.

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

Available components: `theme`, `icon`, `button`, `label`, `checkbox`, `radio`, `chip`, `segmented-button`.

Use `--force` to overwrite an existing component folder.

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

### Checkbox (`el-checkbox`)

```html
<el-checkbox [(checked)]="accepted" inputId="terms">
  Accept terms and conditions
</el-checkbox>

<el-checkbox labelPosition="left" [(checked)]="newsletter" inputId="newsletter">
  Send me updates
</el-checkbox>
```

| Input | Type | Default | Description |
| --- | --- | --- | --- |
| `checked` | `boolean` | `false` | Checked state (two-way bindable) |
| `indeterminate` | `boolean` | `false` | Mixed selection state |
| `disabled` | `boolean` | `false` | Non-interactive state |
| `error` | `boolean` | `false` | Error styling |
| `labelPosition` | `left` \| `right` | `right` | Label text placement |
| `inputId` | `string` | `''` | Native input id |

### Radio (`el-radio-group`, `el-radio`)

```html
<el-radio-group [(value)]="contact" direction="vertical" ariaLabel="Contact method">
  <el-radio value="email" inputId="contact-email">Email</el-radio>
  <el-radio value="phone" inputId="contact-phone">Phone</el-radio>
</el-radio-group>

<el-radio labelPosition="left" value="option-a" inputId="option-a">
  Label on the left
</el-radio>
```

**`el-radio-group`**

| Input | Type | Default | Description |
| --- | --- | --- | --- |
| `value` | `string` | `''` | Selected value (two-way bindable) |
| `direction` | `vertical` \| `horizontal` | `vertical` | Group layout |
| `disabled` | `boolean` | `false` | Disables all radios |
| `name` | `string` | `''` | Shared form name (auto-generated when omitted) |
| `ariaLabel` | `string` | — | Accessible group label |

**`el-radio`**

| Input | Type | Default | Description |
| --- | --- | --- | --- |
| `value` | `string` | required | Value when selected |
| `labelPosition` | `left` \| `right` | `right` | Label text placement |
| `disabled` | `boolean` | `false` | Non-interactive state |
| `inputId` | `string` | `''` | Native input id |

### Chip (`el-chip`)

Material Design 3 chips for assist actions, filters, and suggestions.

```html
<el-chip type="assist">Assist</el-chip>
<el-chip type="filter" [(selected)]="active">Filter</el-chip>
<el-chip type="suggestion" appearance="filled" iconStart="check">With check</el-chip>
<el-chip type="suggestion" appearance="filled" [removable]="true" (removed)="onRemove()">Tag</el-chip>
```

| Input | Type | Default | Description |
| --- | --- | --- | --- |
| `type` | `assist` \| `filter` \| `suggestion` | `assist` | Chip category |
| `appearance` | `outlined` \| `filled` \| `elevated` | `outlined` | Surface style for suggestion chips |
| `iconStart` | `string` | `''` | Font Awesome start icon (filter chips show check when selected) |
| `selected` | `boolean` | `false` | Selection state for filter chips (two-way bindable) |
| `disabled` | `boolean` | `false` | Non-interactive state |
| `removable` | `boolean` | `false` | Shows Font Awesome close icon at the end |
| `removeLabel` | `string` | `Remove` | Accessible label for close button |

| Output | Description |
| --- | --- |
| `removed` | Emitted when the close button is clicked |

Requires the `icon` component when using `iconStart` or `removable`.

### Segmented Button (`el-segmented-button`)

```html
<el-segmented-button [(value)]="view" ariaLabel="View mode">
  <el-segmented-button-item value="list">List</el-segmented-button-item>
  <el-segmented-button-item value="grid">Grid</el-segmented-button-item>
</el-segmented-button>
```

**`el-segmented-button`**

| Input | Type | Default | Description |
| --- | --- | --- | --- |
| `value` | `string` | `''` | Selected segment value (two-way bindable) |
| `variant` | `primary` \| `secondary` \| `ghost` | `secondary` | Visual style (matches Button) |
| `size` | `sm` \| `md` \| `lg` | `md` | Control size |
| `disabled` | `boolean` | `false` | Disables the entire group |
| `ariaLabel` | `string` | — | Accessible label for the radiogroup |

**`el-segmented-button-item`**

| Input | Type | Default | Description |
| --- | --- | --- | --- |
| `value` | `string` | (required) | Unique segment value |
| `disabled` | `boolean` | `false` | Disables this segment |

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
