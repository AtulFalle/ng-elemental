import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ElDateRangePicker, type ElDateRange } from '@ng-elemental/ui';
import type { PropDefinition } from '../nav';
import { CodeBlock } from '../ui/code-block';
import { Preview } from '../ui/preview';
import { PropsTable } from '../ui/props-table';

@Component({
  selector: 'app-date-range-picker-doc-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    RouterLink,
    ElDateRangePicker,
    CodeBlock,
    Preview,
    PropsTable,
  ],
  templateUrl: './date-range-picker-doc.html',
  styleUrl: './page.scss',
})
export class DateRangePickerDocPage {
  protected readonly range = signal<ElDateRange>({
    start: new Date(2026, 7, 14),
    end: new Date(2026, 7, 20),
  });
  protected readonly emptyRange = signal<ElDateRange>({
    start: null,
    end: null,
  });

  protected readonly addCode = `npx @ng-elemental/cli add theme
npx @ng-elemental/cli add icon
npx @ng-elemental/cli add input
npx @ng-elemental/cli add segmented-button
npx @ng-elemental/cli add datepicker`;

  protected readonly importCode = `import { ElDateRangePicker } from './ui/datepicker/date-range-picker';

@Component({
  imports: [ElDateRangePicker],
  template: \`
    <el-date-range-picker [(value)]="range" ariaLabel="Stay dates" />
  \`,
})
export class MyComponent {
  range = { start: null, end: null };
}`;

  protected readonly usageCode = `<el-date-range-picker
  [(value)]="range"
  placeholder="Select date range"
  ariaLabel="Date range"
/>`;

  protected readonly scopedTokensCode = `.checkout-panel {
  --el-color-primary: #059669;
  --el-color-on-primary: #ffffff;
}`;

  protected readonly rangeProps: PropDefinition[] = [
    {
      name: 'value',
      type: '{ start: Date | null; end: Date | null }',
      default: '{ start: null, end: null }',
      description:
        'Selected range (two-way). The panel closes when both ends are set.',
    },
    {
      name: 'min',
      type: 'Date | null',
      default: 'null',
      description: 'Earliest selectable day.',
    },
    {
      name: 'max',
      type: 'Date | null',
      default: 'null',
      description: 'Latest selectable day.',
    },
    {
      name: 'locale',
      type: 'string',
      default: 'undefined',
      description: 'Weekday names and month title. Fields stay DD-MM-YYYY.',
    },
    {
      name: 'size',
      type: "'sm' | 'md' | 'lg'",
      default: "'md'",
      description: 'Trigger size.',
    },
    {
      name: 'placeholder',
      type: 'string',
      default: "'Select date range'",
      description: 'Trigger text when both ends are empty.',
    },
    {
      name: 'disabled',
      type: 'boolean',
      default: 'false',
      description: 'Disables the trigger and panel.',
    },
    {
      name: 'error',
      type: 'boolean',
      default: 'false',
      description:
        'Error border on the trigger and aria-invalid. Pair with el-form-error for message text.',
    },
    {
      name: 'ariaLabel',
      type: 'string',
      default: 'undefined',
      description: 'Accessible name for the trigger.',
    },
  ];
}
