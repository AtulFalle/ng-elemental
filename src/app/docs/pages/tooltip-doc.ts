import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ElButton, ElTooltip } from '@ng-elemental/ui';
import type { PropDefinition } from '../nav';
import { CodeBlock } from '../ui/code-block';
import { Preview } from '../ui/preview';
import { PropsTable } from '../ui/props-table';

@Component({
  selector: 'app-tooltip-doc-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, ElButton, ElTooltip, CodeBlock, Preview, PropsTable],
  templateUrl: './tooltip-doc.html',
  styleUrl: './page.scss',
})
export class TooltipDocPage {
  protected readonly addCode = `npx @ng-elemental/cli add theme
npx @ng-elemental/cli add button
npx @ng-elemental/cli add tooltip`;

  protected readonly importCode = `import { ElTooltip } from './ui/tooltip/tooltip';
import { ElButton } from './ui/button/button';

@Component({
  imports: [ElTooltip, ElButton],
  template: \`
    <el-button elTooltip="Save file">Save</el-button>
  \`,
})
export class MyComponent {}`;

  protected readonly usageCode = `<el-button elTooltip="Save file">Save</el-button>
<el-button elTooltip="More" elTooltipPosition="end">Open</el-button>
<el-button elTooltip="Hidden" elTooltipDisabled>Disabled tip</el-button>`;

  protected readonly scopedTokensCode = `.checkout-panel {
  --el-color-inverse-surface: #111827;
  --el-color-inverse-on-surface: #f9fafb;
}`;

  protected readonly props: PropDefinition[] = [
    {
      name: 'elTooltip',
      type: 'string',
      default: "''",
      description: 'Tooltip label. Empty text never opens.',
    },
    {
      name: 'elTooltipPosition',
      type: "'top' | 'bottom' | 'start' | 'end'",
      default: "'top'",
      description: 'Preferred placement relative to the host. Start/end follow text direction.',
    },
    {
      name: 'elTooltipDisabled',
      type: 'boolean',
      default: 'false',
      description: 'Prevents the tooltip from opening.',
    },
    {
      name: 'elTooltipDelay',
      type: 'number',
      default: '200',
      description: 'Show delay in milliseconds.',
    },
    {
      name: 'elTooltipOpen',
      type: 'boolean',
      default: 'false',
      description: 'Open state. Hover/focus write this model; bind it to keep a tip visible.',
    },
  ];
}
