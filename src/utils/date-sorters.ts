import { isAfter } from 'date-fns';

function compareDates(a?: Date, b?: Date): number {
  if (!a) return b ? -1 : 0;
  if (!b) return a ? 1 : 0;

  if (isAfter(a, b)) return -1;
  if (isAfter(b, a)) return 1;
  return 0;
}

type ItemWithDates = { startDate: Date; endDate?: Date };
export function dateRangeSorter(a: ItemWithDates, b: ItemWithDates) {
  return a.endDate || b.endDate ? compareDates(a.endDate, b.endDate) : compareDates(a.startDate, b.startDate);
}

type ItemWithDate = { date?: Date };
export function dateSorter(a: ItemWithDate, b: ItemWithDate) {
  return compareDates(a.date, b.date);
}
