import { RefObject } from 'react';
import { DayKeydownPayload } from '../Month';

type DaysRef = RefObject<HTMLButtonElement[][][]>;

interface ShiftFocusInput {
  daysRefs: DaysRef;
  direction: 'down' | 'up' | 'left' | 'right';
  monthIndex: number;
  payload: DayKeydownPayload;
  count?: number;
}

function focusOnNextFocusableDay({
  direction,
  monthIndex,
  payload,
  count = 1,
  daysRefs,
}: ShiftFocusInput) {
  const changeRow = ['down', 'up'].includes(direction);

  const rowIndex = changeRow
    ? payload.rowIndex + (direction === 'down' ? count : -count)
    : payload.rowIndex;

  const cellIndex = changeRow
    ? payload.cellIndex
    : payload.cellIndex + (direction === 'right' ? count : -count);

  const dayToFocus = daysRefs.current[monthIndex][rowIndex][cellIndex];

  if (!dayToFocus) {
    return;
  }

  if (dayToFocus.disabled) {
    focusOnNextFocusableDay({ direction, monthIndex, payload, daysRefs, count: count + 1 });
  } else {
    dayToFocus.focus();
  }
}

interface HandleDayKeydownInput {
  daysRefs: DaysRef;
  numberOfMonths: number;
  monthIndex: number;
  payload: DayKeydownPayload;
  event: React.KeyboardEvent<HTMLButtonElement>;
}

export function handleDayKeyDown({
  daysRefs,
  monthIndex,
  payload,
  event,
  numberOfMonths,
}: HandleDayKeydownInput) {
  switch (event.key) {
    case 'ArrowDown': {
      event.preventDefault();

      const hasRowBelow = payload.rowIndex + 1 < daysRefs.current[monthIndex].length;
      if (hasRowBelow) {
        focusOnNextFocusableDay({ direction: 'down', monthIndex, payload, daysRefs });
      }
      break;
    }

    case 'ArrowUp': {
      event.preventDefault();

      const hasRowAbove = payload.rowIndex > 0;
      if (hasRowAbove) {
        focusOnNextFocusableDay({ direction: 'up', monthIndex, payload, daysRefs });
      }
      break;
    }

    case 'ArrowRight': {
      event.preventDefault();

      if (payload.cellIndex !== 6) {
        focusOnNextFocusableDay({ direction: 'right', monthIndex, payload, daysRefs });
      } else if (monthIndex + 1 < numberOfMonths) {
        if (daysRefs.current[monthIndex + 1][payload.rowIndex]) {
          daysRefs.current[monthIndex + 1][payload.rowIndex][0]?.focus();
        }
      }

      break;
    }

    case 'ArrowLeft': {
      event.preventDefault();

      if (payload.cellIndex !== 0) {
        focusOnNextFocusableDay({ direction: 'left', monthIndex, payload, daysRefs });
      } else if (monthIndex > 0) {
        if (daysRefs.current[monthIndex - 1][payload.rowIndex]) {
          daysRefs.current[monthIndex - 1][payload.rowIndex][6].focus();
        }
      }
    }
  }
}
