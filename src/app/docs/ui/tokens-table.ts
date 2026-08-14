import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import type { TokenDefinition } from '../theme-tokens';

@Component({
  selector: 'app-tokens-table',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="docs-props-table">
      <table>
        <thead>
          <tr>
            <th>Token</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          @for (token of tokens(); track token.name) {
            <tr>
              <td><code>{{ token.name }}</code></td>
              <td>{{ token.description }}</td>
            </tr>
          }
        </tbody>
      </table>
    </div>
  `,
  styles: `
    .docs-props-table {
      overflow-x: auto;
      margin-block: 1rem;
      border: 1px solid var(--docs-border);
      border-radius: 0.5rem;
    }

    table {
      width: 100%;
      border-collapse: collapse;
      font-size: 0.875rem;
    }

    th,
    td {
      padding: 0.75rem 1rem;
      text-align: left;
      border-bottom: 1px solid var(--docs-border);
      vertical-align: top;
    }

    tr:last-child td {
      border-bottom: none;
    }

    th {
      font-weight: 600;
      background: var(--docs-surface-muted);
      color: var(--docs-fg);
    }

    td code {
      font-family: var(--el-font-mono);
      font-size: 0.8125rem;
      background: var(--docs-code-inline-bg);
      padding: 0.125rem 0.375rem;
      border-radius: 0.25rem;
      white-space: nowrap;
    }
  `,
})
export class TokensTable {
  readonly tokens = input.required<TokenDefinition[]>();
}
