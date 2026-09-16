import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import {
  ElButton,
  ElSeparator,
  ElTab,
  ElTabContent,
  ElTabs,
} from '@ng-elemental/ui';
import { DOCS_VERSION } from '../docs/nav';
import { CodeBlock } from '../docs/ui/code-block';
import { DocsSearch } from '../docs/ui/docs-search';
import { DocsThemeToggle } from '../docs/ui/docs-theme-toggle';
import { LandingShowcase } from './landing-showcase';

@Component({
  selector: 'app-landing',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    RouterLink,
    ElButton,
    ElSeparator,
    ElTabs,
    ElTab,
    ElTabContent,
    CodeBlock,
    DocsSearch,
    DocsThemeToggle,
    LandingShowcase,
  ],
  templateUrl: './landing.html',
  styleUrl: './landing.scss',
})
export class LandingPage {
  private readonly router = inject(Router);

  protected readonly version = DOCS_VERSION;
  protected readonly installTab = signal('cli');

  protected readonly initCode = `npx @ng-elemental/cli init
npx @ng-elemental/cli add button
npx @ng-elemental/cli add dialog toast table`;

  protected readonly mcpCode = `{
  "mcpServers": {
    "ng-elemental": {
      "url": "https://ng-elemental.vercel.app/mcp"
    }
  }
}`;

  protected go(path: string): void {
    void this.router.navigateByUrl(path);
  }
}
