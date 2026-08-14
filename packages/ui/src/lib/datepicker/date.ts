export type ElHourCycle = 'h12' | 'h23';
export type ElDatePickerMode = 'date' | 'time' | 'datetime';
export type ElDatePickerSize = 'sm' | 'md' | 'lg';
export type ElCalendarMode = 'single' | 'range';

export const YEAR_MIN = 1900;
export const YEAR_MAX = 2100;
export const YEAR_LIST: readonly number[] = Array.from(
  { length: YEAR_MAX - YEAR_MIN + 1 },
  (_, index) => YEAR_MIN + index,
);

export interface ElCalendarCell {
  date: Date;
  iso: string;
  inCurrentMonth: boolean;
}

export interface ElDateRange {
  start: Date | null;
  end: Date | null;
}

export function startOfDay(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

export function startOfMonth(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), 1);
}

export function addMonths(date: Date, amount: number): Date {
  return new Date(date.getFullYear(), date.getMonth() + amount, 1);
}

export function addDays(date: Date, amount: number): Date {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate() + amount);
}

export function daysInMonth(year: number, monthIndex: number): number {
  return new Date(year, monthIndex + 1, 0).getDate();
}

export function pad2(value: number): string {
  return String(value).padStart(2, '0');
}

export function toIsoDate(date: Date): string {
  return `${date.getFullYear()}-${pad2(date.getMonth() + 1)}-${pad2(date.getDate())}`;
}

export function isSameMonth(a: Date, b: Date): boolean {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth();
}

export function isSameDay(a: Date | null | undefined, b: Date | null | undefined): boolean {
  if (!a || !b) {
    return false;
  }

  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

export function compareDays(a: Date, b: Date): number {
  const yearDelta = a.getFullYear() - b.getFullYear();
  if (yearDelta !== 0) {
    return yearDelta < 0 ? -1 : 1;
  }

  const monthDelta = a.getMonth() - b.getMonth();
  if (monthDelta !== 0) {
    return monthDelta < 0 ? -1 : 1;
  }

  const dayDelta = a.getDate() - b.getDate();
  if (dayDelta === 0) {
    return 0;
  }

  return dayDelta < 0 ? -1 : 1;
}

export function isDayInRange(
  date: Date,
  start: Date | null,
  end: Date | null,
): boolean {
  if (!start || !end) {
    return false;
  }

  const from = compareDays(start, end) <= 0 ? start : end;
  const to = compareDays(start, end) <= 0 ? end : start;
  return compareDays(date, from) >= 0 && compareDays(date, to) <= 0;
}

export function isDayDisabled(
  date: Date,
  min: Date | null,
  max: Date | null,
): boolean {
  if (min && compareDays(date, min) < 0) {
    return true;
  }

  if (max && compareDays(date, max) > 0) {
    return true;
  }

  return false;
}

export function clampDateParts(year: number, month: number, day: number): Date {
  const y = Math.min(YEAR_MAX, Math.max(YEAR_MIN, Math.trunc(year)));
  const m = Math.min(12, Math.max(1, Math.trunc(month)));
  const maxDay = daysInMonth(y, m - 1);
  const d = Math.min(maxDay, Math.max(1, Math.trunc(day)));
  return new Date(y, m - 1, d);
}

export function parseDdMmYyyy(
  dayValue: string,
  monthValue: string,
  yearValue: string,
): Date | null {
  const day = parseInteger(dayValue);
  const month = parseInteger(monthValue);
  const year = parseInteger(yearValue);
  if (day === null || month === null || year === null || year < 1000) {
    return null;
  }

  return clampDateParts(year, month, day);
}

export function reduceRangePick(current: ElDateRange, date: Date): ElDateRange {
  const start = current.start;
  const end = current.end;
  if (!start || end) {
    return { start: date, end: null };
  }

  if (compareDays(date, start) < 0) {
    return { start: date, end: start };
  }

  return { start, end: date };
}

export function assignRangeBound(
  current: ElDateRange,
  bound: 'start' | 'end',
  date: Date,
): ElDateRange {
  if (bound === 'start') {
    const end = current.end;
    if (end && compareDays(date, end) > 0) {
      return { start: end, end: date };
    }

    return { start: date, end };
  }

  const start = current.start;
  if (start && compareDays(date, start) < 0) {
    return { start: date, end: start };
  }

  return { start, end: date };
}

export function clampPairMonth(date: Date): Date {
  const min = new Date(YEAR_MIN, 0, 1);
  const max = new Date(YEAR_MAX, 10, 1);
  const next = startOfMonth(date).getTime();
  if (next < min.getTime()) {
    return min;
  }

  if (next > max.getTime()) {
    return max;
  }

  return startOfMonth(date);
}

export function formatDdMmYyyy(date: Date): string {
  return `${pad2(date.getDate())}-${pad2(date.getMonth() + 1)}-${date.getFullYear()}`;
}

export function formatTime(date: Date, hourCycle: ElHourCycle): string {
  const minutes = pad2(date.getMinutes());
  if (hourCycle === 'h23') {
    return `${pad2(date.getHours())}:${minutes}`;
  }

  const hours = date.getHours();
  const meridiem = hours >= 12 ? 'PM' : 'AM';
  const display = hours % 12 === 0 ? 12 : hours % 12;
  return `${pad2(display)}:${minutes} ${meridiem}`;
}

export function formatDateTime(date: Date, hourCycle: ElHourCycle): string {
  return `${formatDdMmYyyy(date)} ${formatTime(date, hourCycle)}`;
}

export function formatDateRange(start: Date | null, end: Date | null): string {
  if (start && end) {
    return `${formatDdMmYyyy(start)} – ${formatDdMmYyyy(end)}`;
  }

  if (start) {
    return formatDdMmYyyy(start);
  }

  if (end) {
    return formatDdMmYyyy(end);
  }

  return '';
}

export function combineDateAndTime(datePart: Date, timePart: Date): Date {
  return new Date(
    datePart.getFullYear(),
    datePart.getMonth(),
    datePart.getDate(),
    timePart.getHours(),
    timePart.getMinutes(),
    0,
    0,
  );
}

export function withTime(date: Date, hours: number, minutes: number): Date {
  return new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
    hours,
    minutes,
    0,
    0,
  );
}

export function parseInteger(value: string): number | null {
  const trimmed = value.trim();
  if (trimmed === '') {
    return null;
  }

  const parsed = Number(trimmed);
  if (!Number.isFinite(parsed)) {
    return null;
  }

  return Math.trunc(parsed);
}

export function displayHour(hours: number, hourCycle: ElHourCycle): number {
  if (hourCycle === 'h23') {
    return hours;
  }

  const remainder = hours % 12;
  return remainder === 0 ? 12 : remainder;
}

export function meridiemOf(hours: number): 'am' | 'pm' {
  return hours >= 12 ? 'pm' : 'am';
}

export function hoursFromDisplay(
  display: number,
  meridiem: 'am' | 'pm',
  hourCycle: ElHourCycle,
): number {
  if (hourCycle === 'h23') {
    return Math.min(23, Math.max(0, Math.trunc(display)));
  }

  const hour = Math.min(12, Math.max(1, Math.trunc(display)));
  if (meridiem === 'am') {
    return hour === 12 ? 0 : hour;
  }

  return hour === 12 ? 12 : hour + 12;
}

export function clampMinutes(value: number): number {
  return Math.min(59, Math.max(0, Math.trunc(value)));
}

export function startOfWeek(date: Date, weekStartsOn: number): Date {
  const start = startOfDay(date);
  const diff = (start.getDay() - weekStartsOn + 7) % 7;
  start.setDate(start.getDate() - diff);
  return start;
}

export function getWeekStart(locale?: string): number {
  try {
    const loc = new Intl.Locale(locale ?? 'en-US');
    const weekInfo =
      (loc as Intl.Locale & { weekInfo?: { firstDay: number } }).weekInfo ??
      (
        loc as Intl.Locale & {
          getWeekInfo?: () => { firstDay: number };
        }
      ).getWeekInfo?.();

    if (!weekInfo) {
      return 0;
    }

    return weekInfo.firstDay === 7 ? 0 : weekInfo.firstDay;
  } catch {
    return 0;
  }
}

export function weekdayLabels(locale?: string, weekStartsOn?: number): string[] {
  const start = weekStartsOn ?? getWeekStart(locale);
  const formatter = new Intl.DateTimeFormat(locale, { weekday: 'short' });
  const sunday = new Date(2024, 0, 7);
  return Array.from({ length: 7 }, (_, index) => {
    const day = new Date(sunday);
    day.setDate(sunday.getDate() + start + index);
    return formatter.format(day);
  });
}

export function monthYearTitle(date: Date, locale?: string): string {
  return new Intl.DateTimeFormat(locale, {
    month: 'long',
    year: 'numeric',
  }).format(date);
}

export function monthLabel(date: Date, locale?: string): string {
  return new Intl.DateTimeFormat(locale, { month: 'long' }).format(date);
}

export function monthLabels(locale?: string): string[] {
  const formatter = new Intl.DateTimeFormat(locale, { month: 'short' });
  return Array.from({ length: 12 }, (_, month) =>
    formatter.format(new Date(2024, month, 1)),
  );
}

export function getMonthGrid(
  viewDate: Date,
  weekStartsOn: number,
): ElCalendarCell[] {
  const monthStart = startOfMonth(viewDate);
  const gridStart = startOfWeek(monthStart, weekStartsOn);
  return Array.from({ length: 42 }, (_, index) => {
    const date = addDays(gridStart, index);
    return {
      date,
      iso: toIsoDate(date),
      inCurrentMonth: date.getMonth() === viewDate.getMonth(),
    };
  });
}

export function lastDayOfMonth(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0);
}

export function minuteTicks(step: number): number[] {
  const resolved = Math.max(1, Math.min(30, Math.trunc(step) || 5));
  if (resolved <= 5) {
    return [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55];
  }

  const ticks: number[] = [];
  for (let minute = 0; minute < 60; minute += resolved) {
    ticks.push(minute);
  }

  return ticks;
}
