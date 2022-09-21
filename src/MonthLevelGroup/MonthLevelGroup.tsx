import React, { forwardRef, useRef } from 'react';
import { DefaultProps, Box, Selectors, useComponentDefaultProps } from '@mantine/core';
import dayjs from 'dayjs';
import { MonthLevel, MonthLevelStylesNames, MonthLevelSettings } from '../MonthLevel';
import { handleControlKeyDown } from '../__utils__/handle-control-key-down';
import useStyles from './MonthLevelGroup.styles';

export type MonthLevelGroupStylesNames = Selectors<typeof useStyles> | MonthLevelStylesNames;

export interface MonthLevelGroupProps
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

const defaultProps: Partial<MonthLevelGroupProps> = {
  numberOfMonths: 1,
};

export const MonthLevelGroup = forwardRef<HTMLDivElement, MonthLevelGroupProps>((props, ref) => {
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
  } = useComponentDefaultProps('MonthLevelGroup', defaultProps, props);
  const { classes, cx } = useStyles();
  const daysRefs = useRef<HTMLButtonElement[][][]>([]);

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
          __onDayKeyDown={(event, payload) =>
            handleControlKeyDown({
              monthIndex,
              event,
              payload,
              controlsRef: daysRefs,
              numberOfMonths,
            })
          }
          __getDayRef={(rowIndex, cellIndex, node) => {
            if (!Array.isArray(daysRefs.current[monthIndex])) {
              daysRefs.current[monthIndex] = [];
            }

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
          getDayProps={getDayProps}
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
    <Box className={cx(classes.monthLevelGroup, className)} ref={ref} {...others}>
      {months}
    </Box>
  );
});

MonthLevelGroup.displayName = '@mantine/dates/MonthLevelGroup';
