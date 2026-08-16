export interface ElListVirtualWindow {
  start: number;
  end: number;
  padStart: number;
  padEnd: number;
}

export function listVirtualWindow(options: {
  scrollTop: number;
  viewportHeight: number;
  itemCount: number;
  itemHeight: number;
  overscan?: number;
}): ElListVirtualWindow {
  const itemHeight = Math.max(1, options.itemHeight);
  const itemCount = Math.max(0, Math.floor(options.itemCount));
  const overscan = Math.max(0, Math.floor(options.overscan ?? 5));
  const viewportHeight = Math.max(0, options.viewportHeight);
  const scrollTop = Math.max(0, options.scrollTop);

  if (itemCount === 0) {
    return { start: 0, end: 0, padStart: 0, padEnd: 0 };
  }

  const start = Math.max(0, Math.floor(scrollTop / itemHeight) - overscan);
  const visible = Math.max(1, Math.ceil(viewportHeight / itemHeight));
  const end = Math.min(itemCount, start + visible + overscan * 2);

  return {
    start,
    end,
    padStart: start * itemHeight,
    padEnd: Math.max(0, (itemCount - end) * itemHeight),
  };
}

export function listRowId(row: object, index: number, track: string): string {
  const value = (row as Record<string, unknown>)[track];
  if (value == null) {
    return String(index);
  }
  return String(value);
}
