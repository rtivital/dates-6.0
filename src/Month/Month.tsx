/* eslint-disable react/no-unused-prop-types */
import React, { forwardRef } from 'react';
import { DefaultProps, Selectors, Box, useComponentDefaultProps } from '@mantine/core';
import type { FirstDayOfWeek } from '../types';
import { WeekdaysRow, WeekdaysRowStylesNames } from '../WeekdaysRow';
import { Day, DayStylesNames, DayProps } from '../Day';
import { getMonthDays } from './get-month-days/get-month-days';
import { isSameMonth } from './is-same-month/is-same-month';
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
}

export interface MonthProps
  extends DefaultProps<MonthStylesNames>,
    MonthSettings,
    React.ComponentPropsWithoutRef<'table'> {
  __staticSelector?: string;

  /** Month to display */
  month: Date;
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
    ...others
  } = useComponentDefaultProps('Month', defaultProps, props);

  const { classes, cx } = useStyles(null, {
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
    const cells = row.map((date) => (
      <td key={date.toString()} className={classes.monthCell}>
        <Day
          {...stylesApiProps}
          date={date}
          weekend={weekendDays.includes(date.getDay())}
          outside={!isSameMonth(date, month)}
          {...getDayProps?.(date)}
        />
      </td>
    ));

    return (
      <tr key={rowIndex} className={classes.monthRow}>
        {cells}
      </tr>
    );
  });

  return (
    <Box component="table" className={cx(classes.month, className)} ref={ref} {...others}>
      <thead className={classes.monthThead}>
        <WeekdaysRow
          {...stylesApiProps}
          locale={locale}
          firstDayOfWeek={firstDayOfWeek}
          format={weekdayFormat}
        />
      </thead>
      <tbody className={classes.monthTbody}>{rows}</tbody>
    </Box>
  );
});

Month.displayName = '@mantine/dates/Month';
