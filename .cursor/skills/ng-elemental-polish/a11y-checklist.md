# A11Y Project checklist (widget scope)

Source: [The A11Y Project checklist](https://www.a11yproject.com/checklist). Target **WCAG 2.2 AA**. This does not make a widget “fully accessible”; it is the floor before polish is done.

Run these on the **component** (and its docs/stories). Mark page-level items against the docs app only.

Each item keeps the A11Y Project success criterion.

## Content

- [ ] `button`, `a`, and `label` content (and equivalent names) is unique and descriptive — not “click here” / “read more”. (1.3.1)
- [ ] Text alignment follows writing direction (LTR left, RTL right). Do not center or justify control labels as the default. (1.4.8)

## Global code (widget)

- [ ] Markup is valid for the host and internals. (4.1.1)
- [ ] `tabindex` is only `0` or `-1`. Inherently focusable elements do not get a redundant tabindex. (2.4.3)
- [ ] No `autofocus` on the widget by default. (2.4.3)
- [ ] No `title` tooltips for information everyone needs. Acceptable: naming an `iframe`. (4.1.2)

Page-level (docs app, not the primitive): `lang` on `html` (3.1.1), unique `title` (2.4.2), viewport zoom not disabled (1.4.4), landmarks (4.1.2).

## Keyboard

- [ ] Visible focus style for keyboard (and switch / SR cursor). (2.4.7)
- [ ] Focus order matches visual order. (1.3.2)
- [ ] Hidden UI is not focusable (closed overlay, collapsed content, inert background). (2.4.3)

## Images / non-text

- [ ] Meaningful images have `alt`. (1.1.1)
- [ ] Decorative images / icons use empty `alt` or `aria-hidden` (ElIcon default is decorative). (1.1.1)
- [ ] Complex graphics (charts, maps) have a text alternative. (1.1.1)
- [ ] Images of text include that text in the name. (1.1.1)

## Headings / lists (when the widget exposes them)

- [ ] Headings introduce content; do not skip levels inside the widget’s own outline. (2.4.6)
- [ ] Related collections use `ul` / `ol` / `dl` (breadcrumb, menu, list). (1.3.1)

## Controls

- [ ] Links are `<a href>`. (1.3.1)
- [ ] Links are recognizable without color alone. (1.4.1)
- [ ] Controls have a `:focus-visible` state. (2.4.7)
- [ ] Buttons are `<button>` (with `type` set when inside forms). (1.3.1)
- [ ] New-window behavior is announced if used; prefer same-tab. (G201)

Skip-link is page-level (docs app). (2.4.1)

## Tables (table / grid widgets)

- [ ] Tabular data uses `<table>`. (1.3.1)
- [ ] Headers are `<th>` with `scope` as needed. (4.1.1)
- [ ] `<caption>` (or `aria-labelledby`) names the table. (2.4.6)

## Forms (input, checkbox, radio, select, slider, file-upload, datepicker, form-error, label)

- [ ] Every input has a `<label>` (for/id) or the widget composes `ElLabel`. (3.2.2 / 1.3.1)
- [ ] Related groups use `fieldset`/`legend` or `role="group"` + name (`ElRadioGroup`). (1.3.1)
- [ ] `autocomplete` where the field asks for personal data. (1.3.5)
- [ ] Errors associate with the field (`aria-describedby`, `ElFormError`). (3.3.1)
- [ ] Error / warning / success is not color-only. (1.4.1)

## Appearance

- [ ] Still legible in Windows High Contrast / inverted colors. (1.4.1)
- [ ] 200% text zoom: no overlap, no clipped names. (1.4.4)
- [ ] Tight zoom / straw test: related control + label stay close. (1.3.3)
- [ ] Color is not the only indicator. (1.4.1)
- [ ] Instructions are not position-only or audio-only. (1.3.3)
- [ ] Layout stays simple under reflow (320 CSS px). (1.4.10)

## Animation

- [ ] No flashing more than three times per second. (2.3.1)
- [ ] Auto-updating or moving content can be paused (carousel, toast). (2.2.2)
- [ ] `prefers-reduced-motion` removes or slows non-essential motion. (2.3.3)

## Color contrast

- [ ] Normal text ≥ 4.5:1. (1.4.3)
- [ ] Large text ≥ 3:1. (1.4.3)
- [ ] Icons ≥ 3:1. (1.4.11)
- [ ] Input borders / tracks / thumbs ≥ 3:1 against adjacent colors. (1.4.11)
- [ ] Text over images/video remains 4.5:1. (1.4.3)
- [ ] Custom `::selection` meets contrast. (1.4.3)

## Mobile and touch

- [ ] No orientation lock from the widget. (1.3.4)
- [ ] No required horizontal scroll at 320 CSS px (except data tables that provide an alternative). (1.4.10)
- [ ] Interactive targets are easy to activate. Prefer 44×44; minimum 24×24 CSS px. (2.5.5 / 2.5.8)
- [ ] Spacing between controls leaves a scroll gutter (avoid a wall of zero-gap hit targets). (2.4.1)

## Media (attachment, carousel, any video/audio)

- [ ] No autoplay of audio. (1.4.2)
- [ ] Media controls use real buttons / range inputs and pause with Space when focused. (1.3.1 / 2.1.1)
- [ ] Captions if video. (1.2.2)
- [ ] Transcript if audio-only. (1.1.1)
