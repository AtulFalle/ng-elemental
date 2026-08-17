# ARIA APG map for NgElemental

Sources:

- [APG Home](https://www.w3.org/WAI/ARIA/apg/)
- [APG Patterns](https://www.w3.org/WAI/ARIA/apg/patterns/)
- [Developing a Keyboard Interface](https://www.w3.org/WAI/ARIA/apg/practices/keyboard-interface/)
- [Providing Accessible Names and Descriptions](https://www.w3.org/WAI/ARIA/apg/practices/names-and-descriptions/)

Open the pattern page for the widget under audit. Implement that keyboard model and those roles/states. APG is informative; WCAG still requires the widget to be operable from the keyboard.

This library does **not** use `@angular/cdk` or `@angular/aria`. Encode the pattern with native HTML, then ARIA + keyboard on the host.

## Universal (every interactive widget)

From APG keyboard + naming practices:

| Rule | Practice |
| --- | --- |
| First rule of ARIA | Native host if it already has the semantics and keys |
| Tab sequence | Tab / Shift+Tab move **between** widgets. Arrow keys move **inside** composites |
| tabindex | Only `0` and `-1`. Never positive values |
| Roving tabindex | One `tabindex="0"` child in a radio group, tablist, menu, listbox, tree, grid; others `-1` |
| Focus vs selection | Focus ring is not the same as `aria-selected` / checked / current. Both must be visible when they differ |
| Selection follows focus | OK when panel content is local and instant. Do **not** auto-select if moving focus loads/network-refreshes |
| Restore focus | Close / delete / navigate away must leave focus on a sensible control, not `body` |
| Name | Every focusable control has an accessible name. Do not put the role word in the name (“Close” not “Close button”) |
| Description | Optional; `aria-describedby` for errors/hints. Descriptions are announced after name + role |
| Disabled in composites | Follow the APG pattern: some items stay focusable and `aria-disabled`; native submit controls use `disabled` |

## Pattern map

Layout-only rows still get names/contrast/zoom from the audit. They have no widget keyboard unless a child is interactive.

| CLI id | APG pattern | Pattern URL | Keyboard / ARIA to verify |
| --- | --- | --- | --- |
| button | Button | https://www.w3.org/WAI/ARIA/apg/patterns/button/ | Native `<button>`. Enter + Space. Name from text or `aria-label`. `disabled`. |
| icon | (non-text) | — | Decorative by default (`aria-hidden`). Meaningful use needs a name on the **control**, not extra icon chrome. |
| label | (forms) | — | `<label for>` / wrapping. Clicking focuses the control. |
| form-error | (forms 3.3.1) | — | Tied with `aria-describedby` + `aria-invalid` on the field. Not color-only. |
| input | (native input) | — | Native `<input>` / `<textarea>`. Label. Focus-visible. `autocomplete` when asking personal data. |
| checkbox | Checkbox | https://www.w3.org/WAI/ARIA/apg/patterns/checkbox/ | Native checkbox preferred. Space toggles. Mixed: `aria-checked="mixed"`. |
| slide-toggle | Switch | https://www.w3.org/WAI/ARIA/apg/patterns/switch/ | `role="switch"` if not native. Space. `aria-checked` true/false. |
| radio | Radio Group | https://www.w3.org/WAI/ARIA/apg/patterns/radio/ | `radiogroup` + `radio`. Tab into group, arrows move, one tab stop. `aria-checked`. |
| select | Combobox + Listbox | https://www.w3.org/WAI/ARIA/apg/patterns/combobox/ · [listbox](https://www.w3.org/WAI/ARIA/apg/patterns/listbox/) | `aria-expanded`, `aria-controls`, listbox options, typeahead, Escape closes. |
| chip | Button or Checkbox | button / checkbox | Action chip = button keys. Filter/input chip = selected/removed semantics + name. |
| progress | progressbar (ARIA) | no dedicated APG pattern; use `role="progressbar"` | Name. `aria-valuemin/max/now` or `aria-valuetext`. Determinate vs indeterminate. |
| slider | Slider | https://www.w3.org/WAI/ARIA/apg/patterns/slider/ | Arrows, Home/End, Page Up/Down. `aria-valuemin/max/now`. Range: [Multi-Thumb](https://www.w3.org/WAI/ARIA/apg/patterns/slider-multithumb/). |
| carousel | Carousel | https://www.w3.org/WAI/ARIA/apg/patterns/carousel/ | Pause control if autoplay. Prev/next. Do not steal focus each slide. |
| avatar | (image) | — | Name if it conveys identity; empty `alt` if decorative next to visible text. |
| card | (layout) | — | If the whole card is clickable, one control inside, not a nested-button trap. |
| container, stack, grid, aspect-ratio, scroll-area | Landmarks only if they are page regions | https://www.w3.org/WAI/ARIA/apg/patterns/landmarks/ | Usually no role. Do not fake `main`/`nav` on a spacing primitive. |
| separator | (separator) | — | Decorative vs semantic `hr` / `role="separator"`. |
| resizable | Window Splitter | https://www.w3.org/WAI/ARIA/apg/patterns/windowsplitter/ | Focusable gutter. Arrows. `aria-valuenow`, `aria-orientation`. |
| list | Listbox or HTML list | https://www.w3.org/WAI/ARIA/apg/patterns/listbox/ | Static list = `ul`/`ol`. Selectable = listbox + `option` + arrows. |
| tree | Tree View | https://www.w3.org/WAI/ARIA/apg/patterns/treeview/ | Arrows expand/collapse. `aria-expanded`, `aria-selected`, `aria-level`. |
| infinite-scroll | Feed | https://www.w3.org/WAI/ARIA/apg/patterns/feed/ | Load more without trapping focus. Articles named. |
| attachment | (media / group) | — | Named group. Actions are buttons. Decorative preview hidden from SR if filename is the name. |
| file-upload | Button + (forms) | button | Trigger is a button or labelled file input. Drop zone is keyboard reachable. |
| table | Table or Grid | [table](https://www.w3.org/WAI/ARIA/apg/patterns/table/) · [grid](https://www.w3.org/WAI/ARIA/apg/patterns/grid/) | Static data = native table. Interactive cells = grid + arrow navigation. |
| pagination | Navigation / Toolbar | [toolbar](https://www.w3.org/WAI/ARIA/apg/patterns/toolbar/) | `nav` + name. Current page `aria-current`. Buttons not fake links. |
| skeleton | (busy) | — | `aria-busy` / status text for replacement content. Do not expose raw shimmer as a name. |
| breadcrumb | Breadcrumb | https://www.w3.org/WAI/ARIA/apg/patterns/breadcrumb/ | `nav` + list. `aria-current="page"` on the last item. |
| tooltip | Tooltip | https://www.w3.org/WAI/ARIA/apg/patterns/tooltip/ | Show on hover **and** focus. Escape hides. Not the only place for essential info. `role="tooltip"` + `aria-describedby`. |
| menu | Menu / Menu Button | [menu](https://www.w3.org/WAI/ARIA/apg/patterns/menubar/) · [menu button](https://www.w3.org/WAI/ARIA/apg/patterns/menu-button/) | Trigger `aria-haspopup` + `aria-expanded`. Arrows, Enter/Space, Escape. |
| menubar | Menu and Menubar | https://www.w3.org/WAI/ARIA/apg/patterns/menubar/ | Tab to bar. Arrows across. Submenus as APG. |
| popover | Disclosure or Dialog | [disclosure](https://www.w3.org/WAI/ARIA/apg/patterns/disclosure/) · [dialog](https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/) | Non-modal = disclosure (`aria-expanded`). Modal = dialog focus trap. |
| dialog | Dialog (Modal) | https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/ | Focus in, trap, Escape, restore. `aria-modal`. Labelled by title. |
| alert | Alert | https://www.w3.org/WAI/ARIA/apg/patterns/alert/ | `role="alert"` (assertive live) **or** static named region if not interrupting. |
| toast, snackbar | Alert | https://www.w3.org/WAI/ARIA/apg/patterns/alert/ | Live region. Focus must stay unless the toast is a modal message. Close is a named button. |
| empty-state | (content) | — | Heading + descriptive text. Actions are real buttons. |
| sheet, drawer | Dialog (Modal) or Disclosure | dialog / disclosure | Modal sheet = dialog pattern. Persistent drawer = labelled `complementary` or disclosure. |
| tabs | Tabs | https://www.w3.org/WAI/ARIA/apg/patterns/tabs/ | Tablist: one tab stop, arrows, `aria-selected`, `aria-controls`, panels. |
| stepper | (no dedicated pattern) | tabs / button + list | Named current step. Linear steps keyboard reachable. Do not fake tabs if it is a wizard (buttons + status). |
| accordion | Accordion | https://www.w3.org/WAI/ARIA/apg/patterns/accordion/ | Headers are buttons. Enter/Space. `aria-expanded` + `aria-controls`. |
| segmented-button | Radio Group or Toolbar | radio / toolbar | Exclusive = radio group. Multi = toolbar of toggles with `aria-pressed`. |
| datepicker | Dialog + Grid + Spinbutton | [dialog](https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/) · [grid](https://www.w3.org/WAI/ARIA/apg/patterns/grid/) · [spinbutton](https://www.w3.org/WAI/ARIA/apg/patterns/spinbutton/) | Text field labelled. Popup labeled. Grid arrows. Escape closes. |
| theme | (docs / config) | — | Not a widget. Skip unless it exposes a control (then treat as switch / select). |

## Overlay extras

| Pattern | Must also check |
| --- | --- |
| Modal dialog / modal sheet | Inert background, initial focus, return focus to trigger |
| Menu / listbox popup | Typeahead when APG specifies it; Tab usually closes and moves on |
| Tooltip | Do not use for names of icon-only buttons — that is `aria-label` |

If a widget has no row above, pick the closest APG pattern **before** writing any `role`. Prefer disclosure over dialog when the UI is not modal.
