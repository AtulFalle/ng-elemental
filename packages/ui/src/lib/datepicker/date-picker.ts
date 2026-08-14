import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  ElementRef,
  inject,
  input,
  model,
  signal,
  viewChild,
} from '@angular/core';
import { ElIcon } from '../icon/icon';
import {
  ElSegmentedButton,
  ElSegmentedButtonItem,
} from '../segmented-button/segmented-button';
import { ElCalendar } from './calendar';
import { ElClock } from './clock';
import { ElDateFields } from './date-fields';
import {
  combineDateAndTime,
  formatDateTime,
  formatDdMmYyyy,
  formatTime,
  startOfDay,
  startOfMonth,
  type ElDatePickerMode,
  type ElDatePickerSize,
  type ElHourCycle,
} from './date';

export type {
  ElCalendarMode,
  ElDatePickerMode,
  ElDatePickerSize,
  ElHourCycle,
} from './date';
export { ElCalendar } from './calendar';
export { ElClock } from './clock';
export { ElDateFields } from './date-fields';
export {
  formatDateRange,
  formatDateTime,
  formatDdMmYyyy,
  formatTime,
} from './date';

@Component({
  selector: 'el-date-picker',
  imports: [
    ElIcon,
    ElCalendar,
    ElClock,
    ElDateFields,
    ElSegmentedButton,
    ElSegmentedButtonItem,
  ],
  templateUrl: './date-picker.html',
  styleUrl: './date-picker.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'el-date-picker',
    '[class.el-date-picker--sm]': 'size() === "sm"',
    '[class.el-date-picker--md]': 'size() === "md"',
    '[class.el-date-picker--lg]': 'size() === "lg"',
    '[class.el-date-picker--open]': 'open()',
    '[class.el-date-picker--disabled]': 'disabled()',
    '(document:click)': 'onDocumentClick($event)',
    '(document:keydown)': 'onDocumentKeydown($event)',
  },
})
export class ElDatePicker {
  private readonly elementRef = inject(ElementRef<HTMLElement>);
  private readonly clock = viewChild(ElClock);

  readonly value = model<Date | null>(null);
  readonly mode = input<ElDatePickerMode>('date');
  readonly hourCycle = input<ElHourCycle>('h12');
  readonly minuteStep = input(5);
  readonly min = input<Date | null>(null);
  readonly max = input<Date | null>(null);
  readonly locale = input<string>();
  readonly size = input<ElDatePickerSize>('md');
  readonly disabled = input(false, { transform: booleanAttribute });
  readonly placeholder = input('Select date');
  readonly ariaLabel = input<string>();

  protected readonly open = signal(false);
  protected readonly section = signal('date');
  protected readonly viewMonth = signal(startOfMonth(new Date()));

  protected readonly triggerIcon = computed(() =>
    this.mode() === 'time' ? 'clock' : 'calendar',
  );

  protected readonly isPlaceholder = computed(() => this.value() === null);

  protected readonly triggerLabel = computed(() => {
    const value = this.value();
    if (!value) {
      return this.placeholder();
    }

    const mode = this.mode();
    if (mode === 'time') {
      return formatTime(value, this.hourCycle());
    }

    if (mode === 'datetime') {
      return formatDateTime(value, this.hourCycle());
    }

    return formatDdMmYyyy(value);
  });

  protected readonly showCalendar = computed(() => {
    const mode = this.mode();
    return mode === 'date' || (mode === 'datetime' && this.section() === 'date');
  });

  protected readonly showClock = computed(() => {
    const mode = this.mode();
    return mode === 'time' || (mode === 'datetime' && this.section() === 'time');
  });

  protected toggleOpen(event: Event): void {
    event.stopPropagation();
    if (this.disabled()) {
      return;
    }

    if (this.open()) {
      this.closePanel();
      return;
    }

    this.openPanel();
  }

  protected onTriggerKeydown(event: KeyboardEvent): void {
    if (this.disabled()) {
      return;
    }

    if (
      event.key === 'ArrowDown' ||
      event.key === 'ArrowUp' ||
      event.key === 'Enter' ||
      event.key === ' '
    ) {
      event.preventDefault();
      this.openPanel();
    }
  }

  protected onDateSelected(date: Date): void {
    const mode = this.mode();
    const current = this.value();
    this.viewMonth.set(startOfMonth(date));

    if (mode === 'date') {
      this.value.set(startOfDay(date));
      this.closePanel(false);
      return;
    }

    this.value.set(combineDateAndTime(date, current ?? date));
    this.section.set('time');
  }

  protected onTimeSelected(date: Date): void {
    const current = this.value();
    this.value.set(current ? combineDateAndTime(current, date) : date);
    this.closePanel(false);
  }

  onDocumentClick(event: Event): void {
    if (!this.open()) {
      return;
    }

    const target = event.target as Node | null;
    if (target && this.elementRef.nativeElement.contains(target)) {
      return;
    }

    this.closePanel();
  }

  onDocumentKeydown(event: KeyboardEvent): void {
    if (event.key === 'Escape' && this.open()) {
      event.preventDefault();
      this.closePanel();
    }
  }

  private openPanel(): void {
    this.section.set(this.mode() === 'time' ? 'time' : 'date');
    this.viewMonth.set(startOfMonth(this.value() ?? new Date()));
    this.open.set(true);
  }

  private closePanel(flushClock = true): void {
    if (flushClock && this.showClock()) {
      const flushed = this.clock()?.flush();
      if (flushed) {
        const current = this.value();
        this.value.set(
          current ? combineDateAndTime(current, flushed) : flushed,
        );
      }
    }

    this.open.set(false);
  }
}
