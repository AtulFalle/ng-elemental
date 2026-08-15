import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ElIcon, ElTab, ElTabContent, ElTabLabel, ElTabs } from '@ng-elemental/ui';
import type { PropDefinition } from '../nav';
import { CodeBlock } from '../ui/code-block';
import { Preview } from '../ui/preview';
import { PropsTable } from '../ui/props-table';

@Component({
  selector: 'app-tabs-doc-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    RouterLink,
    ElIcon,
    ElTabs,
    ElTab,
    ElTabContent,
    ElTabLabel,
    CodeBlock,
    Preview,
    PropsTable,
  ],
  templateUrl: './tabs-doc.html',
  styleUrl: './page.scss',
})
export class TabsDocPage {
  protected readonly selected = signal('overview');
  protected readonly iconDemo = signal('profile');
  protected readonly disabledTabDemo = signal('overview');
  protected readonly overflowDemo = signal('overview');

  protected readonly addCode = `npx @ng-elemental/cli add theme
npx @ng-elemental/cli add icon
npx @ng-elemental/cli add tabs`;

  protected readonly importCode = `import {
  ElTabs,
  ElTab,
  ElTabContent,
} from './ui/tabs/tabs';

@Component({
  imports: [ElTabs, ElTab, ElTabContent],
  template: \`
    <el-tabs [(value)]="selected" ariaLabel="Account">
      <el-tab value="overview" label="Overview">
        <ng-template elTabContent>
          <p>Any HTML goes here.</p>
        </ng-template>
      </el-tab>
      <el-tab value="billing" label="Billing">
        <ng-template elTabContent>
          <p>Billing details.</p>
        </ng-template>
      </el-tab>
    </el-tabs>
  \`,
})
export class MyComponent {
  protected selected = 'overview';
}`;

  protected readonly usageCode = `<el-tabs [(value)]="selected" ariaLabel="Account">
  <el-tab value="overview" label="Overview">
    <ng-template elTabContent>
      <p>Any HTML, components, or forms.</p>
    </ng-template>
  </el-tab>
  <el-tab value="billing" label="Billing">
    <ng-template elTabContent>
      <p>Billing details.</p>
    </ng-template>
  </el-tab>
</el-tabs>`;

  protected readonly labelTemplateCode = `<el-tabs [(value)]="selected" ariaLabel="Settings">
  <el-tab value="profile">
    <ng-template elTabLabel>
      <el-icon name="user" size="sm" />
      Profile
    </ng-template>
    <ng-template elTabContent>
      <p>Profile settings.</p>
    </ng-template>
  </el-tab>
</el-tabs>`;

  protected readonly scopedTokensCode = `.settings-panel {
  --el-color-primary: #059669;
  --el-color-on-primary: #ffffff;
}`;

  protected readonly tabsProps: PropDefinition[] = [
    {
      name: 'value',
      type: 'string',
      default: "''",
      description:
        'Active tab value. Supports two-way binding. Falls back to the first enabled tab when empty or invalid.',
    },
    {
      name: 'disabled',
      type: 'boolean',
      default: 'false',
      description: 'Disables every tab.',
    },
    {
      name: 'ariaLabel',
      type: 'string',
      default: 'undefined',
      description: 'Accessible name for the tablist when no visible label exists.',
    },
  ];

  protected readonly tabProps: PropDefinition[] = [
    {
      name: 'value',
      type: 'string',
      default: '(required)',
      description: 'Unique value for this tab.',
    },
    {
      name: 'label',
      type: 'string',
      default: "''",
      description:
        'Tab header text. Falls back to value when omitted. Ignored when elTabLabel is provided.',
    },
    {
      name: 'disabled',
      type: 'boolean',
      default: 'false',
      description: 'Disables this tab only.',
    },
  ];
}
