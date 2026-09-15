import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  ElDatePicker,
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
  selector: 'app-datepicker-doc-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    RouterLink,
    ElDatePicker,
    ElTabs,
    ElTab,
    ElTabContent,
    CodeBlock,
    DocsExample,
    DocsPager,
    DocsSnippet,
    PropsTable,
  ],
  templateUrl: './datepicker-doc.html',
  styleUrl: './page.scss',
})
export class DatepickerDocPage {
  protected readonly installTab = signal('cli');

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

  protected readonly manualFilesCode = `ui/datepicker/date.ts
ui/datepicker/calendar.ts
ui/datepicker/calendar.html
ui/datepicker/calendar.scss
ui/datepicker/clock.ts
ui/datepicker/clock.html
ui/datepicker/clock.scss
ui/datepicker/date-fields.ts
ui/datepicker/date-fields.html
ui/datepicker/date-fields.scss
ui/datepicker/date-picker.ts
ui/datepicker/date-picker.html
ui/datepicker/date-picker.scss
ui/datepicker/date-range-picker.ts
ui/datepicker/date-range-picker.html
ui/datepicker/date-range-picker.scss`;

  protected readonly importSnippet = `import { ElDatePicker } from './ui/datepicker/date-picker';`;

  protected readonly usageSnippet = `<el-date-picker [(value)]="when" mode="date" placeholder="Select date" />
<el-date-picker [(value)]="when" mode="time" hourCycle="h12" />
<el-date-picker [(value)]="when" mode="datetime" hourCycle="h23" />`;

  protected readonly heroCode = `<div class="docs-datepicker-demo">
  <el-date-picker
    [(value)]="dateValue"
    mode="date"
    placeholder="Select date"
    ariaLabel="Date"
  />
</div>`;

  protected readonly timeCode = `<div class="docs-datepicker-demo">
  <el-date-picker
    [(value)]="timeValue"
    mode="time"
    placeholder="Select time"
    ariaLabel="Time"
  />
</div>`;

  protected readonly dateTimeCode = `<div class="docs-datepicker-demo">
  <el-date-picker
    [(value)]="dateTimeValue"
    mode="datetime"
    placeholder="Select date and time"
    ariaLabel="Date and time"
  />
</div>`;

  protected readonly hour24Code = `<div class="docs-datepicker-demo">
  <el-date-picker
    [(value)]="hour24Value"
    mode="time"
    hourCycle="h23"
    placeholder="Select time"
    ariaLabel="Time 24-hour"
  />
</div>`;

  protected readonly sizesCode = `<div class="docs-stack docs-datepicker-demo">
  <el-date-picker
    [(value)]="smValue"
    size="sm"
    placeholder="Small"
    ariaLabel="Small"
  />
  <el-date-picker
    [(value)]="mdValue"
    size="md"
    placeholder="Medium"
    ariaLabel="Medium"
  />
  <el-date-picker
    [(value)]="lgValue"
    size="lg"
    placeholder="Large"
    ariaLabel="Large"
  />
</div>`;

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
