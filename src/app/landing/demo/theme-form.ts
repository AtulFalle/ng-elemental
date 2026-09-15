import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import {
  ElButton,
  ElCard,
  ElCheckbox,
  ElIcon,
  ElInput,
  ElInputPrefix,
  ElLabel,
  ElRadio,
  ElRadioGroup,
  ElSelect,
  ElSelectItem,
  ElStack,
} from '@ng-elemental/ui';

@Component({
  selector: 'app-landing-demo-theme-form',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ElCard,
    ElInput,
    ElInputPrefix,
    ElIcon,
    ElLabel,
    ElSelect,
    ElSelectItem,
    ElRadio,
    ElRadioGroup,
    ElCheckbox,
    ElButton,
    ElStack,
  ],
  template: `
    <el-card appearance="outlined">
      <div elCardHeader>
        <span class="landing-demo-title">Invite teammate</span>
        <p class="landing-demo-desc">Give Maya access to the Northwind workspace.</p>
      </div>
      <div elCardContent>
        <el-stack direction="column" gap="4">
          <div class="landing-demo-field">
            <el-label htmlFor="landing-invite-email" required>Work email</el-label>
            <el-input
              [(value)]="email"
              type="email"
              placeholder="maya@northwind.dev"
              size="sm"
              inputId="landing-invite-email"
              autocomplete="email"
            >
              <el-icon elInputPrefix name="envelope" size="sm" />
            </el-input>
          </div>
          <div class="landing-demo-field">
            <el-label>Role</el-label>
            <el-select
              [(value)]="role"
              placeholder="Choose a role"
              size="sm"
              ariaLabel="Workspace role"
            >
              <el-select-item value="admin" label="Admin">Admin</el-select-item>
              <el-select-item value="editor" label="Editor">Editor</el-select-item>
              <el-select-item value="viewer" label="Viewer">Viewer</el-select-item>
            </el-select>
          </div>
          <div class="landing-demo-field">
            <el-label>Access</el-label>
            <el-radio-group
              [(value)]="access"
              direction="vertical"
              ariaLabel="Workspace access"
            >
              <el-radio value="all" inputId="landing-invite-all">All projects</el-radio>
              <el-radio value="billing" inputId="landing-invite-billing">Billing only</el-radio>
            </el-radio-group>
          </div>
          <el-checkbox [(checked)]="notify" inputId="landing-invite-notify">
            Send a welcome email
          </el-checkbox>
        </el-stack>
      </div>
      <div elCardFooter>
        <el-button variant="ghost" size="sm">Cancel</el-button>
        <el-button variant="primary" size="sm" iconStart="paper-plane">Send invite</el-button>
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
export class LandingDemoThemeForm {
  protected readonly email = signal('maya@northwind.dev');
  protected readonly role = signal('editor');
  protected readonly access = signal('all');
  protected readonly notify = signal(true);
}
