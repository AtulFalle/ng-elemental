import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ElButton, ElThemeService } from '@ng-elemental/ui';
import { COLOR_TOKENS, DENSITY_TOKENS } from '../theme-tokens';
import { CodeBlock } from '../ui/code-block';
import { Preview } from '../ui/preview';
import { TokensTable } from '../ui/tokens-table';

@Component({
  selector: 'app-theme-doc-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ElButton, CodeBlock, Preview, TokensTable],
  templateUrl: './theme-doc.html',
  styleUrl: './page.scss',
})
export class ThemeDocPage {
  private readonly theme = inject(ElThemeService);

  protected readonly colorTokens = COLOR_TOKENS;
  protected readonly densityTokens = DENSITY_TOKENS;

  protected readonly addCode = `npx @ng-elemental/cli init
# or later: npx @ng-elemental/cli add theme`;

  protected readonly importTokensCode = `// src/styles.scss
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');

@use './app/ui/theme/tokens';
@use './app/ui/theme/typography';

// Utilities: .el-text-h1 … .el-text-muted, .el-text-blockquote, .el-text-inline-code`;

  protected readonly brandCode = `:root {
  --el-color-primary: light-dark(#0f172a, #f8fafc);
  --el-color-on-primary: light-dark(#f8fafc, #0f172a);
  --el-color-error: light-dark(#ef4444, #7f1d1d);
  --el-color-surface: light-dark(#ffffff, #000000);
  --el-color-on-surface: light-dark(#000000, #ffffff);
  --el-color-outline: light-dark(#94a3b8, #64748b);
}`;

  protected readonly scopedOverrideCode = `.checkout-panel {
  --el-color-primary: #059669;
  --el-color-on-primary: #ffffff;
}

// Buttons, chips, checkboxes, and sliders inside .checkout-panel follow.`;

  protected readonly provideThemeCode = `import { provideElTheme } from './app/ui/theme/theme';

export const appConfig = {
  providers: [
    provideElTheme({ mode: 'light' }),
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
