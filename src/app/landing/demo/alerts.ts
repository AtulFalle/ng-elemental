import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import {
  ElCard,
  ElLabel,
  ElRadio,
  ElRadioGroup,
  ElSeparator,
  ElSlideToggle,
  ElStack,
} from '@ng-elemental/ui';

@Component({
  selector: 'app-landing-demo-alerts',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ElCard,
    ElSlideToggle,
    ElRadio,
    ElRadioGroup,
    ElLabel,
    ElSeparator,
    ElStack,
  ],
  template: `
    <el-card appearance="outlined">
      <div elCardHeader>
        <span class="landing-demo-title">Notifications</span>
        <p class="landing-demo-desc">Choose how Northwind reaches you.</p>
      </div>
      <div elCardContent>
        <el-stack direction="column" gap="4">
          <div class="landing-demo-field">
            <el-label>Email digest</el-label>
            <el-radio-group
              [(value)]="digest"
              direction="horizontal"
              ariaLabel="Email digest"
            >
              <el-radio value="instant" inputId="landing-digest-instant">Instant</el-radio>
              <el-radio value="daily" inputId="landing-digest-daily">Daily</el-radio>
            </el-radio-group>
          </div>
          <el-separator />
          <div class="landing-demo-setting">
            <el-slide-toggle
              [(checked)]="product"
              size="sm"
              labelPosition="left"
              inputId="landing-alert-product"
            >
              Product updates
            </el-slide-toggle>
            <p class="landing-demo-muted">New components, MCP, and CLI releases.</p>
          </div>
          <div class="landing-demo-setting">
            <el-slide-toggle
              [(checked)]="security"
              size="sm"
              labelPosition="left"
              inputId="landing-alert-security"
            >
              Security alerts
            </el-slide-toggle>
            <p class="landing-demo-muted">Sign-ins and billing changes.</p>
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
export class LandingDemoAlerts {
  protected readonly digest = signal('daily');
  protected readonly product = signal(true);
  protected readonly security = signal(true);
}
