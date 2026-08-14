import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CodeBlock } from '../ui/code-block';

@Component({
  selector: 'app-installation-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CodeBlock],
  templateUrl: './installation.html',
  styleUrl: './page.scss',
})
export class InstallationPage {
  protected readonly initCode = `npx @ng-elemental/cli init
npx @ng-elemental/cli add button
npx @ng-elemental/cli add label`;

  protected readonly configCode = `{
  "componentsDir": "src/app/ui"
}`;

  protected readonly fontsCode = `npm install @fontsource-variable/geist @fontsource-variable/geist-mono`;

  protected readonly stylesCode = `:root {
  --el-font-sans: 'Geist Variable', Geist, ui-sans-serif, system-ui, sans-serif;
  --el-font-mono: 'Geist Mono Variable', 'Geist Mono', ui-monospace, monospace;
}`;

  protected readonly angularJsonNote = `// In angular.json or project.json "styles" array:
"node_modules/@fontsource-variable/geist/index.css",
"node_modules/@fontsource-variable/geist-mono/index.css"`;
}
