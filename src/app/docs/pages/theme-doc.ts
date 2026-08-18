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
@use './app/ui/theme/tokens';

:root {
  --el-font-sans: 'Inter', system-ui, sans-serif;
  --el-font-mono: 'JetBrains Mono', ui-monospace, monospace;
}`;

  protected readonly brandCode = `:root {
  --el-color-primary: light-dark(#5f479b, #d0bcff);
  --el-color-on-primary: light-dark(#fff, #381e72);
  --el-color-error: light-dark(#b3261e, #f2b8b5);
  --el-color-surface: light-dark(#fffbfe, #1c1b1f);
  --el-color-on-surface: light-dark(#1c1b1f, #e6e1e5);
  --el-color-outline: light-dark(#79747e, #938f99);
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
