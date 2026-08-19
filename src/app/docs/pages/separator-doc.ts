import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ElButton, ElSeparator } from '@ng-elemental/ui';
import type { PropDefinition } from '../nav';
import { CodeBlock } from '../ui/code-block';
import { Preview } from '../ui/preview';
import { PropsTable } from '../ui/props-table';

@Component({
  selector: 'app-separator-doc-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, ElButton, ElSeparator, CodeBlock, Preview, PropsTable],
  templateUrl: './separator-doc.html',
  styleUrl: './page.scss',
})
export class SeparatorDocPage {
  protected readonly horizontalPanel = signal<'preview' | 'code' | 'standards'>('preview');
  protected readonly verticalPanel = signal<'preview' | 'code' | 'standards'>('preview');

  protected readonly addCode = `npx @ng-elemental/cli add theme
npx @ng-elemental/cli add separator`;

  protected readonly importCode = `import { ElSeparator } from './ui/separator/separator';

@Component({
  imports: [ElSeparator],
  template: \`<el-separator />\`,
})
export class MyComponent {}`;

  protected readonly horizontalCode = `<div>Above</div>
<el-separator style="margin-block: var(--el-space-3)" />
<div>Below</div>`;

  protected readonly verticalCode = `<div style="display: flex; align-items: stretch; gap: var(--el-space-3); height: 2rem">
  <span>Left</span>
  <el-separator orientation="vertical" />
  <span>Right</span>
</div>`;

  protected readonly scopedTokensCode = `.checkout-panel {
  --el-color-outline-variant: #d6d3d1;
}`;

  protected readonly props: PropDefinition[] = [
    {
      name: 'orientation',
      type: "'horizontal' | 'vertical'",
      default: "'horizontal'",
      description: 'Axis of the rule.',
    },
    {
      name: 'decorative',
      type: 'boolean',
      default: 'true',
      description:
        'When true, aria-hidden. When false, role="separator" and aria-orientation.',
    },
  ];
}
