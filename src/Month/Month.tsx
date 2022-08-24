/* eslint-disable react/no-unused-prop-types */
import dayjs from 'dayjs';
import React, { forwardRef } from 'react';
import { DefaultProps, Selectors, Box, useComponentDefaultProps } from '@mantine/core';
import type { FirstDayOfWeek } from '../types';
import { WeekdaysRow, WeekdaysRowStylesNames } from '../WeekdaysRow';
import { Day, DayStylesNames, DayProps } from '../Day';
import { getMonthDays } from './get-month-days/get-month-days';
import { isSameMonth } from './is-same-month/is-same-month';
import { isBeforeMaxDate } from './is-before-max-date/is-before-max-date';
import { isAfterMinDate } from './is-after-min-date/is-after-min-date';
import useStyles from './Month.styles';

export type MonthStylesNames =
  | Selectors<typeof useStyles>
  | WeekdaysRowStylesNames
  | DayStylesNames;

export interface MonthSettings {
  /** dayjs locale, defaults to theme.datesLocale */
  locale?: string;

  /** number 0-6, 0 – Sunday, 6 – Saturday, defaults to 1 – Monday */
  firstDayOfWeek?: FirstDayOfWeek;

  /** dayjs format for weekdays names, defaults to "dd" */
  weekdayFormat?: string;

  /** Indices of weekend days, 0-6, where 0 is Sunday and 6 is Saturday, defaults to [0, 6] (Sunday and Saturday) */
  weekendDays?: number[];

  /** Adds props to Day component based on date */
  getDayProps?(date: Date): Partial<DayProps>;

  /** Callback function to determine whether the day should be disabled */
  excludeDate?(date: Date): boolean;

  /** Minimum possible date */
  minDate?: Date;

  /** Maximum possible date */
  maxDate?: Date;

  /** Controls day value rendering */
  renderDay?(date: Date): React.ReactNode;

  /** Determines whether outside dates should be hidden, defaults to false */
  hideOutsideDates?: boolean;

  /** Determines whether weekdays row should be hidden, defaults to false */
  hideWeekdays?: boolean;

  /** Assigns aria-label to days based on date */
  getDayAriaLabel?(date: Date): string;
}

export interface MonthProps
  extends DefaultProps<MonthStylesNames>,
    MonthSettings,
    React.ComponentPropsWithoutRef<'table'> {
  __staticSelector?: string;

  /** Month to display */
  month: Date;

  /** Determines whether days should be static, static days can be used to display month if it is not expected that user will interact with the component in any way  */
  static?: boolean;
}

const defaultProps: Partial<MonthProps> = {
  weekendDays: [0, 6],
};

export const Month = forwardRef<HTMLTableElement, MonthProps>((props, ref) => {
  const {
    className,
    classNames,
    styles,
    unstyled,
    __staticSelector,
    locale,
    firstDayOfWeek,
    weekdayFormat,
    month,
    weekendDays,
    getDayProps,
    excludeDate,
    minDate,
    maxDate,
    renderDay,
    hideOutsideDates,
    hideWeekdays,
    getDayAriaLabel,
    static: isStatic,
    ...others
  } = useComponentDefaultProps('Month', defaultProps, props);

  const { classes, cx, theme } = useStyles(null, {
    classNames,
    styles,
    unstyled,
    name: ['Month', __staticSelector],
  });

  const stylesApiProps = {
    classNames,
    styles,
    unstyled,
    __staticSelector: __staticSelector || 'Month',
  };

  const rows = getMonthDays(month, firstDayOfWeek).map((row, rowIndex) => {
    const cells = row.map((date) => {
      const outside = !isSameMonth(date, month);
      const ariaLabel =
        getDayAriaLabel?.(date) ||
        dayjs(date)
          .locale(locale || theme.datesLocale)
          .format('D MMMM YYYY');

      return (
        <td key={date.toString()} className={classes.monthCell}>
          <Day
            {...stylesApiProps}
            renderDay={renderDay}
            date={date}
            weekend={weekendDays.includes(date.getDay())}
            outside={outside}
            hidden={hideOutsideDates ? outside : false}
            aria-label={ariaLabel}
            static={isStatic}
            disabled={
              excludeDate?.(date) ||
              !isBeforeMaxDate(date, maxDate) ||
              !isAfterMinDate(date, minDate)
            }
            {...getDayProps?.(date)}
          />
        </td>
      );
    });

    return (
      <tr key={rowIndex} className={classes.monthRow}>
        {cells}
      </tr>
    );
  });

  return (
    <Box component="table" className={cx(classes.month, className)} ref={ref} {...others}>
      {!hideWeekdays && (
        <thead className={classes.monthThead}>
          <WeekdaysRow
            {...stylesApiProps}
            locale={locale}
            firstDayOfWeek={firstDayOfWeek}
            format={weekdayFormat}
          />
        </thead>
      )}
      <tbody className={classes.monthTbody}>{rows}</tbody>
    </Box>
  );
});

Month.displayName = '@mantine/dates/Month';
