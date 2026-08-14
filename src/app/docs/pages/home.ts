import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CodeBlock } from '../ui/code-block';

@Component({
  selector: 'app-home-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CodeBlock, RouterLink],
  templateUrl: './home.html',
  styleUrl: './page.scss',
})
export class HomePage {
  protected readonly quickStartCode = `npx @ng-elemental/cli init
npx @ng-elemental/cli add button
npx @ng-elemental/cli add label
npx @ng-elemental/cli add checkbox
npx @ng-elemental/cli add segmented-button`;

  protected readonly usageCode = `import { Component } from '@angular/core';
import { ElButton } from './ui/button/button';

@Component({
  selector: 'app-root',
  imports: [ElButton],
  template: \`<el-button variant="primary">Save</el-button>\`,
})
export class App {}`;
}
