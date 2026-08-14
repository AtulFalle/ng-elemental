# @ng-elemental/ui

Internal component source for [NgElemental](https://github.com/AtulFalle/ng-elemental).

This package is **not published to npm**. End users receive component files through `@ng-elemental/cli`:

```sh
npx @ng-elemental/cli add button
npx @ng-elemental/cli add label
npx @ng-elemental/cli add segmented-button
```

See the [contributing guide](../../CONTRIBUTING.md) if you are working on components in this repository.

## Storybook

Component stories live next to source (`*.stories.ts`). Storybook loads styles through a single global entry:

- `.storybook/styles.scss` — fonts + shared UI tokens + canvas defaults
- `packages/ui/src/styles/_tokens.scss` — design tokens (`:root` CSS variables)
- Each component — own `styleUrl` with `:host` styles (no per-component preview imports)

Compound components (e.g. segmented button) may use a story host in `packages/ui/src/stories/`. Story hosts are not copied by the CLI.

