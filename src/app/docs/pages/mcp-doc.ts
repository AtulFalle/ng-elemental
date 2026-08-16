import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CodeBlock } from '../ui/code-block';

@Component({
  selector: 'app-mcp-doc-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, CodeBlock],
  templateUrl: './mcp-doc.html',
  styleUrl: './page.scss',
})
export class McpDocPage {
  protected readonly initCode = `npx @ng-elemental/mcp init --client cursor
npx @ng-elemental/mcp init --client claude
npx @ng-elemental/mcp init --client vscode
npx @ng-elemental/mcp init --client codex`;

  protected readonly cursorCode = `{
  "mcpServers": {
    "ng-elemental": {
      "command": "npx",
      "args": ["-y", "@ng-elemental/mcp"]
    }
  }
}`;

  protected readonly vscodeCode = `{
  "servers": {
    "ng-elemental": {
      "command": "npx",
      "args": ["-y", "@ng-elemental/mcp"]
    }
  }
}`;

  protected readonly claudeCode = `{
  "mcpServers": {
    "ng-elemental": {
      "command": "npx",
      "args": ["-y", "@ng-elemental/mcp"]
    }
  }
}`;

  protected readonly codexCode = `[mcp_servers.ng-elemental]
command = "npx"
args = ["-y", "@ng-elemental/mcp"]`;
}
