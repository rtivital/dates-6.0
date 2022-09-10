import React, { forwardRef, useRef } from 'react';
import { DefaultProps, Box, Selectors, useComponentDefaultProps } from '@mantine/core';
import dayjs from 'dayjs';
import { MonthLevel, MonthLevelStylesNames, MonthLevelSettings } from '../MonthLevel';
import { DayKeydownPayload } from '../Month';
import useStyles from './MonthsGroup.styles';

export type MonthsGroupStylesNames = Selectors<typeof useStyles> | MonthLevelStylesNames;

export interface MonthsGroupProps
  extends DefaultProps<MonthLevelStylesNames>,
    Omit<MonthLevelSettings, 'withPrevious' | 'withNext'>,
    React.ComponentPropsWithoutRef<'div'> {
  /** Amount of months to render next to each other */
  numberOfMonths?: number;

  /** Month that is currently displayed */
  month: Date;

  /** Function that returns level control aria-label based on month date */
  levelControlAriaLabel?: ((month: Date) => string) | string;
}

const defaultProps: Partial<MonthsGroupProps> = {
  numberOfMonths: 1,
};

export const MonthsGroup = forwardRef<HTMLDivElement, MonthsGroupProps>((props, ref) => {
  const {
    // Month settings
    month,
    locale,
    firstDayOfWeek,
    weekdayFormat,
    weekendDays,
    getDayProps,
    excludeDate,
    minDate,
    maxDate,
    renderDay,
    hideOutsideDates,
    hideWeekdays,
    getDayAriaLabel,

    // CalendarHeader settings
    __preventFocus,
    nextIcon,
    previousIcon,
    nextLabel,
    previousLabel,
    onNext,
    onPrevious,
    onLevelChange,
    nextDisabled,
    previousDisabled,
    hasNextLevel,

    // Other settings
    className,
    numberOfMonths,
    levelControlAriaLabel,
    ...others
  } = useComponentDefaultProps('MonthsGroup', defaultProps, props);
  const { classes, cx } = useStyles();
  const daysRefs = useRef<HTMLButtonElement[][][]>(
    Array(numberOfMonths)
      .fill(0)
      .map(() => [])
  );

  const focusOnNextFocusableDay = (
    direction: 'down' | 'up' | 'left' | 'right',
    monthIndex: number,
    payload: DayKeydownPayload,
    n = 1
  ) => {
    const changeRow = ['down', 'up'].includes(direction);

    const rowIndex = changeRow
      ? payload.rowIndex + (direction === 'down' ? n : -n)
      : payload.rowIndex;

    const cellIndex = changeRow
      ? payload.cellIndex
      : payload.cellIndex + (direction === 'right' ? n : -n);

    const dayToFocus = daysRefs.current[monthIndex][rowIndex][cellIndex];

    if (!dayToFocus) {
      return;
    }

    if (dayToFocus.disabled) {
      // Day is disabled, call this function recursively until
      // we find a non-disabled day or there are no more days
      focusOnNextFocusableDay(direction, monthIndex, payload, n + 1);
    } else {
      dayToFocus.focus();
    }
  };

  const handleDayKeyDown = (
    monthIndex: number,
    payload: DayKeydownPayload,
    event: React.KeyboardEvent<HTMLButtonElement>
  ) => {
    switch (event.key) {
      case 'ArrowDown': {
        event.preventDefault();

        const hasRowBelow = payload.rowIndex + 1 < daysRefs.current[monthIndex].length;
        if (hasRowBelow) {
          focusOnNextFocusableDay('down', monthIndex, payload);
        }
        break;
      }

      case 'ArrowUp': {
        event.preventDefault();

        const hasRowAbove = payload.rowIndex > 0;
        if (hasRowAbove) {
          focusOnNextFocusableDay('up', monthIndex, payload);
        }
        break;
      }

      case 'ArrowRight': {
        event.preventDefault();

        const isNotLastCell = payload.cellIndex !== 6;
        if (isNotLastCell) {
          focusOnNextFocusableDay('right', monthIndex, payload);
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
          focusOnNextFocusableDay('left', monthIndex, payload);
        } else if (monthIndex > 0) {
          if (daysRefs.current[monthIndex - 1][payload.rowIndex]) {
            daysRefs.current[monthIndex - 1][payload.rowIndex][6].focus();
          }
        }
      }
    }
  };

  const months = Array(numberOfMonths)
    .fill(0)
    .map((_, monthIndex) => {
      const currentMonth = dayjs(month).add(monthIndex, 'months').toDate();

      return (
        <MonthLevel
          key={monthIndex}
          month={currentMonth}
          withNext={monthIndex === numberOfMonths - 1}
          withPrevious={monthIndex === 0}
          __onDayKeyDown={(event, payload) => handleDayKeyDown(monthIndex, payload, event)}
          __getDayRef={(rowIndex, cellIndex, node) => {
            if (!Array.isArray(daysRefs.current[monthIndex][rowIndex])) {
              daysRefs.current[monthIndex][rowIndex] = [];
            }
            daysRefs.current[monthIndex][rowIndex][cellIndex] = node;
          }}
          levelControlAriaLabel={
            typeof levelControlAriaLabel === 'function'
              ? levelControlAriaLabel(currentMonth)
              : levelControlAriaLabel
          }
          locale={locale}
          firstDayOfWeek={firstDayOfWeek}
          weekdayFormat={weekdayFormat}
          weekendDays={weekendDays}
          getDayProps={(date) => {
            const originalProps = getDayProps?.(date);
            return {
              ...originalProps,
              // onMouseDown: event => handleDayMouseDown(`${monthIndex}.${rowIndex}.${cellIndex}`, event),
            };
          }}
          excludeDate={excludeDate}
          minDate={minDate}
          maxDate={maxDate}
          renderDay={renderDay}
          hideOutsideDates={hideOutsideDates}
          hideWeekdays={hideWeekdays}
          getDayAriaLabel={getDayAriaLabel}
          __preventFocus={__preventFocus}
          nextIcon={nextIcon}
          previousIcon={previousIcon}
          nextLabel={nextLabel}
          previousLabel={previousLabel}
          onNext={onNext}
          onPrevious={onPrevious}
          onLevelChange={onLevelChange}
          nextDisabled={nextDisabled}
          previousDisabled={previousDisabled}
          hasNextLevel={hasNextLevel}
        />
      );
    });

  return (
    <Box className={cx(classes.monthsGroup, className)} ref={ref} {...others}>
      {months}
    </Box>
  );
});

MonthsGroup.displayName = '@mantine/dates/MonthsGroup';
