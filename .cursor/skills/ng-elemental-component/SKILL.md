---
name: ng-elemental-component
description: >-
  Create and extend NgElemental copy-paste Angular UI components (ElIcon, ElButton,
  ElSelect, CLI registry, Storybook, docs). Use when adding a component, editing
  packages/ui, ng-elemental add, component-registry, or El* widgets. Prefers existing
  library components before custom CSS, SVGs, or third-party alternatives.
---

# NgElemental component creation

Read this skill before adding or changing a UI component. Do not scan the whole repo first — follow the map below, then open only the files you need.

Copy-paste library: consumers get source via `@ng-elemental/cli`. Angular 22, signals, standalone (do not set `standalone: true`).

## Prefer our components first

Compose existing `El*` components. Build a new primitive only when none of them fit.

| Need | Use |
| --- | --- |
| Icon, chevron, check, close | `ElIcon` + Font Awesome name (`check`, `chevron-down`, `xmark`, `user`) |
| Button | `ElButton` |
| Checkbox | `ElCheckbox` |
| Radio group | `ElRadioGroup` + `ElRadio` |
| Chips / tags | `ElChip` |
| Avatar | `ElAvatar` |
| Card layout | `ElCard` + `[elCard*]` slots |
| Form label | `ElLabel` |
| Form error message | `ElFormError` |
| Dropdown / combobox | `ElSelect` + `ElSelectItem` |
| Segmented choice | `ElSegmentedButton` + `ElSegmentedButtonItem` |
| Theme / tokens | `provideElTheme()`, `tokens.scss` |

**Icons:** Font Awesome is mandatory. Use `<el-icon name="…">`. Never `mask-image: url(...)`, data-URI SVGs, inline `<svg>`, CSS triangles, or unicode glyphs for icons.

**Imports:** `import { ElIcon } from '../icon/icon'` (same pattern for other `El*` siblings). Document `npx @ng-elemental/cli add icon` (and any other dependency) as a prerequisite.

## Where to look

| What | Path |
| --- | --- |
| Component source | `packages/ui/src/lib/<name>/` |
| Public exports | `packages/ui/src/index.ts` |
| Tokens | `packages/ui/src/lib/theme/tokens.scss` |
| CLI manifest (source of truth) | `packages/cli/src/lib/component-registry.ts` |
| CLI copy assets | `packages/cli/project.json` (`assetGlobs` must match the manifest; **no `*` wildcards**) |
| CLI usage text | `packages/cli/src/lib/add.ts`, `packages/cli/src/lib/cli.ts` |
| CLI e2e | `packages/cli/src/e2e/add-<name>.spec.ts` |
| Docs page | `src/app/docs/pages/<name>-doc.ts` + `.html` |
| Docs nav / routes / tokens table | `src/app/docs/nav.ts`, `src/app/app.routes.ts`, `src/app/docs/theme-tokens.ts` |
| Home list | `src/app/docs/pages/home.html` |
| README | `README.md`, `packages/cli/README.md` |
| Changelog | `CHANGELOG.md` under `[Unreleased]` |
| Compound parent/child example | `packages/ui/src/lib/radio/`, `packages/ui/src/lib/select/` |
| Icon usage example | `packages/ui/src/lib/button/`, `packages/ui/src/lib/chip/` |

Stories live next to the component (`*.stories.ts`) and **must not** ship in the CLI registry.

## Workflow

1. Implement in `packages/ui/src/lib/<name>/` (`.ts`, `.html`, `.scss`, `.stories.ts`).
2. Export from `packages/ui/src/index.ts`.
3. Add tokens in `tokens.scss` (light + dark if needed). No hex in component SCSS.
4. Register in `component-registry.ts` and matching `project.json` assets.
5. Add `COMPONENT_EXAMPLES` in `add.ts`, help line in `cli.ts`.
6. Add `packages/cli/src/e2e/add-<name>.spec.ts`.
7. Docs: nav, route, `*-doc.ts/html`, `theme-tokens.ts`, home link.
8. README + CLI README + CHANGELOG `[Unreleased]`.
9. Verify (see below).

For the exact file checklist, see [checklist.md](checklist.md).
For API and style rules, see [conventions.md](conventions.md).
**REQUIRED:** Before adding value / open / view / hover / draft state or a second instance of the same widget, follow `ng-elemental-review` (one owner per piece of state).

## Verify

```sh
npx nx run ui:lint
npx nx run ui:stylelint
npx nx run ng-elemental:lint
npx nx build ng-elemental
npx nx test cli
```
