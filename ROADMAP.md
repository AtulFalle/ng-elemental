# NgElemental Roadmap

This document describes the general direction of the project. It is not a commitment or a release schedule. Priorities change based on contributor availability, community feedback, and real-world usage.

## v1.x — Stability, components, and developer experience

The v1.0.0 release established the foundation: copy-paste Angular components, CLI tooling, and an MCP server for AI agent integration. The v1.x series focuses on making that foundation solid.

### Components and accessibility

- Audit each existing component against WCAG 2.1 AA and the ARIA APG authoring patterns.
- Fill keyboard navigation gaps (composite widgets, focus trapping in dialogs and drawers).
- Add `prefers-reduced-motion` support across animated components.
- Expand Storybook coverage — states, edge cases, dark mode, reduced motion.
- New components driven by community requests (open an issue or discussion to suggest one).

### CLI

- Improve `init` diagnostics when `styles.scss` cannot be located.
- `ng-elemental update` — detect which copied components have a newer upstream version.
- Better Nx monorepo detection and `--path` guidance.
- Richer `add` output: show the import path and a minimal usage snippet.

### MCP

- Keep MCP tools in sync as new components ship.
- Improve `search_components` relevance for natural-language queries.
- Explore streaming / progressive responses for `get_component_source` on large components.

### Developer experience

- Reduce the cold-start time for the npx MCP transport.
- Add a `verify` command that checks an existing install for stale or missing files.
- Website: interactive playground for components.

## Beyond v1.x

These are areas the project may explore in future minor or major releases. None are committed.

- Form integration helpers (ControlValueAccessor wrappers, Angular Signals Forms support).
- Additional theme presets beyond the default MD3-inspired tokens.

## How to influence the roadmap

The best way to shape priorities is to:
- Open a [GitHub Issue](https://github.com/AtulFalle/ng-elemental/issues) with a concrete use case.
- Start a [GitHub Discussion](https://github.com/AtulFalle/ng-elemental/discussions) for broader ideas.
- Submit a PR — working code moves faster than requests.

Please read [CONTRIBUTING.md](CONTRIBUTING.md) before opening a PR.
