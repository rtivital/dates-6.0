import { RefObject } from 'react';

export interface ControlKeydownPayload {
  cellIndex: number;
  rowIndex: number;
  date: Date;
}

type ControlsRef = RefObject<HTMLButtonElement[][][]>;

interface ShiftFocusInput {
  controlsRef: ControlsRef;
  direction: 'down' | 'up' | 'left' | 'right';
  monthIndex: number;
  payload: ControlKeydownPayload;
  count?: number;
}

function focusOnNextFocusableControl({
  direction,
  monthIndex,
  payload,
  count = 1,
  controlsRef,
}: ShiftFocusInput) {
  const changeRow = ['down', 'up'].includes(direction);

  const rowIndex = changeRow
    ? payload.rowIndex + (direction === 'down' ? count : -count)
    : payload.rowIndex;

  const cellIndex = changeRow
    ? payload.cellIndex
    : payload.cellIndex + (direction === 'right' ? count : -count);

  const controlToFocus = controlsRef.current[monthIndex][rowIndex][cellIndex];

  if (!controlToFocus) {
    return;
  }

  if (controlToFocus.disabled) {
    focusOnNextFocusableControl({ direction, monthIndex, payload, controlsRef, count: count + 1 });
  } else {
    controlToFocus.focus();
  }
}

interface HandleControlKeydownInput {
  controlsRef: ControlsRef;
  numberOfMonths: number;
  monthIndex: number;
  payload: ControlKeydownPayload;
  event: React.KeyboardEvent<HTMLButtonElement>;
}

export function handleControlKeyDown({
  controlsRef,
  monthIndex,
  payload,
  event,
  numberOfMonths,
}: HandleControlKeydownInput) {
  switch (event.key) {
    case 'ArrowDown': {
      event.preventDefault();

      const hasRowBelow = payload.rowIndex + 1 < controlsRef.current[monthIndex].length;
      if (hasRowBelow) {
        focusOnNextFocusableControl({ direction: 'down', monthIndex, payload, controlsRef });
      }
      break;
    }

    case 'ArrowUp': {
      event.preventDefault();

      const hasRowAbove = payload.rowIndex > 0;
      if (hasRowAbove) {
        focusOnNextFocusableControl({ direction: 'up', monthIndex, payload, controlsRef });
      }
      break;
    }

    case 'ArrowRight': {
      event.preventDefault();

      if (payload.cellIndex !== 6) {
        focusOnNextFocusableControl({ direction: 'right', monthIndex, payload, controlsRef });
      } else if (monthIndex + 1 < numberOfMonths) {
        if (controlsRef.current[monthIndex + 1][payload.rowIndex]) {
          controlsRef.current[monthIndex + 1][payload.rowIndex][0]?.focus();
        }
      }

      break;
    }

    case 'ArrowLeft': {
      event.preventDefault();

      if (payload.cellIndex !== 0) {
        focusOnNextFocusableControl({ direction: 'left', monthIndex, payload, controlsRef });
      } else if (monthIndex > 0) {
        if (controlsRef.current[monthIndex - 1][payload.rowIndex]) {
          controlsRef.current[monthIndex - 1][payload.rowIndex][6].focus();
        }
      }
    }
  }
}
