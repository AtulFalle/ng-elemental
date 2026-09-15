import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  ElButton,
  ElPopover,
  ElPopoverClose,
  ElPopoverPanel,
  ElPopoverTrigger,
  ElTab,
  ElTabContent,
  ElTabs,
} from '@ng-elemental/ui';
import type { PropDefinition } from '../nav';
import { CodeBlock } from '../ui/code-block';
import { DocsExample } from '../ui/docs-example';
import { DocsPager } from '../ui/docs-pager';
import { DocsSnippet } from '../ui/docs-snippet';
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
    ElTabs,
    ElTab,
    ElTabContent,
    CodeBlock,
    DocsExample,
    DocsPager,
    DocsSnippet,
    PropsTable,
  ],
  templateUrl: './popover-doc.html',
  styleUrl: './page.scss',
})
export class PopoverDocPage {
  protected readonly installTab = signal('cli');

  protected readonly addCode = `npx @ng-elemental/cli add theme
npx @ng-elemental/cli add button
npx @ng-elemental/cli add popover`;

  protected readonly manualFilesCode = `ui/popover/popover.ts
ui/popover/popover.html
ui/popover/popover.scss
ui/popover/popover-trigger.ts
ui/popover/popover-panel.ts
ui/popover/popover-panel.html
ui/popover/popover-panel.scss
ui/popover/popover-close.ts
ui/popover/popover-position.ts
ui/popover/popover.token.ts`;

  protected readonly importSnippet = `import {
  ElPopover,
  ElPopoverPanel,
  ElPopoverTrigger,
} from './ui/popover/popover';
import { ElButton } from './ui/button/button';`;

  protected readonly usageSnippet = `<el-popover position="bottom">
  <el-button elPopoverTrigger>Details</el-button>
  <el-popover-panel>
    <span elPopoverTitle>Assignee</span>
    Ada Lovelace
    <el-button elPopoverClose variant="ghost" size="sm">Close</el-button>
  </el-popover-panel>
</el-popover>`;

  protected readonly positionsCode = `<el-popover position="top">
  <el-button elPopoverTrigger>Top</el-button>
  <el-popover-panel>
    <span elPopoverTitle>Top</span>
    Anchored above.
  </el-popover-panel>
</el-popover>`;

  protected readonly hoverCode = `<el-popover trigger="hover" position="top">
  <el-button elPopoverTrigger>Hover me</el-button>
  <el-popover-panel>
    <span elPopoverTitle>Hover card</span>
    Rich content, not a tooltip.
  </el-popover-panel>
</el-popover>`;

  protected readonly modalCode = `<el-popover modal>
  <el-button elPopoverTrigger>Modal popover</el-button>
  <el-popover-panel>
    <span elPopoverTitle>Confirm</span>
    Focus moves into the panel.
    <el-button elPopoverClose variant="primary" size="sm">Done</el-button>
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
