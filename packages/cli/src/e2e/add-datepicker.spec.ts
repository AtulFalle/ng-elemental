import { existsSync } from 'node:fs';
import { readFile } from 'node:fs/promises';
import { componentUiPath, withCliConsumer } from './helpers';

describe('add datepicker e2e', () => {
  it('installs @ng-elemental/cli from npm and adds ElDatePicker', async () => {
    await withCliConsumer(async ({ tmp, runCli }) => {
      runCli('add', 'datepicker');

      const datePickerTs = await readFile(
        componentUiPath(tmp, 'datepicker', 'date-picker.ts'),
        'utf8',
      );
      expect(datePickerTs).toContain("selector: 'el-date-picker'");
      expect(datePickerTs).toContain('export class ElDatePicker');
      expect(datePickerTs).toContain('ElCalendar');
      expect(datePickerTs).toContain('ElClock');

      const dateTs = await readFile(
        componentUiPath(tmp, 'datepicker', 'date.ts'),
        'utf8',
      );
      expect(dateTs).toContain("ElDatePickerMode = 'date' | 'time' | 'datetime'");

      const rangeTs = await readFile(
        componentUiPath(tmp, 'datepicker', 'date-range-picker.ts'),
        'utf8',
      );
      expect(rangeTs).toContain("selector: 'el-date-range-picker'");
      expect(rangeTs).toContain('export class ElDateRangePicker');

      const calendarTs = await readFile(
        componentUiPath(tmp, 'datepicker', 'calendar.ts'),
        'utf8',
      );
      expect(calendarTs).toContain("selector: 'el-calendar'");
      expect(calendarTs).toContain('daySelected');

      const fieldsTs = await readFile(
        componentUiPath(tmp, 'datepicker', 'date-fields.ts'),
        'utf8',
      );
      expect(fieldsTs).toContain("selector: 'el-date-fields'");

      const clockTs = await readFile(
        componentUiPath(tmp, 'datepicker', 'clock.ts'),
        'utf8',
      );
      expect(clockTs).toContain("selector: 'el-clock'");
      expect(clockTs).toContain('ElSegmentedButton');

      const datePickerHtml = await readFile(
        componentUiPath(tmp, 'datepicker', 'date-picker.html'),
        'utf8',
      );
      expect(datePickerHtml).toContain('el-date-picker');
      expect(datePickerHtml).toContain('el-calendar');
      expect(datePickerHtml).toContain('el-date-fields');
      expect(datePickerHtml).toContain('el-clock');
      expect(datePickerHtml).toContain('el-icon');
      expect(datePickerHtml).toContain('calendar');

      const rangeHtml = await readFile(
        componentUiPath(tmp, 'datepicker', 'date-range-picker.html'),
        'utf8',
      );
      expect(rangeHtml).toContain('el-date-range-picker');
      expect(rangeHtml).toContain('el-date-range-picker__nav');
      expect(rangeHtml).toContain('el-date-range-picker__months');
      expect(rangeHtml).toContain('el-date-fields');

      const fieldsHtml = await readFile(
        componentUiPath(tmp, 'datepicker', 'date-fields.html'),
        'utf8',
      );
      expect(fieldsHtml).toContain('placeholder="DD"');
      expect(fieldsHtml).toContain('placeholder="YYYY"');

      const calendarHtml = await readFile(
        componentUiPath(tmp, 'datepicker', 'calendar.html'),
        'utf8',
      );
      expect(calendarHtml).toContain('Choose month');
      expect(calendarHtml).toContain('Choose year');

      const datePickerScss = await readFile(
        componentUiPath(tmp, 'datepicker', 'date-picker.scss'),
        'utf8',
      );
      expect(datePickerScss).toContain('.el-date-picker');
      expect(datePickerScss).toContain('--el-datepicker-trigger-border');

      expect(
        existsSync(componentUiPath(tmp, 'datepicker', 'date-picker.stories.ts')),
      ).toBe(false);
      expect(
        existsSync(
          componentUiPath(tmp, 'datepicker', 'date-range-picker.stories.ts'),
        ),
      ).toBe(false);
    });
  });
});
