import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ElSeparator } from '@ng-elemental/ui';
import type { PropDefinition } from '../nav';
import { CodeBlock } from '../ui/code-block';
import { Preview } from '../ui/preview';
import { PropsTable } from '../ui/props-table';

@Component({
  selector: 'app-separator-doc-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, ElSeparator, CodeBlock, Preview, PropsTable],
  templateUrl: './separator-doc.html',
  styleUrl: './page.scss',
})
export class SeparatorDocPage {
  protected readonly addCode = `npx @ng-elemental/cli add theme
npx @ng-elemental/cli add separator`;

  protected readonly importCode = `import { ElSeparator } from './ui/separator/separator';

@Component({
  imports: [ElSeparator],
  template: \`<el-separator />\`,
})
export class MyComponent {}`;

  protected readonly usageCode = `<el-separator />
<el-separator orientation="vertical" />
<el-separator [decorative]="false" />`;

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
