# @ng-elemental/ui

Internal component source for [NgElemental](https://github.com/AtulFalle/ng-elemental).

This package is **not published to npm**. End users receive component files through `@ng-elemental/cli`:

```sh
npx @ng-elemental/cli add button
npx @ng-elemental/cli add <component>
npx @ng-elemental/cli add theme
```

See the [contributing guide](../../CONTRIBUTING.md) if you are working on components in this repository.

## Theming

Design tokens live in `packages/ui/src/lib/theme/`. Import tokens and typography once:

```scss
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');

@use './path/to/theme/tokens';
@use './path/to/theme/typography';
```

Inter is the default sans (`--el-font-sans`). Scale vars and `.el-text-*` utilities live in the theme package — do not reintroduce a second font stack.

Customize colors by editing the BRAND block in `tokens.scss`. Typography defaults to Inter plus `typography.scss` utilities (`.el-text-h1` …). Dark mode is a mode toggle only:

```typescript
import { provideElTheme } from './theme/theme';

export const appConfig = {
  providers: [
    provideElTheme({ mode: 'light' }),
  ],
};
```

`setMode('dark')` sets `data-el-theme` and `color-scheme` so `light-dark()` flips. Built-in dark palette lives in the same BRAND pairs.

## Storybook

Component stories live next to source (`*.stories.ts`). Storybook loads styles through a single global entry:

- `.storybook/styles.scss` — Inter, tokens, typography, canvas defaults
- `packages/ui/src/lib/theme/tokens.scss` + `typography.scss` — design tokens and text utilities
- Each component — own `styleUrl` with BEM classes referencing generic tokens (`--el-color-primary`, `--el-radius-xs`, …). Unique sizes stay in the widget file.

Compound components (e.g. segmented button) may use a story host in `packages/ui/src/stories/`. Story hosts are not copied by the CLI.

## Linting

```sh
npx nx lint ui
npx nx stylelint ui
```

- **ESLint** — Angular 22 patterns (signals, inject, host metadata, control flow) and custom BEM class rules
- **Stylelint** — BEM selector pattern and `color-no-hex` in component SCSS (tokens file exempt)
