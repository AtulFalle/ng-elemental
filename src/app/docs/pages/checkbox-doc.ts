import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ElCheckbox, ElTab, ElTabContent, ElTabs } from '@ng-elemental/ui';
import type { PropDefinition } from '../nav';
import { CodeBlock } from '../ui/code-block';
import { DocsExample } from '../ui/docs-example';
import { DocsPager } from '../ui/docs-pager';
import { DocsSnippet } from '../ui/docs-snippet';
import { PropsTable } from '../ui/props-table';

@Component({
  selector: 'app-checkbox-doc-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    RouterLink,
    ElCheckbox,
    ElTabs,
    ElTab,
    ElTabContent,
    CodeBlock,
    DocsExample,
    DocsPager,
    DocsSnippet,
    PropsTable,
  ],
  templateUrl: './checkbox-doc.html',
  styleUrl: './page.scss',
})
export class CheckboxDocPage {
  protected readonly installTab = signal('cli');

  protected readonly accepted = signal(false);
  protected readonly notifications = signal(true);
  protected readonly marketing = signal(false);

  protected readonly addCode = `npx @ng-elemental/cli add theme
npx @ng-elemental/cli add icon
npx @ng-elemental/cli add checkbox`;

  protected readonly manualIconCode = `npx @ng-elemental/cli add icon`;

  protected readonly manualFilesCode = `ui/checkbox/checkbox.ts
ui/checkbox/checkbox.html
ui/checkbox/checkbox.scss`;

  protected readonly importSnippet = `import { ElCheckbox } from './ui/checkbox/checkbox';`;

  protected readonly usageSnippet = `<el-checkbox [(checked)]="accepted" inputId="terms">
  Accept terms and conditions
</el-checkbox>`;

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
