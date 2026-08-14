# Conventions

## Angular

- `input()`, `model()`, `output()`, `computed()`, `signal()` — no `@Input` / `@Output` / `@HostBinding` / `@HostListener`
- Host bindings go in the `@Component({ host: { … } })` object
- `inject()` instead of constructor DI (except `DestroyRef` / `ElementRef` via `inject`)
- `ChangeDetectionStrategy.OnPush`
- Native control flow: `@if`, `@for`, `@switch` — not `*ngIf` / `*ngFor`
- No `ngClass` / `ngStyle` — use `class` / `style` bindings
- `booleanAttribute` on boolean inputs so `multiple` works as a flag
- Two-way state via `model()` (same as radio `value` and checkbox `checked`) — not `ControlValueAccessor` unless required later
- Selector prefix `el-`
- Compound widgets: injection token in `<name>.token.ts`, parent `providers: [{ provide: TOKEN, useExisting: Parent }]`
- One owner per piece of state (value, open/view, hover/preview, drafts). Children emit events; do not mirror inputs into child signals with `effect`, lastX caches, or show/hide flags. See `ng-elemental-review`.

## Style

- BEM: `.el-block`, `.el-block__element`, `.el-block--modifier`
- Colors only via tokens (`var(--el-…)`). Hex belongs in `tokens.scss` only
- Encapsulated component SCSS — no global class leaks
- Sizes match button: `'sm' | 'md' | 'lg'` when the control has a size

## Icons and composition

- Font Awesome 6 is required for any icon
- `<el-icon name="check" size="sm" />` — name without `fa-` prefix
- Decorative icons stay decorative (ElIcon default)
- Do not draw icons in SCSS (`url()`, `mask-image`, CSS chevrons)
- A non-icon shape (e.g. indeterminate bar) may stay CSS
- If the new component imports `ElIcon` / `ElButton` / `ElChip`, say so in docs and README (`add icon` first)

## Docs and stories

- Docs page: preview, install, usage, examples, tokens, API props table
- Stories under `title: 'Components/<Name>'` covering the main variants
- Docs preview wrappers must allow overflow if the component opens a panel

## Out of scope unless asked

- `@angular/cdk` (this library has no CDK)
- Search/combobox filter (separate component)
- Publishing / version bumps (maintainers only)
