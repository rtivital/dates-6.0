import dayjs from 'dayjs';
import React, { forwardRef } from 'react';
import { Box, DefaultProps, useComponentDefaultProps, Selectors } from '@mantine/core';
import { CalendarHeader, CalendarHeaderStylesNames } from '../CalendarHeader';
import { Month, MonthSettings, MonthStylesNames } from '../Month';
import useStyles from './MonthView.styles';

export type MonthViewStylesNames =
  | Selectors<typeof useStyles>
  | MonthStylesNames
  | CalendarHeaderStylesNames;

export interface MonthViewProps
  extends DefaultProps,
    MonthSettings,
    React.ComponentPropsWithoutRef<'div'> {
  /** Month that is currently displayed */
  month: Date;
}

const defaultProps: Partial<MonthViewProps> = {};

export const MonthView = forwardRef<HTMLDivElement, MonthViewProps>((props, ref) => {
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

    // Other props
    className,
    ...others
  } = useComponentDefaultProps('MonthView', defaultProps, props);

  const { classes, cx } = useStyles();

  return (
    <Box className={cx(classes.monthView, className)} ref={ref} {...others}>
      <CalendarHeader label={dayjs(month).format('MMMM YYYY')} className={classes.calendarHeader} />

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
