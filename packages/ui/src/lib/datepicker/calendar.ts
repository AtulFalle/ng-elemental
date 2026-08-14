import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  ElementRef,
  inject,
  input,
  model,
  output,
  signal,
} from '@angular/core';
import {
  addDays,
  addMonths,
  compareDays,
  getMonthGrid,
  getWeekStart,
  isDayDisabled,
  isDayInRange,
  isSameDay,
  isSameMonth,
  lastDayOfMonth,
  monthLabel,
  monthLabels,
  monthYearTitle,
  startOfMonth,
  weekdayLabels,
  YEAR_LIST,
  YEAR_MAX,
  YEAR_MIN,
  type ElCalendarCell,
  type ElCalendarMode,
} from './date';

interface ElCalendarDayCell extends ElCalendarCell {
  day: number;
  today: boolean;
  selected: boolean;
  rangeStart: boolean;
  rangeEnd: boolean;
  inRange: boolean;
  disabled: boolean;
  focused: boolean;
}

interface ElCalendarPickerItem<T> {
  value: T;
  label: string;
  selected: boolean;
  today: boolean;
  disabled: boolean;
}

@Component({
  selector: 'el-calendar',
  templateUrl: './calendar.html',
  styleUrl: './calendar.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'el-calendar',
    '[class.el-calendar--range]': 'mode() === "range"',
    '[class.el-calendar--disabled]': 'disabled()',
    '(keydown)': 'onHostKeydown($event)',
  },
})
export class ElCalendar {
  private readonly elementRef = inject(ElementRef<HTMLElement>);

  readonly month = model(startOfMonth(new Date()));
  readonly mode = input<ElCalendarMode>('single');
  readonly selected = input<Date | null>(null);
  readonly rangeStart = input<Date | null>(null);
  readonly rangeEnd = input<Date | null>(null);
  readonly hover = input<Date | null>(null);
  readonly min = input<Date | null>(null);
  readonly max = input<Date | null>(null);
  readonly locale = input<string>();
  readonly disabled = input(false, { transform: booleanAttribute });

  readonly daySelected = output<Date>();
  readonly dateHover = output<Date>();

  protected readonly focusedDate = signal<Date | null>(null);
  protected readonly view = signal<'day' | 'month' | 'year'>('day');

  private readonly weekStartsOn = computed(() => getWeekStart(this.locale()));

  protected readonly weekdayLabels = computed(() =>
    weekdayLabels(this.locale(), this.weekStartsOn()),
  );

  protected readonly monthTitle = computed(() =>
    monthYearTitle(this.month(), this.locale()),
  );

  protected readonly monthName = computed(() =>
    monthLabel(this.month(), this.locale()),
  );

  protected readonly yearName = computed(() =>
    String(this.month().getFullYear()),
  );

  protected readonly monthItems = computed((): ElCalendarPickerItem<number>[] => {
    if (this.view() !== 'month') {
      return [];
    }

    const month = this.month();
    const now = new Date();
    const thisYear = now.getFullYear() === month.getFullYear();
    const currentMonth = month.getMonth();

    return monthLabels(this.locale()).map((label, index) => ({
      value: index,
      label,
      selected: index === currentMonth,
      today: thisYear && now.getMonth() === index,
      disabled: this.isMonthDisabled(index),
    }));
  });

  protected readonly yearItems = computed((): ElCalendarPickerItem<number>[] => {
    if (this.view() !== 'year') {
      return [];
    }

    const currentYear = this.month().getFullYear();
    const thisYear = new Date().getFullYear();

    return YEAR_LIST.map((year) => ({
      value: year,
      label: String(year),
      selected: year === currentYear,
      today: year === thisYear,
      disabled: this.isYearDisabled(year),
    }));
  });

  protected readonly weeks = computed((): ElCalendarDayCell[][] => {
    if (this.view() !== 'day') {
      return [];
    }

    const month = this.month();
    const mode = this.mode();
    const selected = this.selected();
    const rangeStart = this.rangeStart();
    const rangeEnd = this.rangeEnd();
    const hover = this.hover();
    const min = this.min();
    const max = this.max();
    const disabled = this.disabled();
    const focused = this.focusedDate() ?? month;
    const today = new Date();
    const previewEnd = rangeEnd ?? hover;
    const cells = getMonthGrid(month, this.weekStartsOn());
    const rows: ElCalendarDayCell[][] = [];

    for (let index = 0; index < cells.length; index += 7) {
      rows.push(
        cells.slice(index, index + 7).map((cell) => {
          const inMonth = cell.inCurrentMonth;
          const isRange = mode === 'range';
          const rangeStartDay = isRange && isSameDay(cell.date, rangeStart);
          const rangeEndDay = isRange && isSameDay(cell.date, rangeEnd);

          return {
            ...cell,
            day: cell.date.getDate(),
            today: isSameDay(cell.date, today),
            selected: isRange
              ? rangeStartDay || rangeEndDay
              : isSameDay(cell.date, selected),
            rangeStart: rangeStartDay,
            rangeEnd: rangeEndDay,
            inRange:
              isRange &&
              !!rangeStart &&
              !!previewEnd &&
              !isSameDay(rangeStart, previewEnd) &&
              isDayInRange(cell.date, rangeStart, previewEnd),
            disabled:
              disabled ||
              !inMonth ||
              isDayDisabled(cell.date, min, max),
            focused: isSameDay(cell.date, focused),
          };
        }),
      );
    }

    return rows;
  });

  protected openMonthView(): void {
    if (!this.disabled()) {
      this.view.set('month');
    }
  }

  protected openYearView(): void {
    if (this.disabled()) {
      return;
    }

    this.view.set('year');
    queueMicrotask(() => {
      const selected = this.elementRef.nativeElement.querySelector(
        '.el-calendar__picker-item--selected',
      ) as HTMLElement | null;
      selected?.scrollIntoView({ block: 'center' });
    });
  }

  protected selectMonth(monthIndex: number): void {
    if (this.disabled() || this.isMonthDisabled(monthIndex)) {
      return;
    }

    this.month.set(new Date(this.month().getFullYear(), monthIndex, 1));
    this.view.set('day');
  }

  protected selectYear(year: number): void {
    if (this.disabled() || this.isYearDisabled(year)) {
      return;
    }

    this.month.set(new Date(year, this.month().getMonth(), 1));
    this.view.set('month');
  }

  protected onDayClick(date: Date): void {
    if (
      this.disabled() ||
      !isSameMonth(date, this.month()) ||
      isDayDisabled(date, this.min(), this.max())
    ) {
      return;
    }

    this.focusedDate.set(date);
    this.daySelected.emit(date);
  }

  protected onDayEnter(date: Date): void {
    if (this.mode() === 'range' && !this.disabled()) {
      this.dateHover.emit(date);
    }
  }

  onHostKeydown(event: KeyboardEvent): void {
    const target = event.target as HTMLElement | null;
    if (
      target?.closest(
        'button.el-calendar__period, button.el-calendar__picker-item',
      )
    ) {
      return;
    }

    if (this.disabled() || this.view() !== 'day') {
      return;
    }

    const focused = this.focusedDate() ?? this.month();
    let next: Date | null = null;

    if (event.key === 'ArrowLeft') {
      next = addDays(focused, -1);
    } else if (event.key === 'ArrowRight') {
      next = addDays(focused, 1);
    } else if (event.key === 'ArrowUp') {
      next = addDays(focused, -7);
    } else if (event.key === 'ArrowDown') {
      next = addDays(focused, 7);
    } else if (event.key === 'PageUp') {
      next = addMonths(focused, -1);
    } else if (event.key === 'PageDown') {
      next = addMonths(focused, 1);
    } else if (event.key === 'Home') {
      next = startOfMonth(this.month());
    } else if (event.key === 'End') {
      next = lastDayOfMonth(this.month());
    } else if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      this.onDayClick(focused);
      return;
    }

    if (!next) {
      return;
    }

    event.preventDefault();
    this.focusedDate.set(next);
    if (!isSameMonth(next, this.month())) {
      this.month.set(startOfMonth(next));
    }

    queueMicrotask(() => {
      const day = this.elementRef.nativeElement.querySelector(
        '.el-calendar__day[tabindex="0"]',
      ) as HTMLButtonElement | null;
      day?.focus();
    });
  }

  private isMonthDisabled(monthIndex: number): boolean {
    const year = this.month().getFullYear();
    const start = new Date(year, monthIndex, 1);
    return this.isPeriodDisabled(start, lastDayOfMonth(start));
  }

  private isYearDisabled(year: number): boolean {
    if (year < YEAR_MIN || year > YEAR_MAX) {
      return true;
    }

    return this.isPeriodDisabled(new Date(year, 0, 1), new Date(year, 11, 31));
  }

  private isPeriodDisabled(start: Date, end: Date): boolean {
    const min = this.min();
    const max = this.max();
    if (min && compareDays(end, min) < 0) {
      return true;
    }

    if (max && compareDays(start, max) > 0) {
      return true;
    }

    return false;
  }
}
