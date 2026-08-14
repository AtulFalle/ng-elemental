import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  ElIcon,
  ElInput,
  ElInputPrefix,
  ElInputSuffix,
  ElLabel,
} from '@ng-elemental/ui';
import { INPUT_TOKENS } from '../theme-tokens';
import type { PropDefinition } from '../nav';
import { CodeBlock } from '../ui/code-block';
import { Preview } from '../ui/preview';
import { PropsTable } from '../ui/props-table';
import { TokensTable } from '../ui/tokens-table';

@Component({
  selector: 'app-input-doc-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    RouterLink,
    ElIcon,
    ElInput,
    ElInputPrefix,
    ElInputSuffix,
    ElLabel,
    CodeBlock,
    Preview,
    PropsTable,
    TokensTable,
  ],
  templateUrl: './input-doc.html',
  styleUrl: './page.scss',
})
export class InputDocPage {
  protected readonly inputTokens = INPUT_TOKENS;
  protected readonly email = signal('');
  protected readonly search = signal('');
  protected readonly amount = signal('');
  protected readonly phone = signal('');
  protected readonly password = signal('');
  protected readonly quantity = signal('');
  protected readonly sm = signal('');
  protected readonly md = signal('');
  protected readonly lg = signal('');

  protected readonly addCode = `npx @ng-elemental/cli add theme
npx @ng-elemental/cli add input`;

  protected readonly importCode = `import { ElInput } from './ui/input/input';

@Component({
  imports: [ElInput],
  template: \`
    <el-input [(value)]="email" type="email" placeholder="you@example.com" inputId="email" />
  \`,
})
export class MyComponent {}`;

  protected readonly usageCode = `<el-input [(value)]="email" type="email" placeholder="you@example.com" inputId="email" />

<el-input [(value)]="search" type="search" placeholder="Search" inputId="search">
  <el-icon elInputPrefix name="magnifying-glass" size="sm" />
</el-input>

<el-input [(value)]="phone" type="tel" mask="(000) 000-0000" placeholder="Phone" inputId="phone" />`;

  protected readonly globalTokensCode = `:root {
  --el-input-border: #e5e7eb;
  --el-input-focus-ring: #6750a4;
  --el-input-border-error: #dc2626;
}`;

  protected readonly props: PropDefinition[] = [
    {
      name: 'value',
      type: 'string',
      default: "''",
      description: 'Display value via [(value)], including mask literals when a mask is set.',
    },
    {
      name: 'type',
      type: "'text' | 'email' | 'password' | 'tel' | 'url' | 'search' | 'number'",
      default: "'text'",
      description: 'Native input type.',
    },
    {
      name: 'mask',
      type: 'string',
      default: "''",
      description:
        'Optional pattern mask. 0 = digit, A = letter, * = alphanumeric. Other characters are literals. Ignored when type is number.',
    },
    {
      name: 'size',
      type: "'sm' | 'md' | 'lg'",
      default: "'md'",
      description: 'Field size.',
    },
    {
      name: 'placeholder',
      type: 'string',
      default: "''",
      description: 'Native placeholder text.',
    },
    {
      name: 'disabled',
      type: 'boolean',
      default: 'false',
      description: 'Non-interactive field state.',
    },
    {
      name: 'readOnly',
      type: 'boolean',
      default: 'false',
      description: 'Native read-only state.',
    },
    {
      name: 'error',
      type: 'boolean',
      default: 'false',
      description: 'Error border and aria-invalid. Pair with el-form-error for message text.',
    },
    {
      name: 'inputId',
      type: 'string',
      default: "''",
      description: 'Id applied to the native input.',
    },
    {
      name: 'name',
      type: 'string',
      default: "''",
      description: 'Name attribute for form submission.',
    },
    {
      name: 'autocomplete',
      type: 'string',
      default: "''",
      description: 'Native autocomplete hint.',
    },
    {
      name: 'ariaLabel',
      type: 'string',
      default: '—',
      description: 'Accessible name when no visible label is present.',
    },
  ];
}
