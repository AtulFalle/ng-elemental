import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ElAspectRatio, ElButton } from '@ng-elemental/ui';
import type { PropDefinition } from '../nav';
import { CodeBlock } from '../ui/code-block';
import { Preview } from '../ui/preview';
import { PropsTable } from '../ui/props-table';

@Component({
  selector: 'app-aspect-ratio-doc-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, ElButton, ElAspectRatio, CodeBlock, Preview, PropsTable],
  templateUrl: './aspect-ratio-doc.html',
  styleUrl: './page.scss',
})
export class AspectRatioDocPage {
  protected readonly widePanel = signal<'preview' | 'code' | 'standards'>('preview');
  protected readonly squarePanel = signal<'preview' | 'code' | 'standards'>('preview');

  protected readonly addCode = `npx @ng-elemental/cli add theme
npx @ng-elemental/cli add aspect-ratio`;

  protected readonly importCode = `import { ElAspectRatio } from './ui/aspect-ratio/aspect-ratio';

@Component({
  imports: [ElAspectRatio],
  template: \`
    <el-aspect-ratio ratio="16/9">
      <img src="/cover.jpg" alt="" style="width: 100%; height: 100%; object-fit: cover" />
    </el-aspect-ratio>
  \`,
})
export class MyComponent {}`;

  protected readonly wideCode = `<el-aspect-ratio ratio="16/9" style="max-width: 22rem">
  <img src="/cover.jpg" alt="Trail overlook" style="width: 100%; height: 100%; object-fit: cover" />
</el-aspect-ratio>`;

  protected readonly squareCode = `<el-aspect-ratio ratio="1/1" style="max-width: 10rem">
  <div style="height: 100%; display: flex; align-items: center; justify-content: center">
    1 / 1
  </div>
</el-aspect-ratio>`;

  protected readonly scopedTokensCode = `.checkout-panel {
  --el-radius-sm: 0.25rem;
}`;

  protected readonly props: PropDefinition[] = [
    {
      name: 'ratio',
      type: 'string',
      default: "'16/9'",
      description: 'CSS aspect-ratio value.',
    },
  ];
}
