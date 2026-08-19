import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ElButton, ElCheckbox } from '@ng-elemental/ui';
import type { PropDefinition } from '../nav';
import { CodeBlock } from '../ui/code-block';
import { Preview } from '../ui/preview';
import { PropsTable } from '../ui/props-table';

@Component({
  selector: 'app-checkbox-doc-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, ElButton, ElCheckbox, CodeBlock, Preview, PropsTable],
  templateUrl: './checkbox-doc.html',
  styleUrl: './page.scss',
})
export class CheckboxDocPage {
  protected readonly heroPanel = signal<'preview' | 'code' | 'standards'>('preview');
  protected readonly listPanel = signal<'preview' | 'code' | 'standards'>('preview');
  protected readonly statesPanel = signal<'preview' | 'code' | 'standards'>('preview');

  protected readonly accepted = signal(false);
  protected readonly notifications = signal(true);
  protected readonly marketing = signal(false);

  protected readonly addCode = `npx @ng-elemental/cli add theme
npx @ng-elemental/cli add icon
npx @ng-elemental/cli add checkbox`;

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

  protected readonly heroCode = `<el-checkbox [(checked)]="accepted" inputId="terms">
  Accept terms and conditions
</el-checkbox>`;

  protected readonly listCode = `<el-checkbox [(checked)]="notifications" inputId="cb-notifications">Notifications</el-checkbox>
<el-checkbox [indeterminate]="true" inputId="cb-select-all">Select all</el-checkbox>`;

  protected readonly statesCode = `<el-checkbox [checked]="true" inputId="cb-checked">Checked</el-checkbox>
<el-checkbox [disabled]="true" inputId="cb-disabled">Disabled</el-checkbox>
<el-checkbox [error]="true" inputId="cb-error">Error</el-checkbox>`;

  protected readonly scopedTokensCode = `.checkout-panel {
  --el-color-primary: #059669;
  --el-color-on-primary: #ffffff;
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
