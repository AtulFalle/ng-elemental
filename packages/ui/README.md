# @ng-elemental/ui

Internal component source for [NgElemental](https://github.com/AtulFalle/ng-elemental).

This package is **not published to npm**. End users receive component files through `@ng-elemental/cli`:

```sh
npx @ng-elemental/cli add button
npx @ng-elemental/cli add label
npx @ng-elemental/cli add segmented-button
npx @ng-elemental/cli add theme
```

See the [contributing guide](../../CONTRIBUTING.md) if you are working on components in this repository.

## Theming

Design tokens and bundled Geist fonts live in `packages/ui/src/lib/theme/`. Import once in global styles:

```scss
@use './path/to/theme/tokens';
```

Geist ships with the theme (`fonts.scss` + woff2 files). System-ui fonts are used as fallback when bundled fonts are unavailable.

Customize colors by overriding CSS variables on `:root` or via `provideElTheme()`:

```typescript
import { provideElTheme } from './theme/theme';

export const appConfig = {
  providers: [
    provideElTheme({
      mode: 'light',
      variables: { '--el-color-accent': '#6366f1' },
    }),
  ],
};
```

Built-in dark mode: set `mode: 'dark'` or add `data-el-theme="dark"` on `<html>`.

## Storybook

Component stories live next to source (`*.stories.ts`). Storybook loads styles through a single global entry:

- `.storybook/styles.scss` — shared UI tokens, bundled fonts, canvas defaults
- `packages/ui/src/lib/theme/tokens.scss` — design tokens (`:root` CSS variables)
- Each component — own `styleUrl` with BEM classes referencing tokens (no hardcoded colors)

Compound components (e.g. segmented button) may use a story host in `packages/ui/src/stories/`. Story hosts are not copied by the CLI.

## Linting

```sh
npx nx lint ui
npx nx stylelint ui
```

- **ESLint** — Angular 22 patterns (signals, inject, host metadata, control flow) and custom BEM class rules
- **Stylelint** — BEM selector pattern and `color-no-hex` in component SCSS (tokens file exempt)
