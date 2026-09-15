import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  ElBadge,
  ElButton,
  ElIcon,
  ElNav,
  ElNavHeading,
  ElNavItem,
  ElNavLabelSlot,
  ElNavLeadingSlot,
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
  selector: 'app-navigation-doc-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    RouterLink,
    ElBadge,
    ElNav,
    ElNavItem,
    ElNavHeading,
    ElNavLeadingSlot,
    ElNavLabelSlot,
    ElIcon,
    ElButton,
    ElTabs,
    ElTab,
    ElTabContent,
    CodeBlock,
    DocsExample,
    DocsPager,
    DocsSnippet,
    PropsTable,
  ],
  templateUrl: './navigation-doc.html',
  styleUrl: './page.scss',
})
export class NavigationDocPage {
  protected readonly installTab = signal('cli');
  protected readonly active = signal('inbox');
  protected readonly railActive = signal('navigation');
  protected readonly railExpanded = signal<string[]>(['components']);
  protected readonly softActive = signal('inbox');
  protected readonly itemActive = signal('inbox');
  protected readonly countActive = signal('inbox');
  protected readonly newActive = signal('observability');
  protected readonly nestedActive = signal('navigation');
  protected readonly expanded = signal<string[]>(['components']);
  protected readonly singleExpanded = signal<string[]>(['account']);
  protected readonly singleActive = signal('profile');

  protected readonly heroCode = `<el-nav
  appearance="soft"
  [value]="active()"
  (valueChange)="active.set($event)"
  ariaLabel="Mail"
  style="max-width: 16rem"
>
  <el-nav-heading>Favorites</el-nav-heading>
  <el-nav-item value="inbox" icon="inbox" label="Inbox">
    <el-badge elNavBadge [count]="24" size="sm" color="neutral" />
  </el-nav-item>
  <el-nav-item value="starred" icon="star" label="Starred" />
  <el-nav-heading>Mailboxes</el-nav-heading>
  <el-nav-item value="sent" icon="paper-plane" label="Sent" />
  <el-nav-item value="drafts" icon="file-lines" label="Drafts">
    <el-badge elNavBadge [count]="3" size="sm" color="neutral" />
  </el-nav-item>
</el-nav>`;

  protected readonly addCode = `npx @ng-elemental/cli add theme
npx @ng-elemental/cli add icon
npx @ng-elemental/cli add navigation`;

  protected readonly manualIconCode = `npx @ng-elemental/cli add icon`;

  protected readonly manualFilesCode = `ui/navigation/navigation.ts
ui/navigation/navigation.html
ui/navigation/navigation.scss
ui/navigation/navigation-item.ts
ui/navigation/navigation-item.html
ui/navigation/navigation-item.scss
ui/navigation/navigation-heading.ts
ui/navigation/navigation-heading.html
ui/navigation/navigation-heading.scss
ui/navigation/navigation.token.ts`;

  protected readonly importSnippet = `import {
  ElNav,
  ElNavItem,
  ElNavHeading,
} from './ui/navigation/navigation';`;

  protected readonly usageSnippet = `<el-nav appearance="soft" [(value)]="active" ariaLabel="Mail">
  <el-nav-item value="inbox" icon="inbox" label="Inbox" />
  <el-nav-item value="sent" icon="paper-plane" label="Sent" />
</el-nav>`;

  protected readonly softCode = `<el-nav
  appearance="soft"
  [value]="softActive()"
  (valueChange)="softActive.set($event)"
  ariaLabel="Mail"
  style="max-width: 16rem"
>
  <el-nav-item value="inbox" icon="inbox" label="Inbox" />
  <el-nav-item value="starred" icon="star" label="Starred" />
  <el-nav-item value="sent" icon="paper-plane" label="Sent" />
  <el-nav-item value="drafts" icon="file-lines" label="Drafts" />
</el-nav>`;

  protected readonly railCode = `<el-nav
  appearance="rail"
  [value]="railActive()"
  (valueChange)="railActive.set($event)"
  [expanded]="railExpanded()"
  (expandedChange)="railExpanded.set($event)"
  ariaLabel="Documentation"
  style="max-width: 16rem"
>
  <el-nav-heading>Getting started</el-nav-heading>
  <el-nav-item value="intro" label="Introduction" />
  <el-nav-item value="installation" label="Installation" />
  <el-nav-item value="components">
    <el-icon elNavLeading name="cubes" />
    <span elNavLabel>Components</span>
    <el-nav-item value="button" label="Button" />
    <el-nav-item value="input" label="Input" />
    <el-nav-item value="navigation" label="Navigation" />
  </el-nav-item>
</el-nav>`;

  protected readonly sizeCode = `<div class="docs-page__nav-demo">
  <el-nav appearance="soft" size="sm" value="inbox" ariaLabel="Small" style="max-width: 14rem">
    <el-nav-item value="inbox" icon="inbox" label="Inbox" />
    <el-nav-item value="sent" icon="paper-plane" label="Sent" />
  </el-nav>
  <el-nav appearance="soft" size="md" value="inbox" ariaLabel="Medium" style="max-width: 14rem">
    <el-nav-item value="inbox" icon="inbox" label="Inbox" />
    <el-nav-item value="sent" icon="paper-plane" label="Sent" />
  </el-nav>
  <el-nav appearance="soft" size="lg" value="inbox" ariaLabel="Large" style="max-width: 14rem">
    <el-nav-item value="inbox" icon="inbox" label="Inbox" />
    <el-nav-item value="sent" icon="paper-plane" label="Sent" />
  </el-nav>
</div>`;

  protected readonly itemContentCode = `<el-nav
  appearance="soft"
  [value]="itemActive()"
  (valueChange)="itemActive.set($event)"
  ariaLabel="Mail"
  style="max-width: 16rem"
>
  <el-nav-item value="inbox">
    <el-icon elNavLeading name="inbox" />
    <span elNavLabel>Inbox</span>
    <el-badge elNavBadge [count]="24" size="sm" color="neutral" />
    <el-button
      elNavActions
      variant="ghost"
      size="sm"
      iconStart="ellipsis-vertical"
      ariaLabel="Inbox actions"
    />
  </el-nav-item>
  <el-nav-item value="starred" icon="star" label="Starred" />
  <el-nav-item value="sent" icon="paper-plane" label="Sent" />
  <el-nav-item value="drafts" icon="file-lines" label="Drafts">
    <el-badge elNavBadge [count]="3" size="sm" color="neutral" />
  </el-nav-item>
</el-nav>`;

  protected readonly badgesCode = `<div class="docs-page__nav-demo">
  <div class="docs-page__nav-pane">
    <p class="docs-page__nav-pane-label">Unread counts</p>
    <el-nav
      appearance="soft"
      [value]="countActive()"
      (valueChange)="countActive.set($event)"
      ariaLabel="Mail"
    >
      <el-nav-item value="inbox" icon="inbox" label="Inbox">
        <el-badge elNavBadge [count]="24" size="sm" color="neutral" />
      </el-nav-item>
      <el-nav-item value="starred" icon="star" label="Starred" />
      <el-nav-item value="drafts" icon="file-lines" label="Drafts">
        <el-badge elNavBadge [count]="3" size="sm" color="neutral" />
      </el-nav-item>
    </el-nav>
  </div>
  <div class="docs-page__nav-pane">
    <p class="docs-page__nav-pane-label">New</p>
    <el-nav
      appearance="soft"
      [value]="newActive()"
      (valueChange)="newActive.set($event)"
      ariaLabel="Project"
    >
      <el-nav-item value="overview" icon="house" label="Overview" />
      <el-nav-item value="analytics" icon="chart-line" label="Analytics" />
      <el-nav-item value="observability" icon="bell" label="Observability">
        <el-badge elNavBadge content="NEW" size="sm" />
      </el-nav-item>
    </el-nav>
  </div>
</div>`;

  protected readonly nestedCode = `<el-nav
  appearance="soft"
  [value]="nestedActive()"
  (valueChange)="nestedActive.set($event)"
  [expanded]="expanded()"
  (expandedChange)="expanded.set($event)"
  ariaLabel="Documentation"
  style="max-width: 16rem"
>
  <el-nav-heading>Getting started</el-nav-heading>
  <el-nav-item value="intro" label="Introduction" />
  <el-nav-item value="installation" label="Installation" />
  <el-nav-item value="components">
    <el-icon elNavLeading name="cubes" />
    <span elNavLabel>Components</span>
    <el-nav-item value="button" label="Button" />
    <el-nav-item value="input" label="Input" />
    <el-nav-item value="navigation" label="Navigation" />
  </el-nav-item>
</el-nav>`;

  protected readonly expandModeCode = `<el-nav
  appearance="soft"
  expandMode="single"
  [value]="singleActive()"
  (valueChange)="singleActive.set($event)"
  [expanded]="singleExpanded()"
  (expandedChange)="singleExpanded.set($event)"
  ariaLabel="Settings"
  style="max-width: 16rem"
>
  <el-nav-item value="account">
    <span elNavLabel>Account</span>
    <el-nav-item value="profile" icon="user" label="Profile" />
    <el-nav-item value="password" label="Password" />
  </el-nav-item>
  <el-nav-item value="organization">
    <span elNavLabel>Organization</span>
    <el-nav-item value="members" label="Members" />
    <el-nav-item value="billing" label="Billing" />
  </el-nav-item>
</el-nav>`;

  protected readonly disabledCode = `<el-nav appearance="soft" value="overview" ariaLabel="Account" style="max-width: 16rem">
  <el-nav-item value="overview" icon="house" label="Overview" />
  <el-nav-item value="billing" icon="file-lines" label="Billing" disabled />
</el-nav>`;

  protected readonly navProps: PropDefinition[] = [
    {
      name: 'appearance',
      type: "'rail' | 'soft'",
      default: "'rail'",
      description:
        'Soft fills the current row. Rail is the no-fill style with a left accent bar.',
    },
    {
      name: 'size',
      type: "'sm' | 'md' | 'lg'",
      default: "'md'",
      description: 'Row padding and type scale.',
    },
    {
      name: 'value',
      type: 'string',
      default: "''",
      description: 'Two-way current item id. Bind with [(value)].',
    },
    {
      name: 'expanded',
      type: 'string[]',
      default: '[]',
      description: 'Two-way open parent ids. Bind with [(expanded)].',
    },
    {
      name: 'expandMode',
      type: "'multiple' | 'single'",
      default: "'multiple'",
      description: 'When single, opening one parent closes siblings at the same level.',
    },
    {
      name: 'autoExpand',
      type: 'boolean',
      default: 'true',
      description:
        'When value changes, expands ancestors of the current item. Does not block collapsing those sections.',
    },
    {
      name: 'disabled',
      type: 'boolean',
      default: 'false',
      description: 'Disables the whole navigation region.',
    },
    {
      name: 'ariaLabel',
      type: 'string',
      default: '—',
      description: 'Accessible name for the nav landmark.',
    },
  ];

  protected readonly itemProps: PropDefinition[] = [
    {
      name: 'value',
      type: 'string',
      default: 'required',
      description: 'Stable id used for value, expanded, and activation.',
    },
    {
      name: 'label',
      type: 'string',
      default: "''",
      description: 'Fallback title when [elNavLabel] is not projected.',
    },
    {
      name: 'sublabel',
      type: 'string',
      default: "''",
      description: 'Fallback description when [elNavSublabel] is not projected.',
    },
    {
      name: 'icon',
      type: 'string',
      default: "''",
      description: 'Font Awesome name for a leading icon when [elNavLeading] is absent.',
    },
    {
      name: 'href',
      type: 'string',
      default: '—',
      description:
        'Renders the row as a link in your app. Live docs examples omit href so clicks stay on this page. On a parent, the chevron stays a separate disclosure button.',
    },
    {
      name: 'disabled',
      type: 'boolean',
      default: 'false',
      description: 'Disables this item.',
    },
    {
      name: 'activated',
      type: 'output<void>',
      default: '—',
      description: 'Emits when a leaf or link row is activated.',
    },
  ];
}
