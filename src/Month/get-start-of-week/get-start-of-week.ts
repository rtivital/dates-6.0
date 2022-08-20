import type { FirstDayOfWeek } from '../../types';

export function getStartOfWeek(date: Date, firstDayOfWeek: FirstDayOfWeek = 1) {
  const value = new Date(date);
  const day = value.getDay();

  if (day === firstDayOfWeek) {
    return value;
  }

  if (day < firstDayOfWeek) {
    const diff = day - firstDayOfWeek;
    value.setDate(value.getDate() - (day - diff));
    return value;
  }

  const diff = firstDayOfWeek - day;
  value.setDate(value.getDate() + diff);
  return value;
}
