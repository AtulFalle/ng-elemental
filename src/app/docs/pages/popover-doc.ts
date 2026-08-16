import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  ElButton,
  ElPopover,
  ElPopoverClose,
  ElPopoverPanel,
  ElPopoverTrigger,
} from '@ng-elemental/ui';
import type { PropDefinition } from '../nav';
import { CodeBlock } from '../ui/code-block';
import { Preview } from '../ui/preview';
import { PropsTable } from '../ui/props-table';

@Component({
  selector: 'app-popover-doc-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    RouterLink,
    ElButton,
    ElPopover,
    ElPopoverClose,
    ElPopoverPanel,
    ElPopoverTrigger,
    CodeBlock,
    Preview,
    PropsTable,
  ],
  templateUrl: './popover-doc.html',
  styleUrl: './page.scss',
})
export class PopoverDocPage {
  protected readonly addCode = `npx @ng-elemental/cli add theme
npx @ng-elemental/cli add button
npx @ng-elemental/cli add popover`;

  protected readonly importCode = `import {
  ElPopover,
  ElPopoverPanel,
  ElPopoverTrigger,
} from './ui/popover/popover';
import { ElButton } from './ui/button/button';

@Component({
  imports: [ElPopover, ElPopoverPanel, ElPopoverTrigger, ElButton],
  template: \`
    <el-popover>
      <el-button elPopoverTrigger>Details</el-button>
      <el-popover-panel>
        <span elPopoverTitle>Assignee</span>
        Ada Lovelace
      </el-popover-panel>
    </el-popover>
  \`,
})
export class MyComponent {}`;

  protected readonly usageCode = `<el-popover position="bottom">
  <el-button elPopoverTrigger>Details</el-button>
  <el-popover-panel>
    <span elPopoverTitle>Assignee</span>
    Ada Lovelace
    <el-button elPopoverClose variant="ghost" size="sm">Close</el-button>
  </el-popover-panel>
</el-popover>`;

  protected readonly scopedTokensCode = `.profile-card {
  --el-color-primary: #059669;
  --el-color-on-primary: #ffffff;
}`;

  protected readonly props: PropDefinition[] = [
    {
      name: 'open',
      type: 'boolean',
      default: 'false',
      description: 'Open state. Bind [(open)] to control it.',
    },
    {
      name: 'position',
      type: "'top' | 'bottom' | 'start' | 'end'",
      default: "'bottom'",
      description: 'Preferred placement. Start/end follow text direction. Overflow flips.',
    },
    {
      name: 'trigger',
      type: "'click' | 'hover'",
      default: "'click'",
      description: 'Click toggle, or hover-card. Not a tooltip — this takes rich content.',
    },
    {
      name: 'modal',
      type: 'boolean',
      default: 'false',
      description: 'Shows a backdrop and moves focus into the panel.',
    },
    {
      name: 'arrow',
      type: 'boolean',
      default: 'true',
      description: 'Arrow toward the trigger.',
    },
    {
      name: 'disabled',
      type: 'boolean',
      default: 'false',
      description: 'Prevents opening.',
    },
    {
      name: 'ariaLabel',
      type: 'string',
      default: '—',
      description: 'Accessible name when there is no elPopoverTitle.',
    },
  ];
}
