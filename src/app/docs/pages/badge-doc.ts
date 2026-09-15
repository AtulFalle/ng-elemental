import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  ElAvatar,
  ElBadge,
  ElButton,
  ElIcon,
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
  selector: 'app-badge-doc-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    RouterLink,
    ElBadge,
    ElButton,
    ElAvatar,
    ElIcon,
    ElTabs,
    ElTab,
    ElTabContent,
    CodeBlock,
    DocsExample,
    DocsPager,
    DocsSnippet,
    PropsTable,
  ],
  templateUrl: './badge-doc.html',
  styleUrl: './page.scss',
})
export class BadgeDocPage {
  protected readonly installTab = signal('cli');

  protected readonly heroCode = `<el-badge [count]="8">
  <el-button variant="icon" iconStart="bell" ariaLabel="Notifications, 8 unread" />
</el-badge>

<el-button variant="outline">
  More filters
  <el-badge [count]="3" />
</el-button>

<el-badge content="NEW" />`;

  protected readonly addCode = `npx @ng-elemental/cli add theme
npx @ng-elemental/cli add badge`;

  protected readonly manualFilesCode = `ui/badge/badge.ts
ui/badge/badge.html
ui/badge/badge.scss`;

  protected readonly importSnippet = `import { ElBadge } from './ui/badge/badge';`;

  protected readonly usageSnippet = `<el-badge [count]="8">
  <el-button variant="icon" iconStart="bell" ariaLabel="Notifications, 8 unread" />
</el-badge>

<el-button variant="outline">
  More filters
  <el-badge [count]="3" />
</el-button>`;

  protected readonly overlayCode = `<el-badge [count]="8">
  <el-button variant="icon" iconStart="bell" ariaLabel="Notifications, 8 unread" />
</el-badge>

<el-badge [count]="12">
  <el-avatar initials="AL" alt="Ada Lovelace, 12 notifications" />
</el-badge>

<el-badge content="NEW">
  <el-icon name="inbox" />
</el-badge>`;

  protected readonly pillCode = `<el-button variant="outline">
  More filters
  <el-badge [count]="3" />
</el-button>

<el-badge [count]="120" [max]="99" />
<el-badge content="12 more" />
<el-badge content="NEW" />`;

  protected readonly overflowCode = `<el-badge [count]="99">
  <el-avatar initials="AL" alt="Ada Lovelace, 99 notifications" />
</el-badge>
<el-badge [count]="100">
  <el-avatar initials="GH" alt="Grace Hopper, 99+ notifications" />
</el-badge>
<el-badge [count]="1000" [max]="999" />
<el-badge [count]="0" />
<el-badge [count]="0" showZero />`;

  protected readonly dotCode = `<el-badge dot ariaLabel="Unread">
  <el-icon name="envelope" />
</el-badge>
<el-badge dot ariaLabel="Online status" />`;

  protected readonly colorsCode = `<el-badge [count]="5" color="error" />
<el-badge [count]="5" color="primary" />
<el-badge [count]="5" color="success" />
<el-badge [count]="5" color="warning" />
<el-badge [count]="5" color="info" />
<el-badge [count]="5" color="neutral" />`;

  protected readonly sizeCode = `<el-badge [count]="8" size="sm">
  <el-button variant="icon" iconStart="bell" ariaLabel="Notifications, 8 unread" />
</el-badge>
<el-badge [count]="8" size="md">
  <el-button variant="icon" iconStart="bell" ariaLabel="Notifications, 8 unread" />
</el-badge>
<el-badge [count]="8" size="sm" />
<el-badge [count]="8" size="md" />`;

  protected readonly placementCode = `<el-badge [count]="8" placement="top-end">
  <el-avatar initials="TE" alt="Top end, 8 notifications" />
</el-badge>
<el-badge [count]="8" placement="top-start">
  <el-avatar initials="TS" alt="Top start, 8 notifications" />
</el-badge>
<el-badge [count]="8" placement="bottom-end">
  <el-avatar initials="BE" alt="Bottom end, 8 notifications" />
</el-badge>
<el-badge [count]="8" placement="bottom-start">
  <el-avatar initials="BS" alt="Bottom start, 8 notifications" />
</el-badge>`;

  protected readonly longCode = `<el-badge content="A very long notification label that must ellipsize">
  <el-button variant="icon" iconStart="bell" ariaLabel="Notifications" />
</el-badge>
<el-badge content="A very long filter summary that must ellipsize" />`;

  protected readonly scopedTokensCode = `.inbox-panel {
  --el-color-error: #dc2626;
  --el-color-primary: #0f172a;
}`;

  protected readonly props: PropDefinition[] = [
    {
      name: 'count',
      type: 'number | null',
      default: 'null',
      description:
        'Numeric value. Hidden when 0 unless showZero. Formats as {max}+ when over max.',
    },
    {
      name: 'max',
      type: 'number',
      default: '99',
      description: 'Overflow threshold. Counts above this render as {max}+.',
    },
    {
      name: 'content',
      type: 'string',
      default: "''",
      description:
        'Text label (NEW, 12 more). When non-empty, wins over count.',
    },
    {
      name: 'dot',
      type: 'boolean',
      default: 'false',
      description:
        'Presence mark with no visible text. Requires ariaLabel (exposed as role="img"). Hidden at count 0 unless showZero.',
    },
    {
      name: 'showZero',
      type: 'boolean',
      default: 'false',
      description: 'Show the indicator when count is 0.',
    },
    {
      name: 'variant',
      type: "'auto' | 'overlay' | 'pill'",
      default: "'auto'",
      description:
        'auto overlays when an element is projected, otherwise pill. Pills should be self-closing; projected children stay in the layout if you force pill.',
    },
    {
      name: 'color',
      type: "'error' | 'primary' | 'success' | 'warning' | 'info' | 'neutral' | ''",
      default: "'' (auto)",
      description:
        'Semantic fill. Empty uses error for overlay and primary for pill.',
    },
    {
      name: 'size',
      type: "'sm' | 'md'",
      default: "'md'",
      description: 'Indicator size. Overlay stays compact; pill md is readable inline.',
    },
    {
      name: 'placement',
      type: "'top-end' | 'top-start' | 'bottom-end' | 'bottom-start'",
      default: "'top-end'",
      description: 'Overlay corner. Uses logical insets and :dir(rtl) for the nudge.',
    },
    {
      name: 'ariaLabel',
      type: 'string',
      default: "''",
      description:
        'Accessible name for dots and optional SR override. Sets role="img" on the indicator. Visible text is enough for counts and short labels.',
    },
  ];
}
