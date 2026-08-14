import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ElButton, ElThemeService } from '@ng-elemental/ui';
import { SEMANTIC_TOKENS } from '../theme-tokens';
import { CodeBlock } from '../ui/code-block';
import { Preview } from '../ui/preview';
import { TokensTable } from '../ui/tokens-table';

@Component({
  selector: 'app-theme-doc-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, ElButton, CodeBlock, Preview, TokensTable],
  templateUrl: './theme-doc.html',
  styleUrl: './page.scss',
})
export class ThemeDocPage {
  private readonly theme = inject(ElThemeService);

  protected readonly semanticTokens = SEMANTIC_TOKENS;

  protected readonly addCode = `npx @ng-elemental/cli add theme`;

  protected readonly importTokensCode = `// src/styles.scss
@use './app/ui/theme/tokens';`;

  protected readonly globalOverrideCode = `:root {
  --el-color-accent: #6366f1;
  --el-color-accent-hover: #4f46e5;
  --el-color-accent-subtle: #eef2ff;
}`;

  protected readonly scopedOverrideCode = `.checkout-panel {
  --el-button-primary-bg: #059669;
  --el-button-primary-bg-hover: #047857;
}

// Only buttons inside .checkout-panel use the green palette.`;

  protected readonly provideThemeCode = `import { provideElTheme } from './app/ui/theme/theme';

export const appConfig = {
  providers: [
    provideElTheme({
      mode: 'light',
      variables: {
        '--el-color-accent': '#6366f1',
        '--el-color-accent-hover': '#4f46e5',
      },
    }),
  ],
};`;

  protected readonly runtimeThemeCode = `import { Component, inject } from '@angular/core';
import { ElThemeService } from './app/ui/theme/theme';

@Component({ /* … */ })
export class SettingsPage {
  private readonly theme = inject(ElThemeService);

  useDark(): void {
    this.theme.setMode('dark');
  }

  useBrand(): void {
    this.theme.updateVariables({
      '--el-color-accent': '#6366f1',
    });
  }
}`;

  protected readonly darkModeCode = `<!-- index.html or app shell -->
<html data-el-theme="dark">`;

  protected isDark(): boolean {
    return this.theme.mode() === 'dark';
  }

  protected toggleMode(): void {
    this.theme.setMode(this.isDark() ? 'light' : 'dark');
  }
}
