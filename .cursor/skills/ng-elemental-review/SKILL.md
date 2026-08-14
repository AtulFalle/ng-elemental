---
name: ng-elemental-review
description: >-
  Use when reviewing or changing NgElemental El* widgets in packages/ui, or
  when the user asks to review UI code. Use when adding selection, open/view,
  hover/preview, or draft state; mounting a second instance of the same widget;
  or when a widget grows show/hide flags, mirrored parent/child signals, lastX
  sync guards, stub instances with the body hidden, duplicated hover/value/view
  state, or remount plus afterNextRender to reset the same UI. Applies to
  overlays, compound controls, pickers, tabs, steppers, dual-pane layouts, and
  any future design-system component.
---

# NgElemental component review

**One owner per piece of state.** Children emit events. They do not copy, invert, or reduce parent state.

Read this before adding inputs, effects, or a second instance of the same `El*` widget. Also follow `ng-elemental-component`.

Applies to every design-system piece: triggers, overlays, lists, panes, fields, compound parent/child controls, and anything added later.

## State table (required)

Before coding or finishing a review, fill this for the widget in front of you. Any row with two owners is a defect. Omit rows that do not exist.

| State | Owner (exactly one) | How others see it |
| --- | --- | --- |
| Selected / checked / value | Parent `model()` | Inputs down |
| Visible window (open panel, active tab, step, page, section, stage) | Parent, or local UI-only on the child | Input down, `Change` event up |
| Hover / highlight / preview | Parent if more than one pane or item paints it | Input down, event up |
| Uncommitted drafts (typed fields, filter text, in-progress range) | The draft UI | Commit event up |

Local UI-only state (which nested face is showing, which row is focused) may live on the child. Do not sync it back with an effect.

## Review output

1. State table (filled)
2. Defects: Critical / Important / Minor
3. Stop if Critical or Important state-ownership defects remain

## Defects to reject

**Flag-sliced god widget.** `showHeader` + `showBody` + `showFields` (or any `showX` set) means the component is several widgets. Split: leaf pane vs fields vs overlay shell vs list vs item.

**Stub instance.** Mounting a widget with most of the UI hidden only to reuse a slice of logic. Duplicate the small template or extract a tiny sibling. Do not run a full grid, list, or effect brain just to host inputs.

**Mirrored controlled state.** Parent window plus child copy plus `effect` + `untracked` + `*Change` (including inverted math on a sibling). Parent owns the window; child receives it and emits `Change`.

**Reducer in every child.** Start/end/swap, next/prev, or toggle-set implemented in each instance. Children emit what happened (`itemSelected`, `stepChange`); the parent updates `value` once.

**Duplicated hover / highlight.** Internal `hovered*` and input `hover*` and parent `hovered`. One signal, on the parent that paints more than one pane or item.

**Belt-and-suspenders reset.** Remount (`@if (open())`) already resets local UI. Do not also `afterNextRender`, `flush`+reset, and `reset*` for the same bug.

**Effect as sync engine.** `lastX` / equality caches to stop loops. That means two writers. Use `model()` or one-way input + event.

**Pair chrome on the leaf.** Prev/next, dual-pane spacers, overlay positioning, or tab list chrome belongs on the parent that owns the window, not inside every child.

## Rationalizations

| Excuse | Reality |
| --- | --- |
| "Flags keep related logic in one class" | The class is now several widgets. Split it. |
| "A fields-only / header-only instance avoids copy-paste" | It still builds the hidden tree and its effects. Copy the small part, or extract it. |
| "An effect is how you control a child" | That is two-way state without `model()`. Pass the view in. |
| "Internal hover plus shared hover covers both modes" | One hover owner. Single pane can keep it local; multiple panes lift it. |
| "afterNextRender is extra safety" | Remount is the reset. Extra reset is noise and hides the owner. |
| "A lastX cache prevents effect loops" | Remove the second writer. |
| "Chrome belongs in the child for alignment" | Pair chrome belongs on the parent that owns the window. |

## Red flags — stop

- Extra `el-*` in a template with `showX="false"` on most of the UI
- `effect` that copies an input into a sibling `signal`
- The same reduce (`*Change`, hover, range/set update) from two or more siblings
- `reset*` called from open, close, and commit
- New boolean input whose only job is to hide half the template

## Child shape

Inputs: what to show (value, view, highlight, bounds, disabled, size, locale).  
Outputs: what happened (`selected`, `viewChange`).  
No draft-signal farms on the wrong widget, no sync caches, no show/hide flags to impersonate another widget.
