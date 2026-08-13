# ElLabel component + real 0.0.2 release

Date: 2026-08-14

## Goal

Add a form-oriented `ElLabel` component using the same copy-paste pattern as Button, then ship it as a real **0.0.2** (the existing v0.0.2 tag is an empty bump and must be removed first).

## Decisions

- New standalone component, not a Button variant.
- Form-oriented API (not Button’s primary/secondary/ghost).
- No size variants (`sm` / `md` / `lg`).
- `@ng-elemental/ui` stays internal; consumers get source via `ng-elemental add label`.
- Stories stay in the repo for Storybook only; they are not copied into consumer apps.
- CI remains lint / build / test / e2e. npm publish is only for the intentional 0.0.2 release, not every push.

## Component

Files (mirror Button):

```
packages/ui/src/lib/label/
  label.ts
  label.html
  label.scss
  label.stories.ts
```

- Selector: `el-label`
- Class: `ElLabel`
- `ChangeDetectionStrategy.OnPush`
- Signal inputs via `input()`; boolean inputs use `booleanAttribute`
- Native `<label>` with `<ng-content />`
- `[attr.for]` bound from `htmlFor`

Inputs:

| Input      | Type                                      | Default     |
|------------|-------------------------------------------|-------------|
| `variant`  | `'default' \| 'muted' \| 'error'`         | `'default'` |
| `htmlFor`  | `string`                                  | `''`        |
| `required` | `boolean`                                 | `false`     |
| `disabled` | `boolean`                                 | `false`     |

Behavior:

- `required === true` renders a `*` after the projected text (visual only; does not set `aria-required` on the associated control).
- `disabled === true` applies disabled styling (opacity / cursor). The `<label>` itself is not a focusable control.
- Empty `htmlFor` omits the `for` attribute.

Styles (BEM, encapsulated SCSS):

- Block: `.el-label`
- Modifiers: `--default`, `--muted`, `--error`
- Font: `var(--el-font-sans, 'Geist Variable', Geist, ui-sans-serif, system-ui, sans-serif)`
- Default: strong/body text color
- Muted: secondary/gray text
- Error: red text, suitable next to invalid fields

Storybook title: `Components/Label`. Stories: Default, Muted, Error, Required, Disabled.

Usage after `add label`:

```ts
import { ElLabel } from './ui/label/label';
```

```html
<el-label htmlFor="email" variant="default" [required]="true">Email</el-label>
```

## CLI + registry

- `AVAILABLE_COMPONENTS` becomes `['button', 'label']`.
- `add label` copies `label.ts` / `.html` / `.scss` into `<componentsDir>/label/`.
- CLI build assets also copy `label.{ts,html,scss}` to `dist/packages/cli/registry/label`.
- Help text and README document `npx @ng-elemental/cli add label`.
- `add` usage log shows `ElLabel` import + an `el-label` example (not hardcoded Button-only).

## Tests

- Keep existing Verdaccio e2e for `add button`.
- Add e2e for `add label` (same fixture/temp app): install `@ng-elemental/cli@e2e`, `init`, `add label`.
- Assert registry files exist in the installed package (`label.ts` / `.html` / `.scss`, no `.stories.ts`).
- Assert copied consumer files contain `selector: 'el-label'`, `export class ElLabel`, `.el-label`, `--el-font-sans`, and no `label.stories.ts`.
- Does not compile the consumer Angular app.

## Release

Current `v0.0.2` is invalid for this goal (changelog: version bump only, no Label).

1. Delete GitHub Release `v0.0.2`.
2. Delete tag `v0.0.2` locally and on `origin`.
3. Remove the empty `## 0.0.2` changelog section (last published release remains **0.0.1**).
4. Land Label + any pending CI workflow changes on `master`.
5. Verify lint, build, and `nx test cli` (button + label e2e).
6. `npx nx release --skip-publish` to create real **0.0.2**, then `git push && git push --tags`.
7. Confirm GitHub Release for `v0.0.2`.
8. Publish `@ng-elemental/cli@0.0.2` with `npx nx release publish` (npm latest should move from 0.0.1 → 0.0.2).

Do not recreate `v0.0.2` until Label is on `master`.

## Non-goals

- Size variants on Label
- Button `variant="label"`
- Publishing `@ng-elemental/ui`
- Compiling the e2e consumer app
- Changing Label to use `for` as the input name (Angular input is `htmlFor` to avoid the `for` keyword)
