import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ElButton, ElStack } from '@ng-elemental/ui';
import type { PropDefinition } from '../nav';
import { CodeBlock } from '../ui/code-block';
import { Preview } from '../ui/preview';
import { PropsTable } from '../ui/props-table';

@Component({
  selector: 'app-stack-doc-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, ElButton, ElStack, CodeBlock, Preview, PropsTable],
  templateUrl: './stack-doc.html',
  styleUrl: './page.scss',
})
export class StackDocPage {
  protected readonly columnPanel = signal<'preview' | 'code' | 'standards'>('preview');
  protected readonly rowPanel = signal<'preview' | 'code' | 'standards'>('preview');

  protected readonly addCode = `npx @ng-elemental/cli add theme
npx @ng-elemental/cli add stack`;

  protected readonly importCode = `import { ElStack } from './ui/stack/stack';

@Component({
  imports: [ElStack],
  template: \`
    <el-stack gap="4">
      <div>One</div>
      <div>Two</div>
    </el-stack>
  \`,
})
export class MyComponent {}`;

  protected readonly columnCode = `<el-stack gap="3" style="width: 16rem">
  <div>One</div>
  <div>Two</div>
  <div>Three</div>
</el-stack>`;

  protected readonly rowCode = `<el-stack direction="row" gap="3" align="center">
  <div>One</div>
  <div>Two</div>
</el-stack>`;

  protected readonly scopedTokensCode = `.checkout-panel {
  --el-space-4: 1.25rem;
}`;

  protected readonly props: PropDefinition[] = [
    {
      name: 'direction',
      type: "'row' | 'column'",
      default: "'column'",
      description: 'Flex direction.',
    },
    {
      name: 'gap',
      type: "'1' | '2' | '3' | '4' | '5' | '6' | '8'",
      default: "'4'",
      description: 'Maps to --el-space-* density tokens.',
    },
    {
      name: 'align',
      type: "'start' | 'center' | 'end' | 'stretch'",
      default: "'stretch'",
      description: 'align-items.',
    },
    {
      name: 'justify',
      type: "'start' | 'center' | 'end' | 'between'",
      default: "'start'",
      description: 'justify-content.',
    },
    {
      name: 'wrap',
      type: 'boolean',
      default: 'false',
      description: 'Allow flex wrap.',
    },
  ];
}
