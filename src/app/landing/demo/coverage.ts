import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import {
  ElBadge,
  ElCard,
  ElCheckbox,
  ElProgress,
  ElProgressCircle,
  ElStack,
} from '@ng-elemental/ui';

@Component({
  selector: 'app-landing-demo-coverage',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ElCard, ElProgress, ElProgressCircle, ElBadge, ElCheckbox, ElStack],
  template: `
    <el-card appearance="outlined">
      <div elCardHeader>
        <div class="landing-demo-title-row">
          <span class="landing-demo-title">Sprint 42</span>
          <el-badge content="On track" size="sm" color="success" variant="pill" />
        </div>
        <p class="landing-demo-desc">Design-system release for the billing workspace.</p>
      </div>
      <div elCardContent>
        <el-stack direction="column" gap="4">
          <div class="landing-demo-stat">
            <el-progress-circle [value]="72" showValue size="sm" />
            <div class="landing-demo-stat__copy">
              <span class="landing-demo-stat__value">9 of 12 points</span>
              <p class="landing-demo-muted">3 checks left before freeze.</p>
            </div>
          </div>
          <el-progress [value]="72" size="sm" />
          <div class="landing-demo-checks">
            <el-checkbox [(checked)]="tokens" inputId="landing-sprint-tokens" disabled>
              Theme tokens copied
            </el-checkbox>
            <el-checkbox [(checked)]="overlays" inputId="landing-sprint-overlays">
              Dialog and toast
            </el-checkbox>
            <el-checkbox [(checked)]="table" inputId="landing-sprint-table">
              Table virtualization
            </el-checkbox>
          </div>
        </el-stack>
      </div>
    </el-card>
  `,
  styles: `
    :host {
      display: block;
      height: 100%;
    }
  `,
})
export class LandingDemoCoverage {
  protected readonly tokens = signal(true);
  protected readonly overlays = signal(true);
  protected readonly table = signal(false);
}
