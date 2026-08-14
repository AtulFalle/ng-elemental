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
  protected readonly initCode = `npx @ng-elemental/cli init`;

  protected readonly themeAddCode = `npx @ng-elemental/cli add theme`;

  protected readonly addComponentsCode = `npx @ng-elemental/cli add button
npx @ng-elemental/cli add label
npx @ng-elemental/cli add segmented-button`;

  protected readonly configCode = `{
  "componentsDir": "src/app/ui"
}`;

  protected readonly fontsCode = `npm install @fontsource-variable/geist @fontsource-variable/geist-mono`;

  protected readonly stylesCode = `@use './app/ui/theme/tokens';

// Optional: override brand colors
:root {
  --el-color-accent: #6366f1;
  --el-color-accent-hover: #4f46e5;
}`;

  protected readonly angularJsonNote = `// In angular.json or project.json "styles" array:
"node_modules/@fontsource-variable/geist/index.css",
"node_modules/@fontsource-variable/geist-mono/index.css",
"src/styles.scss"`;
}
