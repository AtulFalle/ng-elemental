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
npx @ng-elemental/cli add button
npx @ng-elemental/cli add <component>
```

`init` asks where to copy components (default: `src/app/ui`) and installs theme tokens so widgets pick up color, spacing, and typography. Use `--yes` in CI, `--path <dir>` for Nx or custom layouts, and `--skip-theme` if you will add theme later.

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

Add `theme` (included with `init`, or `npx @ng-elemental/cli add theme`) to copy `tokens.scss` and optional `ElThemeService`. Import tokens once in global styles, then **edit the BRAND section** in `tokens.scss`:

```scss
@use './app/ui/theme/tokens';

:root {
  --el-color-primary: light-dark(#5f479b, #d0bcff);
  --el-color-on-primary: light-dark(#ffffff, #381e72);
  --el-color-surface: light-dark(#fffbfe, #1c1b1f);
  --el-color-on-surface: light-dark(#1c1b1f, #e6e1e5);
}
```

Changing `--el-color-primary` updates buttons, chips, checkboxes, sliders, and other widgets. Unique sizes stay in each widget’s SCSS. Switch dark mode with `provideElTheme({ mode: 'dark' })` or `setMode('dark')` — TypeScript only toggles `data-el-theme` and `color-scheme` so `light-dark()` flips. `add theme --force` overwrites brand edits.

## Typography

Widgets use `var(--el-font-sans)` and `var(--el-font-mono)`, which default to inherit / system fonts so they match the consumer app. Load your brand typeface (Google Fonts, `@fontsource`, or a self-hosted file) and point the tokens at it:

```scss
@use './app/ui/theme/tokens';

:root {
  --el-font-sans: 'Inter', system-ui, sans-serif;
  --el-font-mono: 'JetBrains Mono', ui-monospace, monospace;
}
```

`init` appends this comment block to your global stylesheet when it finds one.

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

Available components: `theme`, `icon`, `button`, `label`, `form-error`, `input`, `checkbox`, `slide-toggle`, `radio`, `select`, `datepicker`, `chip`, `progress`, `slider`, `carousel`, `avatar`, `card`, `container`, `stack`, `grid`, `aspect-ratio`, `scroll-area`, `separator`, `resizable`, `list`, `tree`, `infinite-scroll`, `tabs`, `accordion`, `table`, `pagination`, `skeleton`, `breadcrumb`, `tooltip`, `menu`, `menubar`, `popover`, `dialog`, `sheet`, `drawer`, `alert`, `toast`, `snackbar`, `empty-state`, `segmented-button`.

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

### Form Error (`el-form-error`)

Presentational validation message. Compose with `el-label` and any control; wire `[error]` and `aria-describedby` yourself.

```html
<el-label htmlFor="email" required>Email</el-label>
<el-input
  inputId="email"
  [(value)]="email"
  [error]="invalid"
  [attr.aria-describedby]="invalid ? 'email-err' : null"
/>
@if (invalid) {
  <el-form-error id="email-err">Email is required</el-form-error>
}
```

Host uses `role="alert"`. Optional host `id` for `aria-describedby`. Token: `--el-form-error-fg`.

### Input (`el-input`)

Text field primitive. Pair with `el-label` for a caption and `el-form-error` for message text. Mask is optional.

```html
<el-input [(value)]="email" type="email" placeholder="you@example.com" inputId="email" />

<el-input [(value)]="search" type="search" placeholder="Search" inputId="search">
  <el-icon elInputPrefix name="magnifying-glass" size="sm" />
</el-input>

<el-input [(value)]="phone" type="tel" mask="(000) 000-0000" placeholder="Phone" inputId="phone" />
```

| Input | Type | Default | Description |
| --- | --- | --- | --- |
| `value` | `string` | `''` | Display value (two-way bindable), including mask literals |
| `type` | `text` \| `email` \| `password` \| `tel` \| `url` \| `search` \| `number` | `text` | Native input type |
| `mask` | `string` | `''` | Optional pattern: `0` digit, `A` letter, `*` alphanumeric. Ignored for `number` |
| `size` | `sm` \| `md` \| `lg` | `md` | Field size |
| `placeholder` | `string` | `''` | Native placeholder |
| `disabled` | `boolean` | `false` | Non-interactive state |
| `readOnly` | `boolean` | `false` | Native read-only state |
| `error` | `boolean` | `false` | Error border and `aria-invalid` |
| `inputId` | `string` | `''` | Native input id |

Prefix/suffix: project content with `elInputPrefix` / `elInputSuffix`. Icons need the `icon` component.

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

Requires the `icon` component (Font Awesome check mark).

### Slide Toggle (`el-slide-toggle`)

```html
<el-slide-toggle [(checked)]="enabled" inputId="notifications">
  Notifications
</el-slide-toggle>

<el-slide-toggle labelPosition="left" size="sm" [(checked)]="wifi" inputId="wifi">
  Wi-Fi
</el-slide-toggle>

<el-slide-toggle [(checked)]="darkMode" inputId="dark-mode">
  <el-icon elSlideToggleTrackOnIcon name="check" size="sm" />
  <el-icon elSlideToggleTrackOffIcon name="xmark" size="sm" />
  Dark mode
</el-slide-toggle>

<el-slide-toggle [(checked)]="alerts" inputId="alerts">
  <el-icon elSlideToggleThumbOnIcon name="check" size="sm" />
  <el-icon elSlideToggleThumbOffIcon name="xmark" size="sm" />
  Alerts
</el-slide-toggle>
```

| Input | Type | Default | Description |
| --- | --- | --- | --- |
| `checked` | `boolean` | `false` | On/off state (two-way bindable) |
| `size` | `sm` \| `md` \| `lg` | `md` | Track and thumb size |
| `disabled` | `boolean` | `false` | Non-interactive state |
| `labelPosition` | `left` \| `right` | `right` | Inline text placement |
| `inputId` | `string` | `''` | Native input id |

Optional icons: `elSlideToggleTrackOnIcon` / `elSlideToggleTrackOffIcon` sit in the track; `elSlideToggleThumbOnIcon` / `elSlideToggleThumbOffIcon` sit in the thumb (add `icon` first). The track adds horizontal padding when any icon slot has content. Field label, error, and value accessors are out of scope for this primitive.

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

### Select (`el-select`, `el-select-item`)

Combobox with an open panel slot. Item bodies and the closed trigger are templates.

```html
<el-select [(value)]="city" placeholder="Choose a city" ariaLabel="City">
  <el-select-item value="pune" label="Pune">Pune</el-select-item>
  <el-select-item value="mumbai" label="Mumbai">Mumbai</el-select-item>
</el-select>

<el-select multiple [(value)]="cities" placeholder="Choose cities" ariaLabel="Cities">
  <el-select-item value="pune" label="Pune">Pune</el-select-item>
  <el-select-item value="mumbai" label="Mumbai">Mumbai</el-select-item>
</el-select>
```

**`el-select`**

| Input | Type | Default | Description |
| --- | --- | --- | --- |
| `value` | `string` \| `string[]` | `''` | Selected value (two-way bindable) |
| `multiple` | `boolean` | `false` | Checkboxes plus Select all / Unselect all |
| `size` | `sm` \| `md` \| `lg` | `md` | Trigger size |
| `placeholder` | `string` | `Select` | Trigger text when empty |
| `disabled` | `boolean` | `false` | Disables the control |
| `ariaLabel` | `string` | — | Accessible combobox name |

**`el-select-item`**

| Input | Type | Default | Description |
| --- | --- | --- | --- |
| `value` | `string` | required | Value when selected |
| `label` | `string` | `''` | Trigger text (falls back to `value`) |
| `disabled` | `boolean` | `false` | Non-interactive option |

Optional `ng-template elSelectValue` replaces the trigger string. `el-select-group` labels sections and is not selectable.

Requires the `icon` component for the trigger chevron and selected check marks.

### Date Picker (`el-date-picker`)

Calendar and analog clock. Type `DD-MM-YYYY` / `HH:MM` or pick from the grid and dial. Click the month or year in the calendar header to jump. Requires `icon`, `input`, and `segmented-button`.

```html
<el-date-picker [(value)]="when" mode="date" placeholder="Select date" />
<el-date-picker [(value)]="when" mode="time" hourCycle="h12" />
<el-date-picker [(value)]="when" mode="datetime" />
```

| Input | Type | Default | Description |
| --- | --- | --- | --- |
| `value` | `Date \| null` | `null` | Selected local date/time (two-way) |
| `mode` | `date` \| `time` \| `datetime` | `date` | Calendar, clock, or both |
| `hourCycle` | `h12` \| `h23` | `h12` | 12-hour AM/PM or 24-hour dial |
| `minuteStep` | `number` | `5` | Minute ticks on the analog dial |
| `min` | `Date \| null` | `null` | Earliest selectable day |
| `max` | `Date \| null` | `null` | Latest selectable day |
| `locale` | `string` | — | Weekday names and month title |
| `size` | `sm` \| `md` \| `lg` | `md` | Trigger size |
| `placeholder` | `string` | `Select date` | Trigger text when empty |
| `disabled` | `boolean` | `false` | Disables the control |
| `ariaLabel` | `string` | — | Accessible trigger name |

Date fields are always `DD-MM-YYYY`. The trigger uses the same format (plus time when `mode` includes time).

### Date Range Picker (`el-date-range-picker`)

Same two-month calendar as Date Picker, no time. Ships with `add datepicker`. Click start then end, or type From / To as `DD-MM-YYYY`. Use the arrows or month/year labels to move across months.

```html
<el-date-range-picker [(value)]="range" placeholder="Select date range" />
```

| Input | Type | Default | Description |
| --- | --- | --- | --- |
| `value` | `{ start: Date \| null; end: Date \| null }` | `{ start: null, end: null }` | Selected range (two-way) |
| `min` | `Date \| null` | `null` | Earliest selectable day |
| `max` | `Date \| null` | `null` | Latest selectable day |
| `locale` | `string` | — | Weekday names and month title |
| `size` | `sm` \| `md` \| `lg` | `md` | Trigger size |
| `placeholder` | `string` | `Select date range` | Trigger text when empty |
| `disabled` | `boolean` | `false` | Disables the control |
| `ariaLabel` | `string` | — | Accessible trigger name |

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
| `color` | `neutral` \| `success` \| `error` \| `warning` \| `info` | `neutral` | Semantic tone; filled uses container tokens |
| `iconStart` | `string` | `''` | Font Awesome start icon (filter chips show check when selected) |
| `selected` | `boolean` | `false` | Selection state for filter chips (two-way bindable) |
| `disabled` | `boolean` | `false` | Non-interactive state |
| `removable` | `boolean` | `false` | Shows Font Awesome close icon at the end |
| `removeLabel` | `string` | `Remove` | Accessible label for close button |

| Output | Description |
| --- | --- |
| `removed` | Emitted when the close button is clicked |

Requires the `icon` component when using `iconStart` or `removable`.

### Progress (`el-progress`, `el-progress-circle`)

Line and circle progress indicators. Determinate (`value` / `max`) or indeterminate animation. Optional percent label via `showValue`.

```html
<el-progress [value]="42" showValue />
<el-progress indeterminate />

<el-progress-circle [value]="72" showValue size="lg" />
<el-progress-circle indeterminate />
```

| Input | Type | Default | Description |
| --- | --- | --- | --- |
| `value` | `number` | `0` | Current progress (clamped to 0…max) |
| `max` | `number` | `100` | Upper bound |
| `indeterminate` | `boolean` | `false` | Animated unknown progress |
| `showValue` | `boolean` | `false` | Show rounded percent when determinate |
| `size` | `sm` \| `md` \| `lg` | `md` | Track thickness or circle diameter |

### Slider (`el-slider`)

Horizontal value picker. Single thumb via `[(value)]`, or dual thumbs with `range` + `[(start)]` / `[(end)]`. Optional step ticks and value labels.

```html
<el-slider [(value)]="volume" [min]="0" [max]="100" showValue />
<el-slider
  range
  [(start)]="minPrice"
  [(end)]="maxPrice"
  [step]="5"
  showTicks
  showValue
/>
```

| Input | Type | Default | Description |
| --- | --- | --- | --- |
| `value` | `number` (model) | `0` | Single-thumb value |
| `start` / `end` | `number` (model) | `0` / `100` | Range thumbs when `range` is set |
| `min` / `max` | `number` | `0` / `100` | Bounds |
| `step` | `number` | `1` | Snap increment |
| `range` | `boolean` | `false` | Dual-thumb mode |
| `showTicks` | `boolean` | `false` | Tick marks at each step (density capped) |
| `showValue` | `boolean` | `false` | Value label above each thumb |
| `size` | `sm` \| `md` \| `lg` | `md` | Track and thumb size |
| `disabled` | `boolean` | `false` | Disable interaction |
| `error` | `boolean` | `false` | Error styling |

### Carousel (`el-carousel`)

Slide track with previous/next controls and dots. Optional loop, autoplay, peek of adjacent slides, and pointer drag. Requires `icon` and `button`. This is not `el-slider`.

```html
<el-carousel [(index)]="i" loop [autoplay]="4000" [peek]="24" ariaLabel="Screenshots">
  <el-carousel-slide>
    <img src="dashboard.png" alt="Dashboard" />
  </el-carousel-slide>
  <el-carousel-slide>Two</el-carousel-slide>
</el-carousel>
```

**`el-carousel`**

| Input | Type | Default | Description |
| --- | --- | --- | --- |
| `index` | `number` (model) | `0` | Active slide |
| `loop` | `boolean` | `false` | Wrap at the ends |
| `autoplay` | `number` | `0` | Interval in ms; `0` is off (pauses on hover/focus/drag) |
| `peek` | `number` | `0` | Pixels of neighboring slides visible |
| `size` | `sm` \| `md` \| `lg` | `md` | Prev/next control size |
| `disabled` | `boolean` | `false` | Block interaction |
| `ariaLabel` | `string` | — | Accessible name |

### Avatar (`el-avatar`)

Circular image / initials / icon mark. Content priority: `src` → `initials` → `icon` (default `user`). Image errors fall through to the next option.

```html
<el-avatar src="/me.jpg" alt="Jane Doe" />
<el-avatar initials="JD" alt="Jane Doe" />
<el-avatar icon="user" alt="Account" size="sm" />
```

| Input | Type | Default | Description |
| --- | --- | --- | --- |
| `src` | `string` | `''` | Image URL |
| `alt` | `string` | `''` | Accessible name |
| `initials` | `string` | `''` | Fallback text when no usable image |
| `icon` | `string` | `''` | FA name when no image/initials; defaults to `user` |
| `size` | `sm` \| `md` \| `lg` | `md` | Diameter |

Requires the `icon` component for the icon fallback (`npx @ng-elemental/cli add icon`).

### Card (`el-card`)

Presentational container with named slots. Not interactive — wire clicks on content inside the slots.

```html
<el-card appearance="outlined">
  <img elCardMedia src="/cover.jpg" alt="" />
  <div elCardHeader>Title</div>
  <div elCardContent>Body</div>
  <div elCardFooter>Actions</div>
</el-card>

<el-card size="compact">
  <el-icon elCardMedia name="file-lines" />
  <div elCardHeader>report.pdf</div>
  <div elCardContent>2.4 MB</div>
  <div elCardFooter>
    <el-button variant="ghost" size="sm" iconStart="xmark" ariaLabel="Remove" />
  </div>
</el-card>
```

| Input | Type | Default | Description |
| --- | --- | --- | --- |
| `appearance` | `outlined` \| `elevated` | `outlined` | Border or shadow surface |
| `size` | `default` \| `compact` | `default` | Compact = horizontal row for dense lists |

| Slot attribute | Description |
| --- | --- |
| `elCardMedia` | Top media (default) or leading icon/thumb (compact) |
| `elCardHeader` | Header region |
| `elCardContent` | Body |
| `elCardFooter` | Footer |

Compose with `el-avatar` / `el-icon` / `el-button` in slots when needed (separate `add` packages).

### Container (`el-container`)

Centered max-width wrapper. Presentational — project any content.

```html
<el-container size="lg">Page content</el-container>
```

| Input | Type | Default | Description |
| --- | --- | --- | --- |
| `size` | `sm` \| `md` \| `lg` \| `xl` \| `full` | `lg` | Max width (`40rem` / `48rem` / `64rem` / `80rem` / none) |
| `padded` | `boolean` | `true` | Horizontal padding from `--el-space-4` |

### Stack (`el-stack`)

Flex row or column. Gap uses density tokens (`--el-space-*`).

```html
<el-stack gap="4">
  <div>One</div>
  <div>Two</div>
</el-stack>
```

| Input | Type | Default | Description |
| --- | --- | --- | --- |
| `direction` | `row` \| `column` | `column` | Flex direction |
| `gap` | `1` \| `2` \| `3` \| `4` \| `5` \| `6` \| `8` | `4` | Token gap |
| `align` | `start` \| `center` \| `end` \| `stretch` | `stretch` | `align-items` |
| `justify` | `start` \| `center` \| `end` \| `between` | `start` | `justify-content` |
| `wrap` | `boolean` | `false` | Allow wrapping |

### Grid (`el-grid`)

CSS grid. Set `minItemWidth` for responsive auto-fit; otherwise `columns` is used.

```html
<el-grid [columns]="3" gap="4">
  <div>One</div>
  <div>Two</div>
  <div>Three</div>
</el-grid>
```

| Input | Type | Default | Description |
| --- | --- | --- | --- |
| `columns` | `number` | `1` | Column count when `minItemWidth` is unset |
| `gap` | `1` \| `2` \| `3` \| `4` \| `5` \| `6` \| `8` | `4` | Token gap |
| `minItemWidth` | `string` | — | When set, `repeat(auto-fit, minmax(…, 1fr))` |

### Aspect Ratio (`el-aspect-ratio`)

Locks a box to a CSS `aspect-ratio`. The default slot fills the box.

```html
<el-aspect-ratio ratio="16/9">
  <img src="/cover.jpg" alt="" style="width: 100%; height: 100%; object-fit: cover" />
</el-aspect-ratio>
```

| Input | Type | Default | Description |
| --- | --- | --- | --- |
| `ratio` | `string` | `16/9` | CSS `aspect-ratio` value |

### Scroll Area (`el-scroll-area`)

Native overflow with a styled scrollbar. Set a height (or width) on the host so it can scroll.

```html
<el-scroll-area ariaLabel="Notes" style="height: 12rem">
  Long content…
</el-scroll-area>
```

| Input | Type | Default | Description |
| --- | --- | --- | --- |
| `orientation` | `vertical` \| `horizontal` \| `both` | `vertical` | Overflow axis |
| `ariaLabel` | `string` | — | Accessible name for the region |

### Separator (`el-separator`)

Horizontal or vertical rule. Distinct from `el-menu-separator`.

```html
<el-separator />
<el-separator orientation="vertical" />
```

| Input | Type | Default | Description |
| --- | --- | --- | --- |
| `orientation` | `horizontal` \| `vertical` | `horizontal` | Axis |
| `decorative` | `boolean` | `true` | `aria-hidden`; set `false` for a meaningful separator |

### Resizable (`el-resizable`)

Split panes. The group owns sizes; drag or arrow-key the handle. Default slot on each panel; handle slot is optional for a custom grip.

```html
<el-resizable>
  <el-resizable-panel [defaultSize]="30" [min]="15">A</el-resizable-panel>
  <el-resizable-handle />
  <el-resizable-panel [min]="20">B</el-resizable-panel>
</el-resizable>
```

| Input | Type | Default | Description |
| --- | --- | --- | --- |
| `orientation` (group) | `horizontal` \| `vertical` | `horizontal` | Split axis |
| `defaultSize` (panel) | `number` | equal share | Initial percent |
| `min` / `max` (panel) | `number` | `10` / `100` | Percent constraints |
| `disabled` (handle) | `boolean` | `false` | Blocks pointer and keyboard |
| `ariaLabel` (handle) | `string` | `Resize` | Accessible name |

### List (`el-list`)

Stacked rows with optional leading media, title, description, and trailing meta. Selection is parent-owned.

```html
<el-list ariaLabel="Inbox">
  <el-list-item>
    <el-avatar elListLeading initials="AL" alt="Ada Lovelace" />
    <span elListTitle>Ada Lovelace</span>
    <span elListDescription>Notes on the Analytical Engine</span>
    <span elListTrailing>09:12</span>
  </el-list-item>
  <el-list-item interactive [selected]="active" (activated)="select()">
    Inbox
  </el-list-item>
</el-list>
```

**`el-list`**

| Input | Type | Default | Description |
| --- | --- | --- | --- |
| `appearance` | `outlined` \| `plain` | `outlined` | Bordered surface or flush rows |
| `size` | `sm` \| `md` \| `lg` | `md` | Density |
| `divided` | `boolean` | `true` | Hairline separators |
| `virtual` | `boolean` | `false` | Windowed rows from `[items]` (fixed `itemHeight`; set a max-height) |
| `items` | `object[]` | `[]` | Data for virtual mode |
| `track` | `string` | `id` | Identity property in virtual mode |
| `itemHeight` | `number` | `56` | Fixed row height in pixels |
| `overscan` | `number` | `5` | Extra rows above and below the viewport |
| `ariaLabel` | `string` | — | Accessible name |

Virtual lists use `<ng-template elListItemDef let-item>` instead of projected rows. Requires a bounded height on `el-list`.

**`el-list-item`**

| Input | Type | Default | Description |
| --- | --- | --- | --- |
| `interactive` | `boolean` | `false` | Focusable row; emits `activated` |
| `selected` | `boolean` | `false` | Parent-owned highlight |
| `disabled` | `boolean` | `false` | Dim and block activation |

| Slot attribute | Description |
| --- | --- |
| `elListLeading` | Avatar, icon, or thumbnail |
| `elListTitle` | Primary line |
| `elListDescription` | Secondary line |
| `elListTrailing` | Meta, chip, or action |

Unslotted content lands in the body. Optional compose with `avatar`, `icon`, `chip`, `button`.

### Tree (`el-tree`)

Nested files-and-folders rows. The parent owns `expanded` and `checked`. Requires `icon`, `checkbox`, and `button`.

```html
<el-tree [(expanded)]="open" [(checked)]="checked" checkbox ariaLabel="Files">
  <el-tree-item value="docs" label="Documents">
    <el-icon elTreeLeading name="folder" />
    <span elTreeActions>
      <el-button size="sm" variant="ghost" iconStart="ellipsis-vertical" />
    </span>
    <el-tree-item value="resume" label="Resume.pdf" />
  </el-tree-item>
</el-tree>
```

**`el-tree`**

| Input | Type | Default | Description |
| --- | --- | --- | --- |
| `appearance` | `outlined` \| `plain` | `outlined` | Bordered surface or flush rows |
| `size` | `sm` \| `md` \| `lg` | `md` | Density |
| `checkbox` | `boolean` | `false` | Cascade checkboxes with computed indeterminate |
| `expanded` | `string[]` | `[]` | Open node ids (`model`) |
| `checked` | `string[]` | `[]` | Checked subtree roots (`model`) |
| `nodes` | `ElTreeNode[]` | `[]` | Data mode (virtual, lazy, load more) |
| `virtual` | `boolean` | `false` | Window flattened visible rows (set a max-height) |
| `itemHeight` | `number` | `36` | Fixed virtual row height |
| `overscan` | `number` | `5` | Extra rows above and below the viewport |
| `loadingIds` | `string[]` | `[]` | Node ids currently loading children |
| `hasMore` | `boolean` | `false` | Root Load more control in data mode |
| `ariaLabel` | `string` | — | Accessible name |
| `disabled` | `boolean` | `false` | Block interaction |

Checking a parent checks descendants. A mixed parent is indeterminate. Expanding a node with `hasChildren` and no `children` emits `loadChildren`. A node `hasMore` flag emits `loadMore` after its visible children.

Virtual trees use `<ng-template elTreeNodeDef let-node>` instead of projected rows.

**`el-tree-item`**

| Input | Type | Default | Description |
| --- | --- | --- | --- |
| `value` | `string` | required | Node id |
| `label` | `string` | `''` | Default label |
| `icon` | `string` | `''` | Fallback leading icon |
| `hasChildren` | `boolean` | `false` | Show expand chevron without nested items |
| `disabled` | `boolean` | `false` | Dim and block interaction |

| Slot attribute | Description |
| --- | --- |
| `elTreeLeading` | Icon or thumbnail |
| `elTreeActions` | Trailing row action |

### Menu (`el-menu`)

Command menu with nested panels. Requires `icon` (and usually `button` for the trigger). Use Popover for arbitrary content and Tooltip for short hover text.

```html
<el-menu ariaLabel="Actions">
  <el-button elMenuTrigger variant="secondary">Actions</el-button>
  <el-menu-panel>
    <el-menu-item icon="scissors">Cut</el-menu-item>
    <el-menu>
      <el-menu-item elMenuTrigger>Share</el-menu-item>
      <el-menu-panel>
        <el-menu-item>Email</el-menu-item>
      </el-menu-panel>
    </el-menu>
    <el-menu-separator />
    <el-menu-item variant="danger">Delete</el-menu-item>
  </el-menu-panel>
</el-menu>
```

**`el-menu`**

| Input | Type | Default | Description |
| --- | --- | --- | --- |
| `open` | `boolean` | `false` | Open state (`model`) |
| `trigger` | `click` \| `contextmenu` | `click` | Click toggle or pointer-anchored context menu |
| `disabled` | `boolean` | `false` | Blocks opening |
| `ariaLabel` | `string` | — | Accessible name |

**`el-menu-item`**

| Input | Type | Default | Description |
| --- | --- | --- | --- |
| `type` | `item` \| `checkbox` \| `radio` | `item` | Command or parent-owned check |
| `checked` | `boolean` | `false` | Parent-owned check |
| `icon` | `string` | `''` | Leading Font Awesome name |
| `shortcut` | `string` | `''` | Display-only hint |
| `variant` | `default` \| `danger` | `default` | Danger uses error color |
| `disabled` | `boolean` | `false` | Dim and block activation |

Emits `selected`. Nested `el-menu` + `elMenuTrigger` on an item opens a submenu.

### Menubar (`el-menubar`)

Horizontal application bar that owns which top-level menu is open. Requires `menu`, `icon`, and `button`.

```html
<el-menubar ariaLabel="Application">
  <el-menu>
    <el-button elMenuTrigger variant="ghost" size="sm">File</el-button>
    <el-menu-panel>
      <el-menu-item>New</el-menu-item>
    </el-menu-panel>
  </el-menu>
</el-menubar>
```

| Input | Type | Default | Description |
| --- | --- | --- | --- |
| `size` | `sm` \| `md` \| `lg` | `md` | Bar density |
| `ariaLabel` | `string` | — | Accessible name |

### Popover (`el-popover`)

Floating overlay for arbitrary content. Not a menu and not a tooltip.

```html
<el-popover>
  <el-button elPopoverTrigger>Details</el-button>
  <el-popover-panel>
    <span elPopoverTitle>Assignee</span>
    Ada Lovelace
  </el-popover-panel>
</el-popover>
```

| Input | Type | Default | Description |
| --- | --- | --- | --- |
| `open` | `boolean` | `false` | Open state (`model`) |
| `position` | `top` \| `bottom` \| `start` \| `end` | `bottom` | Preferred placement; overflow flips |
| `trigger` | `click` \| `hover` | `click` | Click toggle or hover-card |
| `modal` | `boolean` | `false` | Backdrop and focus into the panel |
| `arrow` | `boolean` | `true` | Arrow toward the trigger |
| `disabled` | `boolean` | `false` | Prevents opening |
| `ariaLabel` | `string` | — | Name when there is no title slot |

`elPopoverClose` on a control dismisses the panel.

### Dialog (`el-dialog`)

Modal overlay on a native `<dialog>` (`showModal()`). Header and footer stay put; only content scrolls so the shell remains on screen. Requires `icon` (and usually `button`).

```html
<el-button (click)="open.set(true)">Edit</el-button>
<el-dialog [(open)]="open" title="Edit profile" size="md">
  <div elDialogContent>Any HTML or components.</div>
  <div elDialogFooter>
    <el-button elDialogClose variant="ghost">Cancel</el-button>
    <el-button>Save</el-button>
  </div>
</el-dialog>
```

```ts
const ref = this.dialog.open(EditUserDialog, {
  data: { userId: 1 },
  title: 'Edit user',
});
const saved = await ref.afterClosed;
```

**`el-dialog`**

| Input | Type | Default | Description |
| --- | --- | --- | --- |
| `open` | `boolean` | `false` | Open state (`model`) |
| `title` | `string` | `''` | Header text when `elDialogHeader` is omitted |
| `size` | `sm` \| `md` \| `lg` | `md` | Panel width |
| `closable` | `boolean` | `true` | Header close button |
| `closeOnBackdrop` | `boolean` | `true` | Dismiss on backdrop click |
| `closeOnEscape` | `boolean` | `true` | Dismiss on Escape |
| `ariaLabel` | `string` | — | Name when there is no title |

`ElDialogService.open()` mounts the same shell on `document.body` and injects `EL_DIALOG_DATA` plus `ElDialogRef` into the custom component. `elDialogClose` dismisses (no result). Call `dialogRef.close(result)` to return a value.

### Sheet (`el-sheet`)

Edge panel (default bottom). Header and footer stay put; only content scrolls. Requires `icon` (and usually `button`).

```html
<el-button (click)="open.set(true)">Filters</el-button>
<el-sheet [(open)]="open" title="Filters" side="bottom" size="md">
  <div elSheetContent>Any HTML or components.</div>
  <div elSheetFooter>
    <el-button elSheetClose variant="ghost">Cancel</el-button>
    <el-button>Apply</el-button>
  </div>
</el-sheet>
```

```ts
const ref = this.sheet.open(EditFilters, {
  data: { userId: 1 },
  title: 'Filters',
  side: 'bottom',
});
const applied = await ref.afterClosed;
```

**`el-sheet`**

| Input | Type | Default | Description |
| --- | --- | --- | --- |
| `open` | `boolean` | `false` | Open state (`model`) |
| `title` | `string` | `''` | Header text when `elSheetHeader` is omitted |
| `side` | `top` \| `right` \| `bottom` \| `left` | `bottom` | Edge the panel attaches to |
| `size` | `sm` \| `md` \| `lg` | `md` | Max-height (top/bottom) or width (left/right) |
| `closable` | `boolean` | `true` | Header close button |
| `closeOnBackdrop` | `boolean` | `true` | Dismiss on backdrop click |
| `closeOnEscape` | `boolean` | `true` | Dismiss on Escape |
| `ariaLabel` | `string` | — | Name when there is no title |

`ElSheetService.open()` mounts the same shell on `document.body` and injects `EL_SHEET_DATA` plus `ElSheetRef`.

### Drawer (`el-drawer`)

Full-height side panel (default left) with focus trap, Escape, and backdrop dismiss. Requires `icon` (and usually `button`).

```html
<el-button (click)="open.set(true)">Menu</el-button>
<el-drawer [(open)]="open" title="Navigation" side="left" size="md">
  <div elDrawerContent>Any HTML or components.</div>
  <div elDrawerFooter>
    <el-button elDrawerClose variant="ghost">Close</el-button>
  </div>
</el-drawer>
```

```ts
const ref = this.drawer.open(WorkspaceDrawer, {
  data: { workspace: 'Acme' },
  title: 'Workspace',
});
const saved = await ref.afterClosed;
```

**`el-drawer`**

| Input | Type | Default | Description |
| --- | --- | --- | --- |
| `open` | `boolean` | `false` | Open state (`model`) |
| `title` | `string` | `''` | Header text when `elDrawerHeader` is omitted |
| `side` | `left` \| `right` | `left` | Edge the panel attaches to |
| `size` | `sm` \| `md` \| `lg` | `md` | Panel width |
| `closable` | `boolean` | `true` | Header close button |
| `closeOnBackdrop` | `boolean` | `true` | Dismiss on backdrop click |
| `closeOnEscape` | `boolean` | `true` | Dismiss on Escape |
| `ariaLabel` | `string` | — | Name when there is no title |

`ElDrawerService.open()` mounts the same shell on `document.body` and injects `EL_DRAWER_DATA` plus `ElDrawerRef`.

### Infinite Scroll (`[elInfiniteScroll]`)

Attribute directive for paginated feeds. The parent owns items, loading, and “no more pages”. Demo it with `el-list`.

```html
<div
  elInfiniteScroll
  [disabled]="loading()"
  [complete]="done()"
  (loadMore)="loadPage()"
  style="max-height: 24rem; overflow: auto"
>
  <el-list>
    @for (item of items(); track item.id) {
      <el-list-item>{{ item.title }}</el-list-item>
    }
  </el-list>
</div>
```

| Input | Type | Default | Description |
| --- | --- | --- | --- |
| `disabled` | `boolean` | `false` | Skip `loadMore` while a page is in flight |
| `complete` | `boolean` | `false` | Stop when the last page is loaded |
| `rootMargin` | `string` | `'160px'` | IntersectionObserver rootMargin |
| `threshold` | `number` | `0` | IntersectionObserver threshold |
| `root` | `host` \| `viewport` | `host` | Scroll root (host needs overflow + max-height) |

Put `overflow: auto` and a max height on the host when `root="host"`. Pair with `list` for rows (`ng-elemental add list`).

### Attachment (`el-attachment`)

Presentational file/image card with upload display states. Requires `icon` and `button`.

```html
<el-attachment state="uploading">
  <el-attachment-media>
    <el-icon name="file-lines" />
  </el-attachment-media>
  <el-attachment-content>
    <el-attachment-title>design-system.zip</el-attachment-title>
    <el-attachment-description>Uploading · 64%</el-attachment-description>
  </el-attachment-content>
  <el-attachment-actions>
    <el-attachment-action ariaLabel="Cancel upload" />
  </el-attachment-actions>
</el-attachment>
```

| Input | Type | Default | Description |
| --- | --- | --- | --- |
| `state` | `idle` \| `uploading` \| `processing` \| `error` \| `done` | `done` | Lifecycle styling + title shimmer |
| `size` | `sm` \| `md` \| `lg` | `md` | Density |
| `orientation` | `horizontal` \| `vertical` | `horizontal` | Media beside or above content |

Also: `el-attachment-media` (`variant`: `icon` \| `image`), `el-attachment-group` for a horizontal scroller.

### File Upload (`el-file-upload`)

Dropbox-style dropzone + browse control. Owns `files` via `model` and auto-renders `ElAttachment` rows. Selection UI only — your app owns HTTP upload. Requires `attachment`, `button`, `icon`, and `form-error`.

```html
<el-file-upload [(files)]="files" multiple accept="image/*,.pdf" [maxSize]="5242880">
  PNG, JPG, or PDF up to 5 MB
</el-file-upload>
```

| Input | Type | Default | Description |
| --- | --- | --- | --- |
| `files` | `File[]` | `[]` | Selected files (two-way) |
| `multiple` | `boolean` | `false` | Allow more than one file |
| `accept` | `string` | `''` | Native `accept` filter |
| `maxFiles` | `number \| null` | `null` | Cap when `multiple` |
| `maxSize` | `number \| null` | `null` | Max bytes per file |
| `disabled` | `boolean` | `false` | Block selection |
| `size` | `sm` \| `md` \| `lg` | `md` | Dropzone density |
| `browseLabel` | `string` | `'Browse files'` | Browse button label |

### Tabs (`el-tabs`)

```html
<el-tabs [(value)]="selected" ariaLabel="Account">
  <el-tab value="overview" label="Overview">
    <ng-template elTabContent>
      <p>Any HTML goes here.</p>
    </ng-template>
  </el-tab>
  <el-tab value="billing" label="Billing">
    <ng-template elTabContent>
      <p>Billing details.</p>
    </ng-template>
  </el-tab>
</el-tabs>
```

**`el-tabs`**

| Input | Type | Default | Description |
| --- | --- | --- | --- |
| `value` | `string` | `''` | Active tab value (two-way bindable) |
| `disabled` | `boolean` | `false` | Disables every tab |
| `ariaLabel` | `string` | — | Accessible name for the tablist |

**`el-tab`**

| Input | Type | Default | Description |
| --- | --- | --- | --- |
| `value` | `string` | (required) | Unique tab value |
| `label` | `string` | `''` | Header text; ignored when `elTabLabel` is set |
| `disabled` | `boolean` | `false` | Disables this tab |

Put panel markup in `<ng-template elTabContent>`. Optional `<ng-template elTabLabel>` replaces the text header with any HTML. Requires `icon` (chevrons appear when the tab list overflows).

### Stepper (`el-stepper`)

Tab-like steps that show one template at a time. Requires `icon`.

```html
<el-stepper [(value)]="step" ariaLabel="Onboarding">
  <el-step value="account" label="Account">
    <ng-template elStepContent>
      <p>Account fields.</p>
    </ng-template>
  </el-step>
  <el-step value="plan" label="Plan" completed>
    <ng-template elStepContent>
      <p>Plan fields.</p>
    </ng-template>
  </el-step>
</el-stepper>
```

**`el-stepper`**

| Input | Type | Default | Description |
| --- | --- | --- | --- |
| `value` | `string` | `''` | Active step value (two-way bindable) |
| `orientation` | `horizontal` \| `vertical` | `horizontal` | Indicator layout |
| `linear` | `boolean` | `false` | Cannot skip more than one step ahead |
| `disabled` | `boolean` | `false` | Disables every step |
| `ariaLabel` | `string` | — | Accessible name for the step list |

**`el-step`**

| Input | Type | Default | Description |
| --- | --- | --- | --- |
| `value` | `string` | (required) | Unique step value |
| `label` | `string` | `''` | Label text; ignored when `elStepLabel` is set |
| `description` | `string` | `''` | Optional supporting text |
| `completed` | `boolean` | `false` | Check indicator (display only) |
| `disabled` | `boolean` | `false` | Disables this step |

Put panel markup in `<ng-template elStepContent>`. Call `next()` / `previous()` on the stepper from your own buttons (for example in a dialog footer).

### Accordion (`el-accordion`)

Expandable sections. The group owns which panels are open. Requires `icon` (header chevron).

```html
<el-accordion variant="single" [(value)]="open" ariaLabel="Order details">
  <el-accordion-item value="shipping" title="Shipping" subtitle="2–5 business days">
    <div elAccordionActions>
      <el-button variant="ghost" size="sm">Edit</el-button>
    </div>
    <ng-template elAccordionContent>
      <p>Any HTML or components.</p>
    </ng-template>
  </el-accordion-item>
</el-accordion>
```

**`el-accordion`**

| Input | Type | Default | Description |
| --- | --- | --- | --- |
| `variant` | `single` \| `multiple` | `single` | `single`: one open panel. `multiple`: several can stay open |
| `value` | `string` \| `string[]` | `''` | Open id(s) (two-way). `string` when single, `string[]` when multiple |
| `disabled` | `boolean` | `false` | Disables every item |
| `ariaLabel` | `string` | — | Accessible name for the group |

**`el-accordion-item`**

| Input | Type | Default | Description |
| --- | --- | --- | --- |
| `value` | `string` | (required) | Unique item id |
| `title` | `string` | `''` | Header title; ignored when `elAccordionTitle` is set |
| `subtitle` | `string` | `''` | Header subtitle; ignored when `elAccordionSubtitle` is set |
| `disabled` | `boolean` | `false` | Disables this item |

Put panel markup in `<ng-template elAccordionContent>` (lazy while collapsed). Optional `<ng-template elAccordionTitle>` / `elAccordionSubtitle` replace the text header. Header actions use `[elAccordionActions]` so they sit before the expand icon and do not toggle the panel.

### Table (`el-table`)

Data table from `[data]` plus `el-table-column` children. Cells stringify `row[name]` unless a column provides `elTableCell`. The table does not sort or page the array. Requires `icon`. Optional `pagination` for the footer.

```html
<el-table [data]="users" [(sort)]="sort" ariaLabel="People">
  <el-table-column name="name" label="Name" sortable width="12rem" />
  <el-table-column name="status" label="Status">
    <ng-template elTableCell let-user>
      <el-chip>{{ user.status }}</el-chip>
    </ng-template>
  </el-table-column>
  <ng-template elTableExpand let-user>{{ user.bio }}</ng-template>
  <el-pagination [(page)]="page" [total]="total" />
</el-table>
```

**`el-table`**

| Input | Type | Default | Description |
| --- | --- | --- | --- |
| `data` | `object[]` | `[]` | Visible rows (already sorted/paged) |
| `track` | `string` | `'id'` | Row identity key |
| `sort` | `{ name, direction } \| null` | `null` | Active sort (two-way). Does not reorder `data` |
| `expanded` | `string \| string[]` | `''` | Expanded row id(s) |
| `expandVariant` | `single` \| `multiple` | `single` | How many detail rows can stay open |
| `size` | `sm` \| `md` \| `lg` | `md` | Cell density |
| `appearance` | `outlined` \| `plain` | `outlined` | Border treatment |
| `striped` | `boolean` | `false` | Alternate row backgrounds |
| `stickyHeader` | `boolean` | `false` | Pin the header while scrolling |
| `loading` | `boolean` | `false` | Loading slot / “Loading…” |
| `empty` | `boolean` | `false` | Empty slot (also when `data` is empty) |
| `virtual` | `boolean` | `false` | Render visible rows only (fixed height; not with expand) |
| `itemHeight` | `number` | `44` | Virtual row height in pixels |
| `caption` | `string` | `''` | Visible caption |
| `ariaLabel` | `string` | — | Accessible name |

**`el-table-column`**

| Input | Type | Default | Description |
| --- | --- | --- | --- |
| `name` | `string` | (required) | Row property key |
| `label` | `string` | `''` | Header text; ignored when `elTableHeader` is set |
| `sortable` | `boolean` | `false` | Sort button (none → asc → desc) |
| `width` | `string` | `''` | Column width (`12rem`, `20%`, …) |
| `align` | `start` \| `center` \| `end` | `start` | Cell alignment |

Optional `<ng-template elTableHeader>` / `elTableCell` / `elTableExpand`. Project `el-pagination` for a footer. Empty/loading copy: `[elTableEmpty]` / `[elTableLoading]`.

### Pagination (`el-pagination`)

Page window. Does not slice data. Requires `icon`, `button`, and `select`.

```html
<el-pagination
  [(page)]="page"
  [(pageSize)]="pageSize"
  [total]="1000"
  showPageSize
/>
```

**`el-pagination`**

| Input | Type | Default | Description |
| --- | --- | --- | --- |
| `page` | `number` | `1` | Current 1-based page (two-way) |
| `pageSize` | `number` | `20` | Rows per page (two-way) |
| `total` | `number` | `0` | Total item count |
| `pageSizeOptions` | `number[]` | `[10, 20, 50]` | Options when `showPageSize` is set |
| `siblingCount` | `number` | `1` | Pages beside the current page |
| `showFirstLast` | `boolean` | `true` | First and last buttons |
| `showPageSize` | `boolean` | `false` | Rows-per-page select |
| `size` | `sm` \| `md` \| `lg` | `md` | Control size |
| `disabled` | `boolean` | `false` | Disables every control |
| `ariaLabel` | `string` | `'Pagination'` | Accessible name |

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

### Skeleton (`el-skeleton`, `[elSkeleton]`)

Loading placeholders. Use `<el-skeleton>` when you are laying out bars yourself. Put `[elSkeleton]` on a `div`, `input`, `button`, or any other host to cover that element with a matching skeleton — you do not build a separate placeholder tree.

```html
<div aria-busy="true">
  <el-skeleton [lines]="3" />
  <el-skeleton variant="circular" />
  <el-skeleton variant="rectangular" height="8rem" />
</div>

<button [elSkeleton]="loading">Save</button>
<input [elSkeleton]="loading" placeholder="Email" />
<div [elSkeleton]="loading" style="height: 4rem; border-radius: 0.5rem">Card</div>
```

**`el-skeleton`**

| Input | Type | Default | Description |
| --- | --- | --- | --- |
| `variant` | `text` \| `circular` \| `rectangular` | `text` | Placeholder shape |
| `animation` | `boolean` | `true` | Shimmer animation |
| `lines` | `number` | `1` | Text bars |
| `width` | `string` | — | CSS width |
| `height` | `string` | — | CSS height for circular/rectangular |

**`[elSkeleton]`**

| Input | Type | Default | Description |
| --- | --- | --- | --- |
| `elSkeleton` | `boolean` | `false` | Covers the host while true |
| `elSkeletonAnimation` | `boolean` | `true` | Shimmer on the cover |

### Breadcrumb (`el-breadcrumb`, `el-breadcrumb-item`)

Navigation trail. Requires `icon` for the chevron separator. Mark the current page with `current`.

```html
<el-breadcrumb ariaLabel="Breadcrumb">
  <el-breadcrumb-item href="/">Home</el-breadcrumb-item>
  <el-breadcrumb-item href="/docs">Components</el-breadcrumb-item>
  <el-breadcrumb-item current>Chip</el-breadcrumb-item>
</el-breadcrumb>
```

**`el-breadcrumb`**

| Input | Type | Default | Description |
| --- | --- | --- | --- |
| `ariaLabel` | `string` | `Breadcrumb` | Accessible name for the nav |

**`el-breadcrumb-item`**

| Input | Type | Default | Description |
| --- | --- | --- | --- |
| `href` | `string` | — | Link target (ignored when current) |
| `current` | `boolean` | `false` | Current page; sets `aria-current="page"` |

### Tooltip (`[elTooltip]`)

Hover/focus label with an arrow pointing at the host. The bubble is attached to `document.body` so overflow does not clip it.

```html
<el-button elTooltip="Save file">Save</el-button>
<el-button elTooltip="More" elTooltipPosition="end">Open</el-button>
```

| Input | Type | Default | Description |
| --- | --- | --- | --- |
| `elTooltip` | `string` | `''` | Label text |
| `elTooltipPosition` | `top` \| `bottom` \| `start` \| `end` | `top` | Placement |
| `elTooltipDisabled` | `boolean` | `false` | Prevents opening |
| `elTooltipDelay` | `number` | `200` | Show delay in ms |
| `elTooltipOpen` | `boolean` | `false` | Open state (two-way bindable) |

### Alert (`el-alert`)

Inline status banner. Parent owns visibility (`@if` + `dismissed`). Requires `icon`.

```html
@if (show()) {
  <el-alert color="success" title="Saved" dismissible (dismissed)="show.set(false)">
    Your changes were written.
  </el-alert>
}
```

| Input | Type | Default | Description |
| --- | --- | --- | --- |
| `color` | `neutral` \| `success` \| `error` \| `warning` \| `info` | `info` | Semantic tone |
| `title` | `string` | `''` | Optional heading |
| `icon` | `string` | default per color | Font Awesome name; `''` hides |
| `dismissible` | `boolean` | `false` | Close button |

| Output | Description |
| --- | --- |
| `dismissed` | Emitted when the close button is clicked |

### Toast (`el-toast`, `el-toaster`)

Overlay notifications. Place `<el-toaster />` once in the app shell and call `ElToastService.show()`. Requires `icon`. For a single action bar, use [Snackbar](#snackbar-el-snackbar).

```html
<el-toaster />
```

```ts
this.toast.show('Saved', { color: 'success' });
this.toast.show('Sticky', { duration: 0 });
```

| Input / option | Type | Default | Description |
| --- | --- | --- | --- |
| `color` | `neutral` \| `success` \| `error` \| `warning` \| `info` | `neutral` | Semantic tone |
| `title` | `string` | `''` | Optional heading |
| `dismissible` | `boolean` | `true` | Close button |
| `position` | `top-start` \| `top-end` \| `bottom-start` \| `bottom-end` | `bottom-end` | Toaster corner |
| `duration` | `number` | `4000` | Auto-dismiss ms; `0` is sticky |

### Snackbar (`el-snackbar`)

Single transient bar with an optional action, or projected controls via `elSnackbarActions`. Requires `icon`. Use Toast for stacked corner notifications.

```html
<el-snackbar [(open)]="open" message="File deleted" action="Undo" (actionClick)="undo()" />

<el-snackbar [(open)]="open" [duration]="0" message="3 selected">
  <div elSnackbarActions>
    <el-button variant="ghost" size="sm">Move</el-button>
    <el-button variant="ghost" size="sm">Delete</el-button>
  </div>
</el-snackbar>
```

```ts
const ref = this.snackbar.open('File deleted', { action: 'Undo', duration: 4000 });
ref.actionClick.then(() => this.undo());
await ref.afterClosed;
```

| Input / option | Type | Default | Description |
| --- | --- | --- | --- |
| `open` | `boolean` | `false` | Open state (`model`) |
| `message` | `string` | `''` | Bar text |
| `action` | `string` | `''` | Optional action label |
| `color` | `neutral` \| `success` \| `error` \| `warning` \| `info` | `neutral` | Semantic tone |
| `duration` | `number` | `4000` | Auto-dismiss ms; `0` is sticky |
| `dismissible` | `boolean` | `true` | Close button |
| `position` | `bottom` \| `top` | `bottom` | Fixed edge |

`ElSnackbarService.open()` mounts one bar on `document.body` and replaces it if you open again. The built-in `action` dismisses after click. Projected `elSnackbarActions` do not — the parent owns `open` (use `duration` `0` for a selection bar).

### Empty State (`el-empty-state`)

Placeholder for an empty list or page. Requires `icon`. Project actions with `elEmptyStateActions` (usually `ElButton`).

```html
<el-empty-state icon="folder-open" title="No projects" description="Create one to get started.">
  <div elEmptyStateActions>
    <el-button>Create project</el-button>
    <el-button variant="ghost">Learn more</el-button>
  </div>
</el-empty-state>
```

| Input | Type | Default | Description |
| --- | --- | --- | --- |
| `icon` | `string` | `''` | Font Awesome name; omit to hide |
| `title` | `string` | `''` | Heading |
| `description` | `string` | `''` | Supporting copy |

Slots: `elEmptyStateMedia` (illustration), default content, `elEmptyStateActions`.

## Packages

| Package | Published | Purpose |
| --- | --- | --- |
| [`@ng-elemental/cli`](https://www.npmjs.com/package/@ng-elemental/cli) | Yes | CLI that copies components into your app |
| [`@ng-elemental/mcp`](https://www.npmjs.com/package/@ng-elemental/mcp) | Yes | MCP server so agents can search and install those components |
| `@ng-elemental/ui` | No | Internal component source in this repository |

Install and use **`@ng-elemental/cli`** in your Angular project. See [packages/cli/README.md](packages/cli/README.md) for npm-focused documentation. Agents should use **`@ng-elemental/mcp`** — see [packages/mcp/README.md](packages/mcp/README.md).

## Contributing

Contributions are welcome. See [CONTRIBUTING.md](CONTRIBUTING.md) for development setup and guidelines.

Please read our [Code of Conduct](CODE_OF_CONDUCT.md) before participating.

## Support NgElemental

NgElemental is free and open source. If it saves you time or helps your project,
consider supporting its continued development. ❤️

[**Sponsor NgElemental**](https://github.com/sponsors/AtulFalle)

## Security

To report a vulnerability, see [SECURITY.md](SECURITY.md).

## License

[MIT](LICENSE) © NgElemental contributors
