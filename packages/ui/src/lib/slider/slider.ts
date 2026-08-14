import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  ElementRef,
  input,
  model,
  signal,
  viewChild,
} from '@angular/core';
import {
  effectiveSliderBounds,
  effectiveSliderStep,
  nearestSliderThumb,
  snapSliderValue,
  sliderPercent,
  sliderTickValues,
  sliderValueFromClientX,
  type ElSliderSize,
  type ElSliderThumb,
} from './slider-utils';

export type { ElSliderSize, ElSliderThumb } from './slider-utils';

@Component({
  selector: 'el-slider',
  templateUrl: './slider.html',
  styleUrl: './slider.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'el-slider-host',
    '[class.el-slider-host--disabled]': 'disabled()',
    '[class.el-slider-host--error]': 'error()',
    '[attr.aria-disabled]': 'disabled() ? true : null',
  },
})
export class ElSlider {
  readonly value = model(0);
  readonly start = model(0);
  readonly end = model(100);
  readonly min = input(0);
  readonly max = input(100);
  readonly step = input(1);
  readonly range = input(false, { transform: booleanAttribute });
  readonly showTicks = input(false, { transform: booleanAttribute });
  readonly showValue = input(false, { transform: booleanAttribute });
  readonly size = input<ElSliderSize>('md');
  readonly disabled = input(false, { transform: booleanAttribute });
  readonly error = input(false, { transform: booleanAttribute });

  private readonly railRef = viewChild<ElementRef<HTMLElement>>('rail');

  /** Which thumb is currently being dragged (pointer). */
  private readonly dragging = signal<ElSliderThumb | null>(null);

  protected readonly bounds = computed(() =>
    effectiveSliderBounds(this.min(), this.max()),
  );

  protected readonly safeStep = computed(() => effectiveSliderStep(this.step()));

  protected readonly singleValue = computed(() =>
    snapSliderValue(
      this.value(),
      this.bounds().min,
      this.bounds().max,
      this.safeStep(),
    ),
  );

  protected readonly rangeStart = computed(() => {
    const { min, max } = this.bounds();
    const step = this.safeStep();
    const start = snapSliderValue(this.start(), min, max, step);
    const end = snapSliderValue(this.end(), min, max, step);
    return Math.min(start, end);
  });

  protected readonly rangeEnd = computed(() => {
    const { min, max } = this.bounds();
    const step = this.safeStep();
    const start = snapSliderValue(this.start(), min, max, step);
    const end = snapSliderValue(this.end(), min, max, step);
    return Math.max(start, end);
  });

  protected readonly valuePercent = computed(() =>
    sliderPercent(this.singleValue(), this.bounds().min, this.bounds().max),
  );

  protected readonly startPercent = computed(() =>
    sliderPercent(this.rangeStart(), this.bounds().min, this.bounds().max),
  );

  protected readonly endPercent = computed(() =>
    sliderPercent(this.rangeEnd(), this.bounds().min, this.bounds().max),
  );

  protected readonly fillStartPercent = computed(() =>
    this.range() ? this.startPercent() : 0,
  );

  protected readonly fillWidthPercent = computed(() => {
    if (this.range()) {
      return this.endPercent() - this.startPercent();
    }

    return this.valuePercent();
  });

  protected readonly ticks = computed(() => {
    if (!this.showTicks()) {
      return [] as number[];
    }

    return sliderTickValues(
      this.bounds().min,
      this.bounds().max,
      this.safeStep(),
    );
  });

  protected readonly rootClass = computed(() => ({
    'el-slider': true,
    'el-slider--sm': this.size() === 'sm',
    'el-slider--md': this.size() === 'md',
    'el-slider--lg': this.size() === 'lg',
    'el-slider--range': this.range(),
    'el-slider--disabled': this.disabled(),
    'el-slider--error': this.error(),
    'el-slider--dragging': this.dragging() !== null,
  }));

  protected tickPercent(tick: number): number {
    return sliderPercent(tick, this.bounds().min, this.bounds().max);
  }

  protected onRailPointerDown(event: PointerEvent): void {
    if (this.disabled() || event.button !== 0) {
      return;
    }

    const rail = this.railRef()?.nativeElement;
    if (!rail) {
      return;
    }

    const next = sliderValueFromClientX(
      event.clientX,
      rail.getBoundingClientRect(),
      this.bounds().min,
      this.bounds().max,
      this.safeStep(),
    );

    let thumb: ElSliderThumb = 'value';
    if (this.range()) {
      thumb = nearestSliderThumb(next, this.rangeStart(), this.rangeEnd());
    }

    this.dragging.set(thumb);
    this.applyThumbValue(thumb, next);
    rail.setPointerCapture(event.pointerId);
    event.preventDefault();
  }

  protected onRailPointerMove(event: PointerEvent): void {
    const thumb = this.dragging();
    if (!thumb || this.disabled()) {
      return;
    }

    const rail = this.railRef()?.nativeElement;
    if (!rail) {
      return;
    }

    const next = sliderValueFromClientX(
      event.clientX,
      rail.getBoundingClientRect(),
      this.bounds().min,
      this.bounds().max,
      this.safeStep(),
    );
    this.applyThumbValue(thumb, next);
  }

  protected onRailPointerUp(event: PointerEvent): void {
    if (this.dragging() === null) {
      return;
    }

    this.dragging.set(null);
    const rail = this.railRef()?.nativeElement;
    if (rail?.hasPointerCapture(event.pointerId)) {
      rail.releasePointerCapture(event.pointerId);
    }
  }

  protected onThumbKeydown(event: KeyboardEvent, thumb: ElSliderThumb): void {
    if (this.disabled()) {
      return;
    }

    const { min, max } = this.bounds();
    const step = this.safeStep();
    const page = step * 10;
    const current = this.currentThumbValue(thumb);
    let next: number | null = null;

    switch (event.key) {
      case 'ArrowLeft':
      case 'ArrowDown':
        next = current - step;
        break;
      case 'ArrowRight':
      case 'ArrowUp':
        next = current + step;
        break;
      case 'Home':
        next = min;
        break;
      case 'End':
        next = max;
        break;
      case 'PageDown':
        next = current - page;
        break;
      case 'PageUp':
        next = current + page;
        break;
      default:
        return;
    }

    event.preventDefault();
    this.applyThumbValue(thumb, snapSliderValue(next, min, max, step));
  }

  protected onThumbPointerDown(event: PointerEvent, thumb: ElSliderThumb): void {
    if (this.disabled() || event.button !== 0) {
      return;
    }

    const rail = this.railRef()?.nativeElement;
    if (!rail) {
      return;
    }

    this.dragging.set(thumb);
    rail.setPointerCapture(event.pointerId);
    event.preventDefault();
    event.stopPropagation();
  }

  private currentThumbValue(thumb: ElSliderThumb): number {
    if (thumb === 'start') {
      return this.rangeStart();
    }

    if (thumb === 'end') {
      return this.rangeEnd();
    }

    return this.singleValue();
  }

  private applyThumbValue(thumb: ElSliderThumb, next: number): void {
    const { min, max } = this.bounds();
    const step = this.safeStep();
    const snapped = snapSliderValue(next, min, max, step);

    if (thumb === 'value') {
      this.value.set(snapped);
      return;
    }

    if (thumb === 'start') {
      const end = this.rangeEnd();
      const start = Math.min(snapped, end);
      this.start.set(start);
      this.end.set(end);
      return;
    }

    const start = this.rangeStart();
    const end = Math.max(snapped, start);
    this.start.set(start);
    this.end.set(end);
  }
}
