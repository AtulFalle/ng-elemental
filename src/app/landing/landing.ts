import {
  ChangeDetectionStrategy,
  Component,
  computed,
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
  ElThemeService,
} from '@ng-elemental/ui';
import { DOCS_VERSION } from '../docs/nav';
import { CodeBlock } from '../docs/ui/code-block';
import { DocsSearch } from '../docs/ui/docs-search';
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
    LandingShowcase,
  ],
  templateUrl: './landing.html',
  styleUrl: './landing.scss',
})
export class LandingPage {
  private readonly theme = inject(ElThemeService);
  private readonly router = inject(Router);

  protected readonly version = DOCS_VERSION;
  protected readonly installTab = signal('cli');

  protected readonly isDark = computed(() => this.theme.mode() === 'dark');

  protected readonly themeToggleLabel = computed(() =>
    this.isDark() ? 'Switch to light theme' : 'Switch to dark theme',
  );

  protected readonly themeToggleIcon = computed(() =>
    this.isDark() ? 'sun' : 'moon',
  );

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

  protected toggleTheme(): void {
    this.theme.setMode(this.isDark() ? 'light' : 'dark');
  }

  protected go(path: string): void {
    void this.router.navigateByUrl(path);
  }
}
