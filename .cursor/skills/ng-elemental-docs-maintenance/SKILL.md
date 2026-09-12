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
- Docs chrome: `src/app/docs/layout/`, `src/app/docs/ui/` (`DocsExample`, `DocsSnippet`, `DocsPager`, `DocsToc`)
- API/usage examples and standards explanations

## Required workflow

1. Identify component and current docs status.
2. Update doc page examples, usage, and API props to match component behavior.
3. Prefer shadcn-style information flow when rewriting a page:
   - one-line lead under the H1,
   - hero live example before Installation,
   - Installation (Command / Manual) then Usage as compact snippets,
   - **one H2 per capability** (not a dump under “Examples”),
   - preview code must match the live example exactly.
4. Build examples with `app-docs-example` (single canvas, not nested `app-preview`):
   - toolbar is an `el-segmented-button` with preview / code / standards icon items,
   - preview: live component output only (no shadcn-style “View Code” peek for now),
   - code: the exact markup for that preview,
   - standards: short UX/a11y rationale via `<ng-template #standards>`.
5. Give every docs `h2` a stable slug `id` (e.g. `id="installation"`) so the right-rail **On this page** TOC can link and scroll-spy correctly. The layout auto-slugs missing ids, but explicit ids are preferred.
6. Style docs chrome and page helpers with **BEM** (`docs-block`, `docs-block__element`, `docs-block--modifier`). No bare `.is-active` / one-off utilities; see `.cursor/rules/bem-scss.mdc` and component conventions.
7. Ensure docs include a standards/decision section:
   - what standards are used,
   - why decisions were made,
   - links to references,
   - explicit success checks covered.
8. Use clear, direct wording and semantic structure. Avoid noisy or repetitive headings.
9. For component removal, remove stale references from nav, route, and home lists in the same change.
10. Verify docs compile and lint through Nx tasks used by this repo.

## Example canvas template

```html
<section>
  <h2 id="size">Size</h2>
  <p class="docs-page__section-lead">Use the <code>size</code> prop…</p>
  <app-docs-example [code]="sizeCode">
    <el-button size="sm">Small</el-button>
    <ng-template #standards>
      <p>Short rationale for this example.</p>
    </ng-template>
  </app-docs-example>
</section>
```

Keep this canvas pattern consistent across component docs as they are rewritten. Use only Font Awesome Free icon names that exist (e.g. `arrow-up-right-from-square`, not `arrow-up-right`).

## Layout notes

- Docs shell is three columns on desktop: left site nav, center article, right **On this page**.
- Do not add a second in-page TOC; rely on `app-docs-toc` in the layout.
- Reading column is constrained via `.docs-page { max-width: … }` in `page.scss`.

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
