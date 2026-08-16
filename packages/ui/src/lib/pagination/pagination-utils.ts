export type ElPaginationItem = number | 'ellipsis';

export function paginationPageCount(total: number, pageSize: number): number {
  const size = Math.max(1, pageSize);
  const n = Math.max(0, total);
  if (n === 0) {
    return 1;
  }
  return Math.ceil(n / size);
}

export function paginationItems(
  page: number,
  pageCount: number,
  siblingCount = 1,
): ElPaginationItem[] {
  const count = Math.max(0, Math.floor(pageCount));
  if (count === 0) {
    return [];
  }

  const current = Math.min(Math.max(1, Math.floor(page)), count);
  const siblings = Math.max(0, Math.floor(siblingCount));
  const pages = new Set<number>();
  pages.add(1);
  pages.add(count);
  for (let i = current - siblings; i <= current + siblings; i++) {
    if (i >= 1 && i <= count) {
      pages.add(i);
    }
  }

  const sorted = [...pages].sort((a, b) => a - b);
  const items: ElPaginationItem[] = [];
  let prev = 0;
  for (const n of sorted) {
    if (prev && n - prev > 1) {
      items.push('ellipsis');
    }
    items.push(n);
    prev = n;
  }
  return items;
}
