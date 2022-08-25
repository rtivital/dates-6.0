import dayjs from 'dayjs';
import React, { forwardRef } from 'react';
import { Box, DefaultProps, useComponentDefaultProps, Selectors } from '@mantine/core';
import {
  CalendarHeader,
  CalendarHeaderStylesNames,
  CalendarHeaderSettings,
} from '../CalendarHeader';
import { Month, MonthSettings, MonthStylesNames } from '../Month';
import useStyles from './MonthLevel.styles';

export type MonthLevelStylesNames =
  | Selectors<typeof useStyles>
  | MonthStylesNames
  | CalendarHeaderStylesNames;

export interface MonthLevelProps
  extends DefaultProps,
    MonthSettings,
    CalendarHeaderSettings,
    React.ComponentPropsWithoutRef<'div'> {
  /** Month that is currently displayed */
  month: Date;

  /** dayjs label format to display month label or a function that returns month label based on month value, defaults to "MMMM YYYY" */
  monthLabelFormat?: string | ((month: Date) => React.ReactNode);

  /** aria-label for change level control */
  levelControlAriaLabel?: string;
}

const defaultProps: Partial<MonthLevelProps> = {
  monthLabelFormat: 'MMMM YYYY',
};

export const MonthLevel = forwardRef<HTMLDivElement, MonthLevelProps>((props, ref) => {
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
    hasNext,
    hasPrevious,
    hasNextLevel,

    // Other props
    className,
    monthLabelFormat,
    levelControlAriaLabel,
    ...others
  } = useComponentDefaultProps('MonthLevel', defaultProps, props);

  const { classes, cx, theme } = useStyles();

  return (
    <Box className={cx(classes.MonthLevel, className)} ref={ref} {...others}>
      <CalendarHeader
        label={
          typeof monthLabelFormat === 'function'
            ? monthLabelFormat(month)
            : dayjs(month)
                .locale(locale || theme.datesLocale)
                .format(monthLabelFormat)
        }
        className={classes.calendarHeader}
        __preventFocus={__preventFocus}
        nextIcon={nextIcon}
        previousIcon={previousIcon}
        nextLabel={nextLabel}
        previousLabel={previousLabel}
        onNext={onNext}
        onPrevious={onPrevious}
        onLevelChange={onLevelChange}
        hasNext={hasNext}
        hasPrevious={hasPrevious}
        hasNextLevel={hasNextLevel}
        levelControlAriaLabel={levelControlAriaLabel}
      />

      <Month
        month={month}
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
      />
    </Box>
  );
});
