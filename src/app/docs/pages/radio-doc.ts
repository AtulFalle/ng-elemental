import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  ElRadio,
  ElRadioGroup,
  ElTab,
  ElTabContent,
  ElTabs,
} from '@ng-elemental/ui';
import type { PropDefinition } from '../nav';
import { CodeBlock } from '../ui/code-block';
import { DocsExample } from '../ui/docs-example';
import { DocsPager } from '../ui/docs-pager';
import { DocsSnippet } from '../ui/docs-snippet';
import { PropsTable } from '../ui/props-table';

@Component({
  selector: 'app-radio-doc-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    RouterLink,
    ElRadio,
    ElRadioGroup,
    ElTabs,
    ElTab,
    ElTabContent,
    CodeBlock,
    DocsExample,
    DocsPager,
    DocsSnippet,
    PropsTable,
  ],
  templateUrl: './radio-doc.html',
  styleUrl: './page.scss',
})
export class RadioDocPage {
  protected readonly installTab = signal('cli');

  protected readonly contact = signal('email');
  protected readonly size = signal('medium');

  protected readonly addCode = `npx @ng-elemental/cli add radio`;

  protected readonly manualFilesCode = `ui/radio/radio.ts
ui/radio/radio.html
ui/radio/radio.scss
ui/radio/radio-group.ts
ui/radio/radio-group.html
ui/radio/radio-group.scss
ui/radio/radio.token.ts`;

  protected readonly importSnippet = `import { ElRadio, ElRadioGroup } from './ui/radio/radio-group';`;

  protected readonly usageSnippet = `<el-radio-group [(value)]="contact" ariaLabel="Contact method">
  <el-radio value="email" inputId="contact-email">Email</el-radio>
  <el-radio value="phone" inputId="contact-phone">Phone</el-radio>
</el-radio-group>`;

  protected readonly heroCode = `<el-radio-group [(value)]="contact" ariaLabel="Contact method">
  <el-radio value="email" inputId="contact-email">Email</el-radio>
  <el-radio value="phone" inputId="contact-phone">Phone</el-radio>
</el-radio-group>`;

  protected readonly layoutCode = `<el-radio-group direction="horizontal" ariaLabel="Size">
  <el-radio value="small" inputId="size-small">Small</el-radio>
  <el-radio value="medium" inputId="size-medium">Medium</el-radio>
</el-radio-group>`;

  protected readonly statesCode = `<el-radio-group [disabled]="true" ariaLabel="Disabled group">
  <el-radio value="option-1" inputId="disabled-1">Disabled</el-radio>
</el-radio-group>`;

  protected readonly scopedTokensCode = `.checkout-panel {
  --el-color-primary: #059669;
  --el-color-on-primary: #ffffff;
}`;

  protected readonly groupProps: PropDefinition[] = [
    {
      name: 'value',
      type: 'string',
      default: "''",
      description: 'Two-way bindable selected value via [(value)].',
    },
    {
      name: 'direction',
      type: "'vertical' | 'horizontal'",
      default: "'vertical'",
      description: 'Layout direction for the radio group.',
    },
    {
      name: 'disabled',
      type: 'boolean',
      default: 'false',
      description: 'Disables all radios in the group.',
    },
    {
      name: 'error',
      type: 'boolean',
      default: 'false',
      description:
        'Invalid outline on the group and aria-invalid. Pair with el-form-error for message text.',
    },
    {
      name: 'name',
      type: 'string',
      default: "''",
      description: 'Shared name attribute for native form submission. Auto-generated when omitted.',
    },
    {
      name: 'ariaLabel',
      type: 'string',
      default: 'undefined',
      description: 'Accessible label for the radiogroup.',
    },
  ];

  protected readonly radioProps: PropDefinition[] = [
    {
      name: 'value',
      type: 'string',
      default: 'required',
      description: 'Value emitted when this radio is selected.',
    },
    {
      name: 'labelPosition',
      type: "'left' | 'right'",
      default: "'right'",
      description: 'Label text placement relative to the radio control.',
    },
    {
      name: 'disabled',
      type: 'boolean',
      default: 'false',
      description: 'Non-interactive radio state.',
    },
    {
      name: 'inputId',
      type: 'string',
      default: "''",
      description: 'Id applied to the native radio input.',
    },
  ];
}
