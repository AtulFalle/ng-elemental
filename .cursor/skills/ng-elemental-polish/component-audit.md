# Component audit

Use this template for **every** `El*` widget. Copy it into the session notes and fill it. Button, dialog, table, and stack all use the same sections.

**How to fill**

- Pass, fail, or `N/A` (with a one-line reason). Never delete a section.
- A state that exists on the widget must be checked even if Storybook already has a story.
- Keys listed under Interaction are “as required by the APG pattern for this widget.” Layout-only widgets mark activation/navigation keys `N/A`.

```
COMPONENT AUDIT
===============

VISUAL
[ ] Default
[ ] Hover
[ ] Focus
[ ] Pressed / active
[ ] Disabled
[ ] Selected / checked / expanded / current
[ ] Open / closed
[ ] Error / invalid / busy
[ ] Dark mode
[ ] 200% zoom

INTERACTION
[ ] Mouse
[ ] Keyboard
[ ] Touch
[ ] Activation keys (Enter / Space as required)
[ ] Navigation keys (arrows / Home / End as required)
[ ] Escape / dismiss
[ ] Focus-visible

CONTENT
[ ] Short / typical content
[ ] Long content (wrap or truncate without overlap)
[ ] Empty / placeholder
[ ] Start / prefix slot
[ ] End / suffix slot
[ ] Decoration + text (icon, avatar, badge, media)
[ ] No visible text (name still required if interactive)

ACCESSIBILITY
[ ] Native host (or justified APG role)
[ ] Accessible name
[ ] Role, state, and value
[ ] Focus indicator
[ ] Contrast
[ ] Disabled / hidden semantics
[ ] Screen reader
[ ] Reduced motion

RESPONSIVE
[ ] Mobile
[ ] Touch target
[ ] Small
[ ] Medium
[ ] Large

API
[ ] Sensible variants
[ ] Sensible sizes
[ ] Sensible types
[ ] No unnecessary props
```

## How the boxes map

| Section | What “pass” means on any widget |
| --- | --- |
| Visual | Each applicable state is styled, distinct, and does not break layout. Dark mode and 200% zoom are never `N/A`. |
| Interaction | Pointer, keyboard, and touch can operate the widget. Keys match the APG pattern mapped in [aria-apg.md](aria-apg.md). Focus-visible shows only for keyboard. |
| Content | Typical, long, and empty (if the widget can be empty) do not overflow or clip badly. Slots and no-text cases are `N/A` when the widget has no such API. |
| Accessibility | Native element when possible; name; role/state; 3:1 focus ring; AA contrast; disabled/hidden not fake; SR announces correctly; motion honors `prefers-reduced-motion`. |
| Responsive | Usable at a phone width. Interactive targets meet at least 24×24 CSS px (prefer 44×44). Size boxes are `N/A` if the widget has no size API — then check the single size still works on small screens. |
| API | Variants/sizes/types that exist are the ones people need. No prop that only papers over a missing state. |

## `N/A` examples (not an exemption list)

| Widget kind | Typical `N/A` |
| --- | --- |
| Layout (`stack`, `grid`, `container`, `card`, `separator`, `aspect-ratio`) | Hover, pressed, disabled, activation keys, touch target |
| Display (`avatar`, `skeleton`, `empty-state`, `progress`) | Pressed, Enter/Space, sizes if none |
| Overlay (`dialog`, `sheet`, `drawer`, `popover`, `menu`, `tooltip`) | Keep Escape / open-closed / focus trap; sizes maybe `N/A` |
| Form control (`input`, `checkbox`, `radio`, `select`, `slider`, `slide-toggle`) | Open/closed unless it has a popup |
| Collection (`list`, `table`, `tree`, `tabs`, `accordion`, `carousel`) | Icon slots unless the item API has them |

## Instantiation (button is only an example)

A `<button>`-based control would mark Open/closed `N/A`, keep Enter and Space, and check start/end/icon-only content **if those inputs exist**. A dialog would mark Pressed `N/A` and must pass Open/closed, Escape, focus indicator, and name. Do not copy button content boxes onto widgets that have no icons.
