import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ElButton } from '@ng-elemental/ui';
import type { PropDefinition } from '../nav';
import { CodeBlock } from '../ui/code-block';
import { Preview } from '../ui/preview';
import { PropsTable } from '../ui/props-table';

@Component({
  selector: 'app-button-doc-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, ElButton, CodeBlock, Preview, PropsTable],
  templateUrl: './button-doc.html',
  styleUrl: './page.scss',
})
export class ButtonDocPage {

  protected readonly addCode = `npx @ng-elemental/cli add button`;

  protected readonly importCode = `import { ElButton } from './ui/button/button';

@Component({
  imports: [ElButton],
  template: \`<el-button variant="primary">Save</el-button>\`,
})
export class MyComponent {}`;

  protected readonly usageCode = `<el-button variant="primary" iconStart="plus">Save</el-button>
<el-button variant="secondary" size="sm">Cancel</el-button>
<el-button variant="ghost" iconEnd="arrow-right">Next</el-button>`;

  protected readonly scopedTokensCode = `.checkout-panel {
  --el-color-primary: #059669;
  --el-color-on-primary: #ffffff;
}`;

  protected readonly props: PropDefinition[] = [
    {
      name: 'variant',
      type: "'primary' | 'secondary' | 'ghost'",
      default: "'primary'",
      description: 'Visual style of the button.',
    },
    {
      name: 'size',
      type: "'sm' | 'md' | 'lg'",
      default: "'md'",
      description: 'Button size.',
    },
    {
      name: 'disabled',
      type: 'boolean',
      default: 'false',
      description: 'Disables the button.',
    },
    {
      name: 'type',
      type: "'button' | 'submit' | 'reset'",
      default: "'button'",
      description: 'Native button type attribute.',
    },
    {
      name: 'iconStart',
      type: 'string',
      default: "''",
      description: 'Font Awesome icon name shown before the label (requires icon component).',
    },
    {
      name: 'iconEnd',
      type: 'string',
      default: "''",
      description: 'Font Awesome icon name shown after the label (requires icon component).',
    },
    {
      name: 'iconVariant',
      type: "'solid' | 'regular' | 'brands'",
      default: "'solid'",
      description: 'Font Awesome style for button icons.',
    },
  ];
}
