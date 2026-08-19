import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ElButton, ElLabel } from '@ng-elemental/ui';
import type { PropDefinition } from '../nav';
import { CodeBlock } from '../ui/code-block';
import { Preview } from '../ui/preview';
import { PropsTable } from '../ui/props-table';

@Component({
  selector: 'app-label-doc-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, ElButton, ElLabel, CodeBlock, Preview, PropsTable],
  templateUrl: './label-doc.html',
  styleUrl: './page.scss',
})
export class LabelDocPage {
  protected readonly variantsPanel = signal<'preview' | 'code' | 'standards'>('preview');
  protected readonly requiredPanel = signal<'preview' | 'code' | 'standards'>('preview');

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

  protected readonly variantsCode = `<el-label variant="default">Default</el-label>
<el-label variant="muted">Muted</el-label>
<el-label variant="error">Error</el-label>`;

  protected readonly requiredCode = `<el-label htmlFor="email" [required]="true">Email</el-label>
<el-label [disabled]="true">Disabled label</el-label>`;

  protected readonly scopedTokensCode = `.checkout-panel {
  --el-color-primary: #059669;
  --el-color-on-primary: #ffffff;
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
