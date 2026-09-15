import { ChangeDetectionStrategy, Component } from '@angular/core';
import { LandingDemoAgentThread } from './demo/agent-thread';
import { LandingDemoAlerts } from './demo/alerts';
import { LandingDemoCoverage } from './demo/coverage';
import { LandingDemoDensity } from './demo/density';
import { LandingDemoEmptyAlert } from './demo/empty-alert';
import { LandingDemoKit } from './demo/kit';
import { LandingDemoNavRail } from './demo/nav-rail';
import { LandingDemoRecentAdds } from './demo/recent-adds';
import { LandingDemoThemeForm } from './demo/theme-form';

@Component({
  selector: 'app-landing-showcase',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    LandingDemoNavRail,
    LandingDemoCoverage,
    LandingDemoAgentThread,
    LandingDemoThemeForm,
    LandingDemoDensity,
    LandingDemoAlerts,
    LandingDemoEmptyAlert,
    LandingDemoRecentAdds,
    LandingDemoKit,
  ],
  templateUrl: './landing-showcase.html',
  styleUrl: './landing-showcase.scss',
})
export class LandingShowcase {}
