export function clampPercent(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

export function normalizeSizes(
  defaults: Array<number | undefined>,
  mins: number[],
  maxes: number[],
): number[] {
  const count = defaults.length;
  if (count === 0) {
    return [];
  }

  const clampedDefaults = defaults.map((value, index) => {
    if (value === undefined || Number.isNaN(value)) {
      return undefined;
    }

    return clampPercent(value, mins[index] ?? 0, maxes[index] ?? 100);
  });

  const specifiedSum = clampedDefaults.reduce<number>(
    (sum, value) => sum + (value ?? 0),
    0,
  );
  const unspecified = clampedDefaults.filter((value) => value === undefined).length;
  const remaining = Math.max(0, 100 - specifiedSum);
  const share = unspecified > 0 ? remaining / unspecified : 0;

  let sizes = clampedDefaults.map((value) => value ?? share);

  if (unspecified === 0 && specifiedSum > 0 && specifiedSum !== 100) {
    sizes = sizes.map((value) => (value / specifiedSum) * 100);
  }

  return sizes.map((value, index) =>
    clampPercent(value, mins[index] ?? 0, maxes[index] ?? 100),
  );
}

export function applyResize(
  sizes: number[],
  index: number,
  deltaPercent: number,
  mins: number[],
  maxes: number[],
): number[] {
  const next = sizes.slice();
  const trailing = index + 1;
  if (trailing >= next.length || index < 0) {
    return next;
  }

  const minA = mins[index] ?? 0;
  const maxA = maxes[index] ?? 100;
  const minB = mins[trailing] ?? 0;
  const maxB = maxes[trailing] ?? 100;
  const pair = next[index] + next[trailing];

  let sizeA = clampPercent(next[index] + deltaPercent, minA, maxA);
  let sizeB = pair - sizeA;

  if (sizeB < minB) {
    sizeB = minB;
    sizeA = pair - sizeB;
  } else if (sizeB > maxB) {
    sizeB = maxB;
    sizeA = pair - sizeB;
  }

  sizeA = clampPercent(sizeA, minA, maxA);
  sizeB = pair - sizeA;

  next[index] = sizeA;
  next[trailing] = sizeB;
  return next;
}

export function splitBounds(
  sizes: number[],
  index: number,
  mins: number[],
  maxes: number[],
): { min: number; max: number } {
  const trailing = index + 1;
  const pair = (sizes[index] ?? 0) + (sizes[trailing] ?? 0);
  const minA = mins[index] ?? 0;
  const maxA = maxes[index] ?? 100;
  const minB = mins[trailing] ?? 0;
  const maxB = maxes[trailing] ?? 100;

  return {
    min: Math.max(minA, pair - maxB),
    max: Math.min(maxA, pair - minB),
  };
}
