export function clampIndex(index: number, count: number): number {
  if (count <= 0) {
    return 0;
  }
  return Math.max(0, Math.min(count - 1, Math.trunc(index)));
}

export function wrapIndex(index: number, count: number): number {
  if (count <= 0) {
    return 0;
  }
  return ((Math.trunc(index) % count) + count) % count;
}

export function nextIndex(
  index: number,
  count: number,
  loop: boolean,
): number {
  if (loop) {
    return wrapIndex(index + 1, count);
  }
  return clampIndex(index + 1, count);
}

export function prevIndex(
  index: number,
  count: number,
  loop: boolean,
): number {
  if (loop) {
    return wrapIndex(index - 1, count);
  }
  return clampIndex(index - 1, count);
}

export function indexFromDrag(
  delta: number,
  threshold: number,
  current: number,
  count: number,
  loop: boolean,
): number {
  if (delta > threshold) {
    return prevIndex(current, count, loop);
  }
  if (delta < -threshold) {
    return nextIndex(current, count, loop);
  }
  return loop ? wrapIndex(current, count) : clampIndex(current, count);
}

export function slideStride(slideWidth: number, peek: number): number {
  return Math.max(0, slideWidth) + Math.max(0, peek);
}

export function trackOffset(
  index: number,
  stride: number,
  dragDelta = 0,
): number {
  return -index * stride + dragDelta;
}
