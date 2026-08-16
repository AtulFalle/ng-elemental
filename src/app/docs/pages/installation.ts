import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CodeBlock } from '../ui/code-block';

@Component({
  selector: 'app-installation-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, CodeBlock],
  templateUrl: './installation.html',
  styleUrl: './page.scss',
})
export class InstallationPage {
  protected readonly initCode = `npx @ng-elemental/cli init
npx @ng-elemental/cli init --yes
npx @ng-elemental/cli init --path libs/ui --yes
npx @ng-elemental/cli init --skip-theme`;

  protected readonly themeAddCode = `npx @ng-elemental/cli add theme`;

  protected readonly addComponentsCode = `npx @ng-elemental/cli add button
npx @ng-elemental/cli add <component>`;

  protected readonly mcpInitCode = `npx @ng-elemental/mcp init --client cursor`;

  protected readonly fontAwesomeCode = `npm install @fortawesome/fontawesome-free`;

  protected readonly fontAwesomeStylesCode = `@use './app/ui/icon/fontawesome';`;

  protected readonly configCode = `{
  "componentsDir": "src/app/ui"
}`;

  protected readonly stylesCode = `@use './app/ui/theme/tokens';

// Typography: widgets use inherit / system fonts.
// Load your brand typeface (Google Fonts, @fontsource, self-hosted), then:
:root {
  --el-font-sans: 'Inter', system-ui, sans-serif;
  --el-font-mono: 'JetBrains Mono', ui-monospace, monospace;
}

// Optional: override brand colors (or edit the BRAND block in tokens.scss)
:root {
  --el-color-primary: light-dark(#6750a4, #d0bcff);
  --el-color-on-primary: light-dark(#ffffff, #381e72);
}

// When using icons, also load Font Awesome once:
// @use './app/ui/icon/fontawesome';`;

  protected readonly angularJsonNote = `// In angular.json or project.json "styles" array:
"src/styles.scss"`;
}
