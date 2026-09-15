import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import {
  ElAvatar,
  ElBadge,
  ElIcon,
  ElNav,
  ElNavHeading,
  ElNavItem,
  ElNavLeadingSlot,
} from '@ng-elemental/ui';

@Component({
  selector: 'app-landing-demo-nav-rail',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ElNav, ElNavItem, ElNavHeading, ElNavLeadingSlot, ElBadge, ElIcon, ElAvatar],
  template: `
    <div class="landing-demo-nav-head">
      <el-avatar initials="NW" size="sm" alt="Northwind" />
      <div class="landing-demo-nav-head__copy">
        <span class="landing-demo-nav-head__name">Northwind</span>
        <span class="landing-demo-nav-head__meta">Workspace</span>
      </div>
    </div>
    <el-nav
      appearance="soft"
      size="sm"
      [value]="active()"
      (valueChange)="active.set($event)"
      ariaLabel="Workspace navigation"
      class="landing-demo-nav"
    >
      <el-nav-heading>Menu</el-nav-heading>
      <el-nav-item value="inbox" label="Inbox">
        <el-icon elNavLeading name="inbox" />
        <el-badge elNavBadge [count]="3" size="sm" color="error" />
      </el-nav-item>
      <el-nav-item value="projects" label="Projects">
        <el-icon elNavLeading name="folder" />
      </el-nav-item>
      <el-nav-item value="calendar" label="Calendar">
        <el-icon elNavLeading name="calendar" />
      </el-nav-item>
      <el-nav-item value="agents" label="Agents">
        <el-icon elNavLeading name="robot" />
        <el-badge elNavBadge content="New" size="sm" color="info" />
      </el-nav-item>
      <el-nav-item value="settings" label="Settings">
        <el-icon elNavLeading name="gear" />
      </el-nav-item>
    </el-nav>
  `,
  styles: `
    :host {
      display: flex;
      flex-direction: column;
      height: 100%;
    }

    .landing-demo-nav {
      width: 100%;
    }

    .landing-demo-nav-head {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      margin-bottom: 1rem;
      min-width: 0;
    }

    .landing-demo-nav-head__copy {
      display: flex;
      flex-direction: column;
      gap: 0.125rem;
      min-width: 0;
    }

    .landing-demo-nav-head__name {
      color: var(--docs-fg);
      font-size: 0.875rem;
      font-weight: 600;
      letter-spacing: -0.01em;
      line-height: 1.3;
    }

    .landing-demo-nav-head__meta {
      color: var(--docs-muted);
      font-size: 0.75rem;
      line-height: 1.3;
    }
  `,
})
export class LandingDemoNavRail {
  protected readonly active = signal('inbox');
}
