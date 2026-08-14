# File checklist

Replace `<name>` with the CLI id (folder name), e.g. `select`.

## Create

- [ ] `packages/ui/src/lib/<name>/<name>.ts`
- [ ] `packages/ui/src/lib/<name>/<name>.html` (omit only if template is inline)
- [ ] `packages/ui/src/lib/<name>/<name>.scss`
- [ ] `packages/ui/src/lib/<name>/<name>.stories.ts` (not copied to registry)
- [ ] Extra files for compound widgets (item, group, token) — see radio/select
- [ ] `packages/cli/src/e2e/add-<name>.spec.ts`
- [ ] `src/app/docs/pages/<name>-doc.ts`
- [ ] `src/app/docs/pages/<name>-doc.html`

## Modify

- [ ] `packages/ui/src/index.ts` — export classes and public types
- [ ] `packages/ui/src/lib/theme/tokens.scss` — `--el-<name>-*` (and dark overrides)
- [ ] `packages/cli/src/lib/component-registry.ts` — `assetGlobs`, `requiredBasenames`
- [ ] `packages/cli/project.json` — one asset entry per glob; **never `*`**
- [ ] `packages/cli/src/lib/add.ts` — `COMPONENT_EXAMPLES`
- [ ] `packages/cli/src/lib/cli.ts` — `add <name>` help line
- [ ] `src/app/docs/nav.ts`
- [ ] `src/app/app.routes.ts` — lazy `loadComponent`
- [ ] `src/app/docs/theme-tokens.ts` — `*_TOKENS` for the docs table
- [ ] `src/app/docs/pages/home.html` — available components list
- [ ] `src/app/docs/pages/theme-doc.html` — token link (if new tokens)
- [ ] `README.md` — usage + props; note `icon` (or other) prerequisites
- [ ] `packages/cli/README.md` — available components table
- [ ] `CHANGELOG.md` — `[Unreleased]` → Added

## Registry globs

Copy `assetGlobs` from the manifest into `project.json` exactly. Example:

```ts
{
  name: 'select',
  assetGlobs: [
    'select.{ts,html,scss}',
    'select-item.{ts,html,scss}',
    'select-group.{ts,html,scss}',
    'select-value.ts',
    'select.token.ts',
  ],
  requiredBasenames: ['select', 'select-item', 'select-group', 'select-value', 'select.token'],
}
```

Do not list `.stories.ts`. CI fails if stories land in `dist/packages/cli/registry/`.

## E2E smoke

Assert selector, class name, key template bits, token usage in SCSS, and that `.stories.ts` was **not** copied. Follow `packages/cli/src/e2e/add-select.spec.ts`.
