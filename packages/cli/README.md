# @ng-elemental/cli

CLI for [NgElemental](https://github.com/AtulFalle/ng-elemental) — copy Angular UI component source into your project.

## Install

No global install required. Use `npx`:

```sh
npx @ng-elemental/cli init
npx @ng-elemental/cli add button
```

## Commands

### `init`

Creates `elemental.json` and the components directory in the current Angular project.

```sh
npx @ng-elemental/cli init
npx @ng-elemental/cli init --yes   # non-interactive
```

Default config:

```json
{
  "componentsDir": "src/app/ui"
}
```

### `add <component>`

Copies component source files into `componentsDir`.

```sh
npx @ng-elemental/cli add button
npx @ng-elemental/cli add label
npx @ng-elemental/cli add button --force   # overwrite existing files
```

After adding a component, import it from the path shown in the CLI output:

```ts
import { ElButton } from './ui/button/button';

@Component({
  imports: [ElButton],
  template: `<el-button variant="primary">Save</el-button>`,
})
export class MyComponent {}
```

## Available components

| Name | Selector | Class |
| --- | --- | --- |
| `button` | `el-button` | `ElButton` |
| `label` | `el-label` | `ElLabel` |

## Requirements

- Angular 22+
- An existing Angular project (`@angular/core` in `package.json`, or `angular.json` / `project.json`)

## Documentation

Full usage, typography setup, and component API reference:

**https://github.com/AtulFalle/ng-elemental#readme**

## License

[MIT](https://github.com/AtulFalle/ng-elemental/blob/master/LICENSE)
