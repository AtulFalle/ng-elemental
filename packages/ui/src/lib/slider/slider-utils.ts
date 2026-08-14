export type ElSliderSize = 'sm' | 'md' | 'lg';

export type ElSliderThumb = 'value' | 'start' | 'end';

/** Treat non-positive step as 1. */
export function effectiveSliderStep(step: number): number {
  return step > 0 ? step : 1;
}

export function effectiveSliderBounds(min: number, max: number): {
  min: number;
  max: number;
} {
  if (Number.isNaN(min) || Number.isNaN(max) || max < min) {
    return { min: 0, max: 100 };
  }

  return { min, max };
}

export function clampSliderValue(value: number, min: number, max: number): number {
  const bounds = effectiveSliderBounds(min, max);
  if (Number.isNaN(value)) {
    return bounds.min;
  }

  return Math.min(Math.max(value, bounds.min), bounds.max);
}

/** Snap to the nearest step within [min, max]. */
export function snapSliderValue(
  value: number,
  min: number,
  max: number,
  step: number,
): number {
  const bounds = effectiveSliderBounds(min, max);
  const safeStep = effectiveSliderStep(step);
  const clamped = clampSliderValue(value, bounds.min, bounds.max);
  const steps = Math.round((clamped - bounds.min) / safeStep);
  const snapped = bounds.min + steps * safeStep;
  // Avoid float drift (e.g. 0.1 + 0.2).
  const rounded = Number(snapped.toPrecision(12));
  return clampSliderValue(rounded, bounds.min, bounds.max);
}

/** Percent in 0–100 for thumb / fill placement. */
export function sliderPercent(value: number, min: number, max: number): number {
  const bounds = effectiveSliderBounds(min, max);
  if (bounds.max === bounds.min) {
    return 0;
  }

  const clamped = clampSliderValue(value, bounds.min, bounds.max);
  return ((clamped - bounds.min) / (bounds.max - bounds.min)) * 100;
}

/** Map a horizontal pointer position on the rail to a snapped value. */
export function sliderValueFromClientX(
  clientX: number,
  railRect: DOMRect,
  min: number,
  max: number,
  step: number,
): number {
  if (railRect.width <= 0) {
    return snapSliderValue(min, min, max, step);
  }

  const ratio = Math.min(Math.max((clientX - railRect.left) / railRect.width, 0), 1);
  const bounds = effectiveSliderBounds(min, max);
  const raw = bounds.min + ratio * (bounds.max - bounds.min);
  return snapSliderValue(raw, bounds.min, bounds.max, step);
}

/**
 * Tick mark values. When the step count exceeds `maxTicks`, stride so density
 * stays readable while still including the endpoints.
 */
export function sliderTickValues(
  min: number,
  max: number,
  step: number,
  maxTicks = 25,
): number[] {
  const bounds = effectiveSliderBounds(min, max);
  const safeStep = effectiveSliderStep(step);
  const span = bounds.max - bounds.min;
  if (span <= 0) {
    return [bounds.min];
  }

  const count = Math.floor(span / safeStep) + 1;
  const stride = count <= maxTicks ? 1 : Math.ceil(count / maxTicks);
  const ticks: number[] = [];

  for (let i = 0; i < count; i += stride) {
    ticks.push(snapSliderValue(bounds.min + i * safeStep, bounds.min, bounds.max, safeStep));
  }

  const last = snapSliderValue(bounds.max, bounds.min, bounds.max, safeStep);
  if (ticks[ticks.length - 1] !== last) {
    ticks.push(last);
  }

  return ticks;
}

export function nearestSliderThumb(
  pointerValue: number,
  start: number,
  end: number,
): ElSliderThumb {
  return Math.abs(pointerValue - start) <= Math.abs(pointerValue - end)
    ? 'start'
    : 'end';
}
