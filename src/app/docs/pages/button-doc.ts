import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ElButton } from '@ng-elemental/ui';
import { BUTTON_TOKENS } from '../theme-tokens';
import type { PropDefinition } from '../nav';
import { CodeBlock } from '../ui/code-block';
import { Preview } from '../ui/preview';
import { PropsTable } from '../ui/props-table';
import { TokensTable } from '../ui/tokens-table';

@Component({
  selector: 'app-button-doc-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, ElButton, CodeBlock, Preview, PropsTable, TokensTable],
  templateUrl: './button-doc.html',
  styleUrl: './page.scss',
})
export class ButtonDocPage {
  protected readonly buttonTokens = BUTTON_TOKENS;

  protected readonly addCode = `npx @ng-elemental/cli add button`;

  protected readonly importCode = `import { ElButton } from './ui/button/button';

@Component({
  imports: [ElButton],
  template: \`<el-button variant="primary">Save</el-button>\`,
})
export class MyComponent {}`;

  protected readonly usageCode = `<el-button variant="primary">Save</el-button>
<el-button variant="secondary" size="sm">Cancel</el-button>
<el-button variant="ghost" disabled>Disabled</el-button>`;

  protected readonly globalTokensCode = `:root {
  --el-button-primary-bg: #6366f1;
  --el-button-primary-bg-hover: #4f46e5;
  --el-button-primary-fg: #fff;
}`;

  protected readonly scopedTokensCode = `.danger-zone {
  --el-button-primary-bg: #dc2626;
  --el-button-primary-bg-hover: #b91c1c;
}

// Template:
// <div class="danger-zone">
//   <el-button variant="primary">Delete</el-button>
// </div>`;

  protected readonly props: PropDefinition[] = [
    {
      name: 'variant',
      type: "'primary' | 'secondary' | 'ghost'",
      default: "'primary'",
      description: 'Visual style of the button.',
    },
    {
      name: 'size',
      type: "'sm' | 'md' | 'lg'",
      default: "'md'",
      description: 'Button size.',
    },
    {
      name: 'disabled',
      type: 'boolean',
      default: 'false',
      description: 'Disables the button.',
    },
    {
      name: 'type',
      type: "'button' | 'submit' | 'reset'",
      default: "'button'",
      description: 'Native button type attribute.',
    },
  ];
}
