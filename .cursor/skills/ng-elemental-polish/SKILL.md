---
name: ng-elemental-polish
description: >-
  Use when polishing or auditing any existing NgElemental El* widget before
  the next component, or when the user mentions visual states, a11y, WCAG,
  ARIA APG, focus-visible, contrast, keyboard, screen reader, touch target,
  dark mode, 200% zoom, reduced motion, or the component audit checklist.
  Applies to every packages/ui widget, not a single control.
---

# NgElemental component polish

Read this skill **before** changing visual, interaction, or accessibility of **any** `El*` widget. The checklist is the same for every component. Mark a box `N/A` with a one-line reason when that widget truly has no such state; do not skip a section.

Target **WCAG 2.2 Level AA**. Native HTML first. ARIA only when the native element cannot express the pattern.

**REQUIRED REFERENCES (open both, then the APG pattern for this widget):**

- [The A11Y Project checklist](https://www.a11yproject.com/checklist)
- [ARIA Authoring Practices Guide (APG)](https://www.w3.org/WAI/ARIA/apg/)
- APG Patterns: https://www.w3.org/WAI/ARIA/apg/patterns/

Also follow `ng-elemental-component` (files, tokens, API) and `ng-elemental-review` (one owner per piece of state). This skill does not replace either.

## When to use

- Picking the next existing component to polish
- Auditing visual / interaction / a11y / responsive / API on any `El*` widget
- Adding Storybook or docs coverage for states
- Keyboard, focus, name, contrast, or screen-reader questions on an `El*` widget

## When not to use

- Scaffolding a brand-new component (use `ng-elemental-component` first, then return here)
- Parent/child state-ownership review only (use `ng-elemental-review`)

## Workflow

1. Name the widget and its **APG pattern** from [aria-apg.md](aria-apg.md). Open that APG page. Layout-only widgets still run Visual, Content, Appearance, Contrast, and Responsive.
2. Copy the audit from [component-audit.md](component-audit.md). Fill every box. `N/A` needs a reason (`no disabled input`, `not a composite`, `no size API`).
3. Run the widget-scoped A11Y items in [a11y-checklist.md](a11y-checklist.md). Page-level items belong to the docs app, not the primitive.
4. Check keyboard, name, role, and state against the mapped APG pattern. Prefer a native host (`button`, `a`, `input`, `table`, …) over `role="…"`.
5. Confirm Storybook / docs cover every Visual and Content box that is not `N/A`.
6. Stop if Critical a11y defects remain (no name, no focus indicator, inoperable keyboard, contrast fail, disabled not exposed).

## Output

1. Widget + APG pattern URL
2. Filled audit (pass / fail / N/A per box)
3. Defects: Critical / Important / Minor
4. Open APG or A11Y items still unchecked

## Hard rules

- **First rule of ARIA:** if a native HTML element already provides the semantics and keyboard behavior, use it. Do not add a `role` that duplicates a native element.
- **No `tabindex` other than `0` or `-1`.** No positive tabindex.
- **Focus-visible, not mouse-focus chrome.** Keyboard users must see a 3:1 indicator. Do not remove outlines without a replacement.
- **Name every interactive control.** Visible text is the name. No-visible-text controls need `aria-label` (or associated text). Do not use `title` tooltips as the name.
- **Disabled is a state, not only grey text.** Native `disabled` on `<button>` / `<input>`. Custom widgets use `aria-disabled` and must not look clickable while remaining operable.
- **Color is never the only cue** (error, selected, current, required).
- **Motion honors `prefers-reduced-motion`.**
- **Do not disable zoom.** Widgets must survive 200% text zoom without overlap.

## Red flags — stop

- `div` / `span` click handlers instead of `button` / `a` / native control
- A `role` that duplicates a native element that could have been the host
- Focus styles only on `:hover` or `:focus` (mouse click leaves a ring)
- Interactive control with no accessible name
- `aria-hidden="true"` on a focusable control
- Hidden content still in the tab order
- Contrast checked for text but not for icons, borders, or focus rings
- Treating the audit as button-only (icons, Enter/Space) and skipping other widgets
- New prop whose only job is to toggle an a11y attribute the host should own

## Supporting files

- Shared audit for every widget: [component-audit.md](component-audit.md)
- A11Y Project items scoped to widgets: [a11y-checklist.md](a11y-checklist.md)
- APG pattern map for every `El*` widget: [aria-apg.md](aria-apg.md)
