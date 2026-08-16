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

Creates `elemental.json`, asks where to copy components, and installs theme tokens.

```sh
npx @ng-elemental/cli init
npx @ng-elemental/cli init --yes                 # non-interactive (default path, installs theme)
npx @ng-elemental/cli init --path libs/ui --yes  # Nx / custom folder
npx @ng-elemental/cli init --skip-theme          # tokens later via `add theme`
```

Default config:

```json
{
  "componentsDir": "src/app/ui"
}
```

`init` also appends an `@use` of `theme/tokens` plus typography comments to `src/styles.scss` when that file exists. Load your brand typeface and set `--el-font-sans` / `--el-font-mono`.

### `add <component>`

Copies component source files into `componentsDir`.

```sh
npx @ng-elemental/cli add icon
npx @ng-elemental/cli add button
npx @ng-elemental/cli add <component>
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
| `theme` | — | `ElThemeService` (+ `tokens.scss`) |
| `button` | `el-button` | `ElButton` |
| `label` | `el-label` | `ElLabel` |
| `form-error` | `el-form-error` | `ElFormError` |
| `input` | `el-input` | `ElInput` |
| `checkbox` | `el-checkbox` | `ElCheckbox` |
| `slide-toggle` | `el-slide-toggle` | `ElSlideToggle` |
| `radio` | `el-radio-group`, `el-radio` | `ElRadioGroup`, `ElRadio` |
| `select` | `el-select`, `el-select-item`, `el-select-group` | `ElSelect`, `ElSelectItem`, `ElSelectGroup` |
| `datepicker` | `el-date-picker`, `el-date-range-picker` | `ElDatePicker`, `ElDateRangePicker` |
| `chip` | `el-chip` | `ElChip` |
| `progress` | `el-progress`, `el-progress-circle` | `ElProgress`, `ElProgressCircle` |
| `slider` | `el-slider` | `ElSlider` |
| `avatar` | `el-avatar` | `ElAvatar` |
| `card` | `el-card` | `ElCard` |
| `list` | `el-list`, `el-list-item` | `ElList`, `ElListItem` |
| `infinite-scroll` | `[elInfiniteScroll]` | `ElInfiniteScroll` |
| `attachment` | `el-attachment` (+ parts) | `ElAttachment`, … |
| `file-upload` | `el-file-upload` | `ElFileUpload` |
| `icon` | `el-icon` | `ElIcon` |
| `tabs` | `el-tabs`, `el-tab` | `ElTabs`, `ElTab`, `ElTabContent`, `ElTabLabel` |
| `accordion` | `el-accordion`, `el-accordion-item` | `ElAccordion`, `ElAccordionItem`, `ElAccordionTitle`, `ElAccordionSubtitle`, `ElAccordionContent` |
| `table` | `el-table`, `el-table-column` | `ElTable`, `ElTableColumn`, `ElTableHeader`, `ElTableCell`, `ElTableExpand` |
| `pagination` | `el-pagination` | `ElPagination` |
| `skeleton` | `el-skeleton`, `[elSkeleton]` | `ElSkeleton`, `ElSkeletonDirective` |
| `breadcrumb` | `el-breadcrumb`, `el-breadcrumb-item` | `ElBreadcrumb`, `ElBreadcrumbItem` |
| `tooltip` | `[elTooltip]` | `ElTooltip` |
| `alert` | `el-alert` | `ElAlert` |
| `toast` | `el-toast`, `el-toaster` | `ElToast`, `ElToaster`, `ElToastService` |
| `segmented-button` | `el-segmented-button`, `el-segmented-button-item` | `ElSegmentedButton`, `ElSegmentedButtonItem` |

## Requirements

- Angular 22+
- An existing Angular project (`@angular/core` in package.json, or `angular.json` / `project.json`)

## Documentation

Full usage, typography setup, and component API reference:

**https://github.com/AtulFalle/ng-elemental#readme**

## License

[MIT](https://github.com/AtulFalle/ng-elemental/blob/master/LICENSE)
