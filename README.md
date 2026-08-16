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
  --el-color-primary: light-dark(#6750a4, #d0bcff);
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
| `npx @ng-elemental/cli add <name> [--force]` | Copy a component into your project |

Available components: `theme`, `icon`, `button`, `label`, `form-error`, `input`, `checkbox`, `slide-toggle`, `radio`, `select`, `datepicker`, `chip`, `progress`, `slider`, `avatar`, `card`, `list`, `infinite-scroll`, `tabs`, `segmented-button`.

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
  <img elCardMedia src="/cover.jpg" alt="" style="width: 100%; display: block" />
  <div elCardHeader>Title</div>
  <div elCardContent>Body</div>
  <div elCardFooter>Actions</div>
</el-card>

<el-card size="compact">
  <el-icon elCardMedia name="file-lines" />
  <div elCardHeader>report.pdf</div>
  <div elCardContent>2.4 MB</div>
  <div elCardFooter>
    <el-button variant="ghost" size="sm" iconStart="xmark" aria-label="Remove" />
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
| `ariaLabel` | `string` | — | Accessible name |

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

## Support NgElemental

NgElemental is free and open source. If it saves you time or helps your project,
consider supporting its continued development. ❤️

[**Sponsor NgElemental**](https://github.com/sponsors/AtulFalle)

## Security

To report a vulnerability, see [SECURITY.md](SECURITY.md).

## License

[MIT](LICENSE) © NgElemental contributors
