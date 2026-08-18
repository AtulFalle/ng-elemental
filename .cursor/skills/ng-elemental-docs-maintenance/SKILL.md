---
name: ng-elemental-docs-maintenance
description: Maintain NgElemental component docs pages. Use when adding, polishing, fixing, or removing component docs in src/app/docs/pages, especially when adding a standards/explanations section, updating API tables, or removing stale references from nav/routes/home.
---

# NgElemental docs maintenance

Use this when updating or removing documentation for any `El*` component page.

## Scope

- Component doc pages in `src/app/docs/pages/*-doc.ts` and `*-doc.html`
- Documentation navigation and discoverability:
  - `src/app/docs/nav.ts`
  - `src/app/app.routes.ts`
  - `src/app/docs/pages/home.html`
- API/usage examples and standards explanations

## Required workflow

1. Identify component and current docs status.
2. Update doc page examples, usage, and API props to match component behavior.
3. Build examples as a single panel pattern (not separate preview/code sections):
   - top-right icon controls in this order: preview, code, standards,
   - preview: show live component output,
   - code: show the exact code for the visible preview,
   - standards: explain relevant UX/a11y decisions for that example.
4. Ensure docs include a standards/decision section:
   - what standards are used,
   - why decisions were made,
   - links to references,
   - explicit success checks covered.
5. Use clear, direct wording and semantic structure. Avoid noisy or repetitive headings.
6. For component removal, remove stale references from nav, route, and home lists in the same change.
7. Verify docs compile and lint through Nx tasks used by this repo.

## Example panel template

Each example panel should provide:

- **Preview icon:** renders the live component example
- **Code icon:** shows code matching that exact preview
- **Standards icon:** concise rationale and standards relevant to that example

Keep this panel pattern consistent across all component docs.

## Standards section template

Use this structure in each component docs page:

- **Standards used** (WCAG/APG/native semantics)
- **Why decisions were made** (short rationale)
- **Success checks covered** (clear checklist bullets)
- **References** (authoritative links)

## Removal checklist

- Remove route entry from `src/app/app.routes.ts`
- Remove nav entry from `src/app/docs/nav.ts`
- Remove card/link from `src/app/docs/pages/home.html`
- Delete or deprecate `*-doc.ts` and `*-doc.html` (as requested)
- Remove imports no longer used after deletion

## Notes

- Keep docs concise and user-facing.
- Keep standards references stable and public (W3C APG, WCAG, A11Y Project).
- Prefer existing NgElemental components in docs examples over custom HTML/CSS workarounds.
