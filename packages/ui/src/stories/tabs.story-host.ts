import { ChangeDetectionStrategy, Component, input, signal } from '@angular/core';
import { ElTab } from '../lib/tabs/tab';
import { ElTabContent } from '../lib/tabs/tab-content';
import { ElTabs } from '../lib/tabs/tabs';

@Component({
  selector: 'el-tabs-story-host',
  imports: [ElTabs, ElTab, ElTabContent],
  template: `
    <el-tabs
      [value]="selected()"
      (valueChange)="selected.set($event)"
      [disabled]="disabled()"
      [ariaLabel]="ariaLabel()"
    >
      <el-tab value="overview" label="Overview">
        <ng-template elTabContent>
          <p>Project overview, status, and recent activity.</p>
        </ng-template>
      </el-tab>
      <el-tab value="billing" label="Billing" [disabled]="disableBilling()">
        <ng-template elTabContent>
          <p>Invoices, payment methods, and billing contacts.</p>
        </ng-template>
      </el-tab>
      <el-tab value="team" label="Team">
        <ng-template elTabContent>
          <p>Members, roles, and pending invitations.</p>
        </ng-template>
      </el-tab>
    </el-tabs>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TabsStoryHost {
  readonly disabled = input(false);
  readonly ariaLabel = input('Account');
  readonly disableBilling = input(false);

  protected readonly selected = signal('overview');
}
