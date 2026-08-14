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
} from '@angular/core';
import { ElIcon } from '../icon/icon';
import { ElCalendar } from './calendar';
import { ElDateFields } from './date-fields';
import {
  addMonths,
  assignRangeBound,
  clampPairMonth,
  formatDateRange,
  isSameMonth,
  reduceRangePick,
  startOfMonth,
  YEAR_MAX,
  YEAR_MIN,
  type ElDatePickerSize,
  type ElDateRange,
} from './date';

export type { ElDateRange } from './date';

@Component({
  selector: 'el-date-range-picker',
  imports: [ElIcon, ElCalendar, ElDateFields],
  templateUrl: './date-range-picker.html',
  styleUrl: './date-range-picker.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'el-date-range-picker',
    '[class.el-date-range-picker--sm]': 'size() === "sm"',
    '[class.el-date-range-picker--md]': 'size() === "md"',
    '[class.el-date-range-picker--lg]': 'size() === "lg"',
    '[class.el-date-range-picker--open]': 'open()',
    '[class.el-date-range-picker--disabled]': 'disabled()',
    '[class.el-date-range-picker--error]': 'error()',
    '(document:click)': 'onDocumentClick($event)',
    '(document:keydown)': 'onDocumentKeydown($event)',
  },
})
export class ElDateRangePicker {
  private readonly elementRef = inject(ElementRef<HTMLElement>);

  readonly value = model<ElDateRange>({ start: null, end: null });
  readonly min = input<Date | null>(null);
  readonly max = input<Date | null>(null);
  readonly locale = input<string>();
  readonly size = input<ElDatePickerSize>('md');
  readonly disabled = input(false, { transform: booleanAttribute });
  readonly error = input(false, { transform: booleanAttribute });
  readonly placeholder = input('Select date range');
  readonly ariaLabel = input<string>();

  protected readonly open = signal(false);
  protected readonly leftMonth = signal(startOfMonth(new Date()));
  protected readonly hovered = signal<Date | null>(null);

  protected readonly rightMonth = computed(() => addMonths(this.leftMonth(), 1));

  protected readonly canGoPrev = computed(() => {
    const left = this.leftMonth();
    return left.getFullYear() > YEAR_MIN || left.getMonth() > 0;
  });

  protected readonly canGoNext = computed(() => {
    const left = this.leftMonth();
    return left.getFullYear() < YEAR_MAX || left.getMonth() < 10;
  });

  protected readonly isPlaceholder = computed(() => {
    const value = this.value();
    return !value.start && !value.end;
  });

  protected readonly triggerLabel = computed(() => {
    const value = this.value();
    const label = formatDateRange(value.start, value.end);
    return label || this.placeholder();
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

  protected shiftMonth(delta: number): void {
    this.leftMonth.set(clampPairMonth(addMonths(this.leftMonth(), delta)));
  }

  protected onLeftMonth(month: Date): void {
    this.leftMonth.set(clampPairMonth(month));
  }

  protected onRightMonth(month: Date): void {
    this.leftMonth.set(clampPairMonth(addMonths(month, -1)));
  }

  protected onDaySelected(date: Date): void {
    const next = reduceRangePick(this.value(), date);
    this.value.set(next);
    if (next.start && !next.end && !this.monthIsVisible(next.start)) {
      this.leftMonth.set(clampPairMonth(next.start));
    }

    if (next.start && next.end) {
      this.closePanel();
    }
  }

  protected onStartCommit(date: Date): void {
    this.value.set(assignRangeBound(this.value(), 'start', date));
  }

  protected onEndCommit(date: Date): void {
    const next = assignRangeBound(this.value(), 'end', date);
    this.value.set(next);
    if (next.start && next.end) {
      this.closePanel();
    }
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
    const start = this.value().start;
    this.leftMonth.set(clampPairMonth(start ?? new Date()));
    this.hovered.set(null);
    this.open.set(true);
  }

  private closePanel(): void {
    this.open.set(false);
    this.hovered.set(null);
  }

  private monthIsVisible(date: Date): boolean {
    const left = this.leftMonth();
    return isSameMonth(date, left) || isSameMonth(date, addMonths(left, 1));
  }
}
