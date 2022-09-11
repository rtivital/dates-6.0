/* eslint-disable react/no-unused-prop-types */
import dayjs from 'dayjs';
import React, { forwardRef } from 'react';
import { DefaultProps, Box, Selectors, useComponentDefaultProps } from '@mantine/core';
import {
  CalendarPickerControl,
  CalendarPickerControlStylesNames,
  CalendarPickerControlProps,
} from '../CalendarPickerControl';
import { useDatesContext } from '../DatesProvider';
import { getMonthsData } from './get-months-data/get-months-data';
import { isMonthDisabled } from './is-month-disabled/is-month-disabled';
import useStyles from './MonthsList.styles';

export type MonthsListStylesNames = CalendarPickerControlStylesNames | Selectors<typeof useStyles>;

export interface MonthsListSettings {
  /** dayjs format for months list  */
  monthsListFormat?: string;

  /** Minimum possible date */
  minDate?: Date;

  /** Maximum possible date */
  maxDate?: Date;
}

export interface MonthsListProps
  extends DefaultProps<MonthsListStylesNames>,
    MonthsListSettings,
    React.ComponentPropsWithoutRef<'table'> {
  /** Year for which months list should be displayed */
  year: Date;

  /** dayjs locale, defaults to value defined in DatesProvider */
  locale?: string;

  /** Adds props to month picker control based on date */
  getMonthControlProps?(date: Date): Partial<CalendarPickerControlProps>;
}

const defaultProps: Partial<MonthsListProps> = {
  monthsListFormat: 'MMM',
};

export const MonthsList = forwardRef<HTMLTableElement, MonthsListProps>((props, ref) => {
  const {
    year,
    className,
    monthsListFormat,
    locale,
    minDate,
    maxDate,
    getMonthControlProps,
    ...others
  } = useComponentDefaultProps('MonthsList', defaultProps, props);
  const { classes, cx } = useStyles();
  const ctx = useDatesContext();

  const months = getMonthsData(year);

  const rows = months.map((monthsRow, rowIndex) => {
    const cells = monthsRow.map((month, cellIndex) => (
      <td key={cellIndex}>
        <CalendarPickerControl
          disabled={isMonthDisabled(month, minDate, maxDate)}
          {...getMonthControlProps?.(month)}
        >
          {dayjs(month).locale(ctx.getLocale(locale)).format(monthsListFormat)}
        </CalendarPickerControl>
      </td>
    ));

    return <tr key={rowIndex}>{cells}</tr>;
  });

  return (
    <Box component="table" ref={ref} className={cx(classes.monthsList, className)} {...others}>
      <tbody>{rows}</tbody>
    </Box>
  );
});

MonthsList.displayName = '@mantine/dates/MonthsList';
