# NgElemental Design Guidelines

Call this guide before implementing UI. Prefer existing El* widgets over custom markup.

## Framework
- Angular 22+
- Standalone components (do not set `standalone: true`; it is the default)
- Signals for local page state (`signal()`, `model()`, `computed()`)
- `input()` / `output()` / `model()` — not `@Input` / `@Output`
- Host bindings in the `@Component({ host: { … } })` object, not `@HostBinding` / `@HostListener`
- `inject()` instead of constructor DI
- `ChangeDetectionStrategy.OnPush`
- Native control flow: `@if`, `@for`, `@switch` — not `*ngIf` / `*ngFor`
- No `ngClass` / `ngStyle` — use `class` / `style` bindings

## Styling
- SCSS only
- BEM: `.el-block`, `.el-block__element`, `.el-block--modifier`
- Colors and radii via design tokens (`var(--el-color-primary)`, `var(--el-radius-xs)`, …)
- Hex values belong in `tokens.scss` only — do not hardcode brand colors in page or widget SCSS
- No `!important`
- Encapsulated component styles — do not leak global classes to restyle El*
- Do not invent `--el-<widget>-*` token aliases; unique sizes stay in that widget’s SCSS

## Architecture
- Small, single-responsibility components
- Prefer composition of existing El* widgets over new primitives
- Avoid unnecessary wrappers, facades, and abstractions
- One owner per piece of state (open, value, hover). Do not mirror the same state in parent and child

## Accessibility
- WCAG-aware
- Keyboard navigation for interactive controls
- Semantic HTML (`button`, `label`, `nav`, headings)
- ARIA only where the native element is not enough (`ariaLabel` inputs on groups, overlays)
- Pair `ElLabel` + control `inputId` / `htmlFor`; show errors with `ElFormError`

## How to put a component on a page

NgElemental is copy-paste source, not an npm UI import. Never `import { ElButton } from '@ng-elemental/ui'` in a consumer app.

1. Ensure the project is initialized (`elemental.json`). If missing, call `init_project`.
2. Theme must exist under `componentsDir/theme`. `init` installs it; otherwise add `theme`.
3. Search (`search_components`) then inspect (`get_component`). Do not guess names.
4. Install with `install_components` to get CLI commands for the user to run. This handles `registryDependencies` from the catalog (often `icon`).
5. If the catalog lists `npmDependencies` (Font Awesome for icons), install that package and `@use` `fontawesome.scss` in global styles after tokens.
6. Import from the copied path, not from a package name:
   `import { ElButton } from './ui/button/button';`
   (replace `ui` with `elemental.json` `componentsDir` relative to the page).
7. Add every used class to the page `@Component({ imports: [ElButton, …] })`.
8. Use the catalog `usage` snippet in the template. Bind page state with signals:
   `protected readonly open = signal(false);`
   two-way: `[(value)]`, `[(checked)]`, `[(open)]`.
9. Compose layout with `ElContainer` / `ElStack` / `ElGrid`. Compose forms with
   `ElLabel` + control + `ElFormError`. Compose actions with `ElButton`.
10. Icons: only `<el-icon name="check">` (no `fa-` prefix). Never inline SVG, data-URI, CSS triangles, or unicode glyphs for icons.
11. Overlays: put `<el-toaster />` once in the app shell for toasts; dialogs use `[(open)]` or `ElDialogService` as in the catalog example.
12. After adding, customize tokens in `theme/tokens.scss` (BRAND block) or scoped `var(--el-*)` on a wrapper. Do not restyle El* internals with new CSS.

### Prefer El* first
- Icon / chevron / close → `ElIcon`
- Button → `ElButton`
- Text field → `ElInput`
- Checkbox / switch / radio / select → matching El* widget
- Modal → `ElDialog`
- Snackbar → `ElToast` + `ElToaster`
- Dropdown menu → `ElMenu`
- Tabs / stepper / accordion → matching El* widget
