import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ElCheckbox } from '@ng-elemental/ui';
import { CHECKBOX_TOKENS } from '../theme-tokens';
import type { PropDefinition } from '../nav';
import { CodeBlock } from '../ui/code-block';
import { Preview } from '../ui/preview';
import { PropsTable } from '../ui/props-table';
import { TokensTable } from '../ui/tokens-table';

@Component({
  selector: 'app-checkbox-doc-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, ElCheckbox, CodeBlock, Preview, PropsTable, TokensTable],
  templateUrl: './checkbox-doc.html',
  styleUrl: './page.scss',
})
export class CheckboxDocPage {
  protected readonly checkboxTokens = CHECKBOX_TOKENS;
  protected readonly accepted = signal(false);
  protected readonly selectAll = signal(false);
  protected readonly notifications = signal(true);
  protected readonly marketing = signal(false);

  protected readonly addCode = `npx @ng-elemental/cli add checkbox`;

  protected readonly importCode = `import { ElCheckbox } from './ui/checkbox/checkbox';

@Component({
  imports: [ElCheckbox],
  template: \`
    <el-checkbox [(checked)]="accepted" inputId="terms">
      Accept terms and conditions
    </el-checkbox>
  \`,
})
export class MyComponent {}`;

  protected readonly usageCode = `<el-checkbox [(checked)]="accepted" inputId="terms">
  Accept terms and conditions
</el-checkbox>

<el-checkbox labelPosition="left" [(checked)]="newsletter" inputId="newsletter">
  Send me updates
</el-checkbox>

<el-checkbox [indeterminate]="true" inputId="select-all">Select all</el-checkbox>`;

  protected readonly globalTokensCode = `:root {
  --el-checkbox-selected-bg: #6750a4;
  --el-checkbox-border: #79747e;
  --el-checkbox-label-fg: #1c1b1f;
}`;

  protected readonly props: PropDefinition[] = [
    {
      name: 'checked',
      type: 'boolean',
      default: 'false',
      description: 'Two-way bindable checked state via [(checked)].',
    },
    {
      name: 'indeterminate',
      type: 'boolean',
      default: 'false',
      description: 'Mixed selection state for parent checkboxes.',
    },
    {
      name: 'disabled',
      type: 'boolean',
      default: 'false',
      description: 'Non-interactive checkbox state.',
    },
    {
      name: 'error',
      type: 'boolean',
      default: 'false',
      description: 'Error styling for invalid form state.',
    },
    {
      name: 'labelPosition',
      type: "'left' | 'right'",
      default: "'right'",
      description: 'Label text placement relative to the checkbox control.',
    },
    {
      name: 'inputId',
      type: 'string',
      default: "''",
      description: 'Id applied to the native checkbox input.',
    },
    {
      name: 'name',
      type: 'string',
      default: "''",
      description: 'Name attribute for form submission.',
    },
    {
      name: 'value',
      type: 'string',
      default: "''",
      description: 'Value attribute for form submission.',
    },
  ];
}
