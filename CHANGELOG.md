# Changelog

All notable changes to `@ng-elemental/cli` are documented here.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [0.0.7] - 2026-08-15

### Added

- `ElList` and `ElListItem` stacked rows with leading/title/description/trailing slots (`ng-elemental add list`)
- `ElInfiniteScroll` attribute directive for paginated `loadMore` (`ng-elemental add infinite-scroll`)
- `ElTabs` and `ElTab` with `ng-template` panels and overflow chevrons (`ng-elemental add tabs`; requires `icon`)
- Docs Theme panel: pick BRAND color tokens, apply them for the session, and copy a `:root` CSS snippet for consumer apps

### Changed

- Theme tokens are now a single generic Material 3 file (`light-dark()` color roles + density). Widgets consume `--el-color-primary` and related roles; widget aliases (`--el-button-*`, `--el-chip-*`) are no longer in `tokens.scss`. `ElThemeService` only toggles light/dark via `data-el-theme` and `color-scheme`.

## [0.0.5] - 2026-08-14

### Added

- `ElAttachment` file/image attachment cards with upload states (`ng-elemental add attachment`; requires `icon`, `button`)
- `ElFileUpload` Dropbox-style dropzone with auto-rendered attachments (`ng-elemental add file-upload`; requires `attachment`, `button`, `icon`, `form-error`)
- `ElAvatar` circular image / initials / icon mark (`ng-elemental add avatar`; requires `icon`)
- `ElCard` presentational slot-based card with media/header/content/footer and compact horizontal size (`ng-elemental add card`)
- `ElProgress` and `ElProgressCircle` line and circle progress indicators with determinate/indeterminate modes (`ng-elemental add progress`)
- `ElSlider` horizontal single/range value picker with step, ticks, and value labels (`ng-elemental add slider`)
- `ElFormError` presentational validation message (`ng-elemental add form-error`)
- `ElInput` text field with types, prefix/suffix slots, error/disabled states, and optional pattern mask (`ng-elemental add input`)
- `ElSlideToggle` on/off switch with size, label position, and optional track/thumb icon slots (`ng-elemental add slide-toggle`)
- `ElIcon` Font Awesome 6 icon component (`ng-elemental add icon`)
- Button and chip integrations for Font Awesome start/end icons
- `ElChip` Material Design 3 chips for assist, filter, and suggestion use cases (`ng-elemental add chip`)
- `ElDatePicker` calendar/clock picker with DD-MM-YYYY and HH:MM fields (`ng-elemental add datepicker`)
- `ElDateRangePicker` start–end calendar with two months side by side (`datepicker` package)
- Bundled Geist fonts in theme package with system-ui fallbacks (no manual font install)

## [0.0.4] - 2026-08-14

### Added

- `ElCheckbox` Material Design 3 checkbox with label text and left/right label placement (`ng-elemental add checkbox`)

### Fixed

- `@ng-elemental/cli` npm package now includes `README.md` in published tarball

## [0.0.3] - 2026-08-14

### Added

- Theme and design tokens (`ng-elemental add theme`) with light/dark palettes and CSS variable customization via `provideElTheme()`
- ESLint rules for Angular 22 patterns and BEM class names; Stylelint for BEM selectors and no hardcoded hex in component SCSS
- `ElSegmentedButton` and `ElSegmentedButtonItem` single-choice control (`ng-elemental add segmented-button`)

### Changed

- Button, label, and segmented-button styles now consume design tokens instead of hardcoded colors

## [0.0.2] - 2026-08-14

### Added

- `ElLabel` form-oriented label component (`ng-elemental add label`)

[Unreleased]: https://github.com/AtulFalle/ng-elemental/compare/v0.0.7...HEAD
[0.0.7]: https://github.com/AtulFalle/ng-elemental/releases/tag/v0.0.7
[0.0.5]: https://github.com/AtulFalle/ng-elemental/releases/tag/v0.0.5
[0.0.4]: https://github.com/AtulFalle/ng-elemental/releases/tag/v0.0.4
[0.0.3]: https://github.com/AtulFalle/ng-elemental/releases/tag/v0.0.3
[0.0.2]: https://github.com/AtulFalle/ng-elemental/releases/tag/v0.0.2
