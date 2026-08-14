import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  input,
  linkedSignal,
  output,
  type OutputEmitterRef,
  type WritableSignal,
} from '@angular/core';
import { ElInput } from '../input/input';
import { isDayDisabled, pad2, parseDdMmYyyy } from './date';

@Component({
  selector: 'el-date-fields',
  imports: [ElInput],
  templateUrl: './date-fields.html',
  styleUrl: './date-fields.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'el-date-fields',
    '[class.el-date-fields--range]': 'mode() === "range"',
    '[class.el-date-fields--disabled]': 'disabled()',
  },
})
export class ElDateFields {
  readonly mode = input<'single' | 'range'>('single');
  readonly date = input<Date | null>(null);
  readonly start = input<Date | null>(null);
  readonly end = input<Date | null>(null);
  readonly min = input<Date | null>(null);
  readonly max = input<Date | null>(null);
  readonly disabled = input(false, { transform: booleanAttribute });

  readonly dateCommit = output<Date>();
  readonly startCommit = output<Date>();
  readonly endCommit = output<Date>();

  protected readonly dayField = linkedSignal(() => this.part(this.date(), 'day'));
  protected readonly monthField = linkedSignal(() =>
    this.part(this.date(), 'month'),
  );
  protected readonly yearField = linkedSignal(() => this.part(this.date(), 'year'));
  protected readonly startDayField = linkedSignal(() =>
    this.part(this.start(), 'day'),
  );
  protected readonly startMonthField = linkedSignal(() =>
    this.part(this.start(), 'month'),
  );
  protected readonly startYearField = linkedSignal(() =>
    this.part(this.start(), 'year'),
  );
  protected readonly endDayField = linkedSignal(() => this.part(this.end(), 'day'));
  protected readonly endMonthField = linkedSignal(() =>
    this.part(this.end(), 'month'),
  );
  protected readonly endYearField = linkedSignal(() =>
    this.part(this.end(), 'year'),
  );

  protected onSingleBlur(event: FocusEvent): void {
    this.commitBound(
      event,
      this.dayField,
      this.monthField,
      this.yearField,
      () => this.date(),
      this.dateCommit,
    );
  }

  protected onStartBlur(event: FocusEvent): void {
    this.commitBound(
      event,
      this.startDayField,
      this.startMonthField,
      this.startYearField,
      () => this.start(),
      this.startCommit,
    );
  }

  protected onEndBlur(event: FocusEvent): void {
    this.commitBound(
      event,
      this.endDayField,
      this.endMonthField,
      this.endYearField,
      () => this.end(),
      this.endCommit,
    );
  }

  private part(date: Date | null, part: 'day' | 'month' | 'year'): string {
    if (!date) {
      return '';
    }

    if (part === 'day') {
      return pad2(date.getDate());
    }

    if (part === 'month') {
      return pad2(date.getMonth() + 1);
    }

    return String(date.getFullYear());
  }

  private commitBound(
    event: FocusEvent,
    day: WritableSignal<string>,
    month: WritableSignal<string>,
    year: WritableSignal<string>,
    source: () => Date | null,
    dest: OutputEmitterRef<Date>,
  ): void {
    if (this.focusMovedWithin(event) || this.disabled()) {
      return;
    }

    const next = parseDdMmYyyy(day(), month(), year());
    if (!next || isDayDisabled(next, this.min(), this.max())) {
      const current = source();
      day.set(this.part(current, 'day'));
      month.set(this.part(current, 'month'));
      year.set(this.part(current, 'year'));
      return;
    }

    dest.emit(next);
  }

  private focusMovedWithin(event: FocusEvent): boolean {
    const next = event.relatedTarget as Node | null;
    const current = event.currentTarget as HTMLElement | null;
    return Boolean(next && current?.contains(next));
  }
}
