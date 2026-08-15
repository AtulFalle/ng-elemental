import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ElDatePicker } from '@ng-elemental/ui';
import type { PropDefinition } from '../nav';
import { CodeBlock } from '../ui/code-block';
import { Preview } from '../ui/preview';
import { PropsTable } from '../ui/props-table';

@Component({
  selector: 'app-datepicker-doc-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    RouterLink,
    ElDatePicker,
    CodeBlock,
    Preview,
    PropsTable,
  ],
  templateUrl: './datepicker-doc.html',
  styleUrl: './page.scss',
})
export class DatepickerDocPage {
  protected readonly dateValue = signal<Date | null>(new Date(2026, 7, 14));
  protected readonly timeValue = signal<Date | null>(
    new Date(2026, 7, 14, 14, 30),
  );
  protected readonly dateTimeValue = signal<Date | null>(
    new Date(2026, 7, 14, 9, 15),
  );
  protected readonly hour24Value = signal<Date | null>(
    new Date(2026, 7, 14, 18, 45),
  );
  protected readonly smValue = signal<Date | null>(new Date(2026, 7, 14));
  protected readonly mdValue = signal<Date | null>(new Date(2026, 7, 15));
  protected readonly lgValue = signal<Date | null>(new Date(2026, 7, 16));

  protected readonly addCode = `npx @ng-elemental/cli add theme
npx @ng-elemental/cli add icon
npx @ng-elemental/cli add input
npx @ng-elemental/cli add segmented-button
npx @ng-elemental/cli add datepicker`;

  protected readonly importCode = `import { ElDatePicker } from './ui/datepicker/date-picker';

@Component({
  imports: [ElDatePicker],
  template: \`
    <el-date-picker [(value)]="when" mode="date" ariaLabel="Date" />
  \`,
})
export class MyComponent {
  when: Date | null = null;
}`;

  protected readonly usageCode = `<el-date-picker [(value)]="when" mode="date" placeholder="Select date" />
<el-date-picker [(value)]="when" mode="time" hourCycle="h12" />
<el-date-picker [(value)]="when" mode="datetime" hourCycle="h23" />`;

  protected readonly scopedTokensCode = `.checkout-panel {
  --el-color-primary: #059669;
  --el-color-on-primary: #ffffff;
}`;

  protected readonly pickerProps: PropDefinition[] = [
    {
      name: 'value',
      type: 'Date | null',
      default: 'null',
      description:
        'Selected local date/time (two-way). Date-only values use local midnight.',
    },
    {
      name: 'mode',
      type: "'date' | 'time' | 'datetime'",
      default: "'date'",
      description: 'Shows the calendar, analog clock, or both.',
    },
    {
      name: 'hourCycle',
      type: "'h12' | 'h23'",
      default: "'h12'",
      description: '12-hour clock with AM/PM, or 24-hour inner/outer rings.',
    },
    {
      name: 'minuteStep',
      type: 'number',
      default: '5',
      description: 'Minute ticks on the analog dial. Typed minutes stay 0–59.',
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
      description: 'Weekday names and month title. Date fields stay DD-MM-YYYY.',
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
      default: "'Select date'",
      description: 'Trigger text when value is null.',
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
