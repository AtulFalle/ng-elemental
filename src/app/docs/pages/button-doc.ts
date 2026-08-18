import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
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
  protected readonly heroPanel = signal<'preview' | 'code' | 'standards'>('preview');
  protected readonly iconPanel = signal<'preview' | 'code' | 'standards'>('preview');
  protected readonly loadingPanel = signal<'preview' | 'code' | 'standards'>('preview');
  protected readonly longLabelPanel = signal<'preview' | 'code' | 'standards'>('preview');
  protected readonly variantPanel = signal<'preview' | 'code' | 'standards'>('preview');
  protected readonly sizePanel = signal<'preview' | 'code' | 'standards'>('preview');

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

  protected readonly iconOnlyCode = `<el-button
  variant="icon"
  iconStart="ellipsis-vertical"
  ariaLabel="More actions"
></el-button>`;

  protected readonly loadingCode = `<el-button
  variant="primary"
  [loading]="true"
  loadingLabel="Saving"
>
  Save changes
</el-button>`;

  protected readonly longLabelCode = `<div style="max-width: 17rem;">
  <el-button variant="secondary">
    Save shipping preferences and billing profile changes
  </el-button>
</div>`;

  protected readonly variantCode = `<el-button variant="primary">Primary</el-button>
<el-button variant="secondary">Secondary</el-button>
<el-button variant="ghost">Ghost</el-button>
<el-button variant="icon" iconStart="bookmark" ariaLabel="Bookmark"></el-button>`;

  protected readonly sizeCode = `<el-button size="sm">Small</el-button>
<el-button size="md">Medium</el-button>
<el-button size="lg">Large</el-button>`;

  protected readonly scopedTokensCode = `.checkout-panel {
  --el-color-primary: #059669;
  --el-color-on-primary: #ffffff;
}`;

  protected readonly props: PropDefinition[] = [
    {
      name: 'variant',
      type: "'primary' | 'secondary' | 'ghost' | 'icon'",
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
      name: 'ariaLabel',
      type: 'string',
      default: "''",
      description:
        'Accessible name for icon-only buttons or when visible text is not descriptive enough.',
    },
    {
      name: 'loading',
      type: 'boolean',
      default: 'false',
      description:
        'Shows a spinner, marks the button busy, and disables activation while work is in progress.',
    },
    {
      name: 'loadingLabel',
      type: 'string',
      default: "'Loading'",
      description: 'Text announced and shown for non-icon loading buttons.',
    },
    {
      name: 'iconVariant',
      type: "'solid' | 'regular' | 'brands'",
      default: "'solid'",
      description: 'Font Awesome style for button icons.',
    },
  ];
}
