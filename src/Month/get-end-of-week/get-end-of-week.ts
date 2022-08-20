import type { FirstDayOfWeek } from '../../types';

// 0 – 6
// 1 – 0
// 2 – 1
// 3 – 2
// 4 – 3
// 5 – 4
// 6 – 5

export function getEndOfWeek(date: Date, firstDayOfWeek: FirstDayOfWeek = 1) {
  const value = new Date(date);
  const lastDayOfWeek = firstDayOfWeek === 0 ? 6 : firstDayOfWeek - 1;

  while (value.getDay() !== lastDayOfWeek) {
    value.setDate(value.getDate() + 1);
  }

  return value;
}
