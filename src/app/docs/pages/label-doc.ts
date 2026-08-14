import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ElLabel } from '@ng-elemental/ui';
import { LABEL_TOKENS } from '../theme-tokens';
import type { PropDefinition } from '../nav';
import { CodeBlock } from '../ui/code-block';
import { Preview } from '../ui/preview';
import { PropsTable } from '../ui/props-table';
import { TokensTable } from '../ui/tokens-table';

@Component({
  selector: 'app-label-doc-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, ElLabel, CodeBlock, Preview, PropsTable, TokensTable],
  templateUrl: './label-doc.html',
  styleUrl: './page.scss',
})
export class LabelDocPage {
  protected readonly labelTokens = LABEL_TOKENS;

  protected readonly addCode = `npx @ng-elemental/cli add label`;

  protected readonly importCode = `import { ElLabel } from './ui/label/label';

@Component({
  imports: [ElLabel],
  template: \`
    <el-label htmlFor="email" variant="default">Email</el-label>
    <input id="email" type="email" />
  \`,
})
export class MyComponent {}`;

  protected readonly usageCode = `<el-label htmlFor="email" variant="default">Email</el-label>
<el-label htmlFor="hint" variant="muted">Optional hint</el-label>
<el-label htmlFor="email" variant="error" [required]="true">Email</el-label>`;

  protected readonly globalTokensCode = `:root {
  --el-label-fg: #0f172a;
  --el-label-fg-muted: #64748b;
  --el-label-fg-error: #e11d48;
  --el-label-required: #e11d48;
}`;

  protected readonly scopedTokensCode = `.field-group--invalid {
  --el-label-fg-error: #be123c;
  --el-label-required: #be123c;
}`;

  protected readonly props: PropDefinition[] = [
    {
      name: 'variant',
      type: "'default' | 'muted' | 'error'",
      default: "'default'",
      description: 'Visual style of the label.',
    },
    {
      name: 'htmlFor',
      type: 'string',
      default: "''",
      description: 'Id of the associated form control.',
    },
    {
      name: 'required',
      type: 'boolean',
      default: 'false',
      description: 'Shows a required indicator when true.',
    },
    {
      name: 'disabled',
      type: 'boolean',
      default: 'false',
      description: 'Muted, non-interactive label state.',
    },
  ];
}
