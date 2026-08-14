export type ElProgressSize = 'sm' | 'md' | 'lg';

/** Treat non-positive max as 100 (native progress fallback). */
export function effectiveProgressMax(max: number): number {
  return max > 0 ? max : 100;
}

export function clampProgressValue(value: number, max: number): number {
  const safeMax = effectiveProgressMax(max);
  if (Number.isNaN(value)) {
    return 0;
  }

  return Math.min(Math.max(value, 0), safeMax);
}

/** Percent in 0–100 for fill width / stroke. */
export function progressPercent(value: number, max: number): number {
  const safeMax = effectiveProgressMax(max);
  return (clampProgressValue(value, safeMax) / safeMax) * 100;
}

export function progressLabelPercent(value: number, max: number): number {
  return Math.round(progressPercent(value, max));
}
