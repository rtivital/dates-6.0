import type { FirstDayOfWeek } from '../../types';

export function getStartOfWeek(date: Date, firstDayOfWeek: FirstDayOfWeek = 1) {
  const value = new Date(date);

  while (value.getDay() !== firstDayOfWeek) {
    value.setDate(value.getDate() - 1);
  }

  return value;
}
