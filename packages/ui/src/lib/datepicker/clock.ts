import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  linkedSignal,
  output,
  signal,
} from '@angular/core';
import { ElInput } from '../input/input';
import {
  ElSegmentedButton,
  ElSegmentedButtonItem,
} from '../segmented-button/segmented-button';
import {
  clampMinutes,
  displayHour,
  hoursFromDisplay,
  meridiemOf,
  minuteTicks,
  pad2,
  parseInteger,
  withTime,
  type ElHourCycle,
} from './date';

interface ElClockTick {
  value: number;
  label: string;
  ring: 'outer' | 'inner';
  transform: string;
  selected: boolean;
}

function clockTick(
  value: number,
  label: string,
  deg: number,
  ring: 'outer' | 'inner',
  selected: boolean,
): ElClockTick {
  return {
    value,
    label,
    ring,
    selected,
    transform: `rotate(${deg}deg) translateY(var(--el-clock-tick-offset)) rotate(${-deg}deg)`,
  };
}

@Component({
  selector: 'el-clock',
  imports: [ElInput, ElSegmentedButton, ElSegmentedButtonItem],
  templateUrl: './clock.html',
  styleUrl: './clock.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'el-clock',
    '[class.el-clock--disabled]': 'disabled()',
    '[class.el-clock--h23]': 'hourCycle() === "h23"',
  },
})
export class ElClock {
  readonly value = input<Date | null>(null);
  readonly hourCycle = input<ElHourCycle>('h12');
  readonly minuteStep = input(5);
  readonly disabled = input(false, { transform: booleanAttribute });

  readonly timeSelected = output<Date>();

  protected readonly stage = signal<'hour' | 'minute'>('hour');
  protected readonly hours = linkedSignal(() => this.value()?.getHours() ?? 0);
  protected readonly minutes = linkedSignal(
    () => this.value()?.getMinutes() ?? 0,
  );
  protected readonly hourField = linkedSignal(() =>
    pad2(displayHour(this.value()?.getHours() ?? 0, this.hourCycle())),
  );
  protected readonly minuteField = linkedSignal(() =>
    pad2(this.value()?.getMinutes() ?? 0),
  );
  protected readonly meridiem = linkedSignal<'am' | 'pm'>(() =>
    meridiemOf(this.value()?.getHours() ?? 0),
  );
  protected readonly activeTick = signal(0);

  protected readonly ticks = computed((): ElClockTick[] => {
    if (this.stage() === 'minute') {
      const selected = this.minutes();
      return minuteTicks(this.minuteStep()).map((minute) =>
        clockTick(minute, pad2(minute), minute * 6, 'outer', minute === selected),
      );
    }

    if (this.hourCycle() === 'h23') {
      const selected = this.hours();
      return [
        ...Array.from({ length: 12 }, (_, hour) =>
          clockTick(hour, pad2(hour), hour * 30, 'inner', hour === selected),
        ),
        ...Array.from({ length: 12 }, (_, hour) => {
          const value = hour + 12;
          return clockTick(
            value,
            pad2(value),
            hour * 30,
            'outer',
            value === selected,
          );
        }),
      ];
    }

    const selected = displayHour(this.hours(), 'h12');
    return [12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((hour, index) =>
      clockTick(hour, String(hour), index * 30, 'outer', hour === selected),
    );
  });

  protected readonly handDeg = computed(() => {
    if (this.stage() === 'minute') {
      return this.minutes() * 6;
    }

    if (this.hourCycle() === 'h23') {
      return (this.hours() % 12) * 30;
    }

    return (displayHour(this.hours(), 'h12') % 12) * 30;
  });

  protected showHours(): void {
    this.stage.set('hour');
    this.activeTick.set(
      this.hourCycle() === 'h12'
        ? displayHour(this.hours(), 'h12')
        : this.hours(),
    );
  }

  protected goToMinutes(): void {
    this.stage.set('minute');
    this.activeTick.set(this.minutes());
  }

  protected onHourField(value: string): void {
    this.hourField.set(value);
    const parsed = parseInteger(value);
    if (parsed === null) {
      return;
    }

    this.hours.set(
      hoursFromDisplay(parsed, this.meridiem(), this.hourCycle()),
    );
  }

  protected onMinuteField(value: string): void {
    this.minuteField.set(value);
    const parsed = parseInteger(value);
    if (parsed === null) {
      return;
    }

    this.minutes.set(clampMinutes(parsed));
  }

  protected onMeridiem(value: string): void {
    const meridiem = value === 'pm' ? 'pm' : 'am';
    this.meridiem.set(meridiem);
    this.hours.set(
      hoursFromDisplay(displayHour(this.hours(), 'h12'), meridiem, 'h12'),
    );
  }

  protected onMinuteEnter(event: Event): void {
    event.preventDefault();
    this.commitFromFields();
  }

  protected onFieldsBlur(event: FocusEvent): void {
    const next = event.relatedTarget as Node | null;
    const current = event.currentTarget as HTMLElement | null;
    if (next && current?.contains(next)) {
      return;
    }

    this.commitFromFields();
  }

  protected onTickClick(tick: ElClockTick): void {
    if (this.disabled()) {
      return;
    }

    this.activeTick.set(tick.value);

    if (this.stage() === 'hour') {
      this.hours.set(
        this.hourCycle() === 'h12'
          ? hoursFromDisplay(tick.value, this.meridiem(), 'h12')
          : tick.value,
      );
      this.hourField.set(pad2(displayHour(this.hours(), this.hourCycle())));
      this.goToMinutes();
      return;
    }

    this.minutes.set(tick.value);
    this.minuteField.set(pad2(tick.value));
    this.emitTime();
  }

  protected onFaceKeydown(event: KeyboardEvent): void {
    if (this.disabled()) {
      return;
    }

    const ticks = this.ticks();
    if (ticks.length === 0) {
      return;
    }

    const currentIndex = Math.max(
      0,
      ticks.findIndex((tick) => tick.value === this.activeTick()),
    );

    if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
      event.preventDefault();
      const next = ticks[(currentIndex + 1) % ticks.length];
      this.activeTick.set(next.value);
      return;
    }

    if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
      event.preventDefault();
      const next = ticks[(currentIndex - 1 + ticks.length) % ticks.length];
      this.activeTick.set(next.value);
      return;
    }

    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      const tick = ticks[currentIndex];
      this.onTickClick(tick);
    }
  }

  flush(): Date | null {
    return this.buildDateFromFields();
  }

  private commitFromFields(): void {
    const next = this.buildDateFromFields();
    if (!next) {
      this.hourField.set(pad2(displayHour(this.hours(), this.hourCycle())));
      this.minuteField.set(pad2(this.minutes()));
      this.meridiem.set(meridiemOf(this.hours()));
      return;
    }

    this.hours.set(next.getHours());
    this.minutes.set(next.getMinutes());
    this.emitTime();
  }

  private buildDateFromFields(): Date | null {
    const hour = parseInteger(this.hourField());
    const minute = parseInteger(this.minuteField());
    if (hour === null || minute === null) {
      return null;
    }

    return withTime(
      this.value() ?? new Date(),
      hoursFromDisplay(hour, this.meridiem(), this.hourCycle()),
      clampMinutes(minute),
    );
  }

  private emitTime(): void {
    this.timeSelected.emit(
      withTime(this.value() ?? new Date(), this.hours(), this.minutes()),
    );
  }
}
