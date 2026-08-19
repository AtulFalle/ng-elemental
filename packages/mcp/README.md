# @ng-elemental/mcp

MCP server for [NgElemental](https://github.com/AtulFalle/ng-elemental). It lets AI agents search, inspect, and install copy-paste Angular components through `@ng-elemental/cli`.

## Configure

```sh
npx @ng-elemental/mcp init --client cursor
```

Supported clients: `cursor`, `claude`, `vscode`, `codex`.

Or add this to `.cursor/mcp.json`:

```json
{
  "mcpServers": {
    "ng-elemental": {
      "command": "npx",
      "args": ["-y", "@ng-elemental/mcp"]
    }
  }
}
```

This sits beside Angular CLI MCP (`npx @angular/cli mcp`). Use Angular MCP for workspace and builds; use NgElemental MCP for El* widgets.

## Tools

- `get_guidelines` — design rules and page-integration playbook
- `search_components` — find widgets by name or intent
- `list_components` — catalog dump
- `get_component` — metadata, usage, and wire-in checklist
- `install_components` — get CLI commands for the user to run (does NOT copy files automatically)
- `get_component_source` — full source code (TS, HTML, SCSS) to understand the component API
- `get_component_examples` — Storybook stories showing real usage patterns
- `init_project` — create `elemental.json` and theme tokens

Also exposes resource `ng-elemental://guidelines`.

## Remote (Vercel) Usage

Configure clients with the HTTP URL instead of the local `npx` command:

```sh
npx @ng-elemental/mcp init --client cursor --url https://your-deployment.vercel.app/mcp
```

Or add manually to `.cursor/mcp.json`:

```json
{
  "mcpServers": {
    "ng-elemental": {
      "url": "https://your-deployment.vercel.app/mcp"
    }
  }
}
```

## License

[MIT](https://github.com/AtulFalle/ng-elemental/blob/master/LICENSE)
