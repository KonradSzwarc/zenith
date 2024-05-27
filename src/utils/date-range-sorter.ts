import { isAfter } from 'date-fns';

interface ItemWithDates {
  startDate: Date;
  endDate?: Date;
}

function compareDates(a: Date, b: Date): number {
  if (isAfter(a, b)) return -1;
  if (isAfter(b, a)) return 1;
  return 0;
}

export function dateRangeSorter(a: ItemWithDates, b: ItemWithDates) {
  if (a.endDate && b.endDate) return compareDates(a.endDate, b.endDate);

  if (a.endDate && !b.endDate) return 1;
  if (!a.endDate && b.endDate) return -1;

  return compareDates(a.startDate, b.startDate);
}
