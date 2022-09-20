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
import { getYearsData } from './get-years-data/get-years-data';
import { isYearDisabled } from './is-year-disabled/is-year-disabled';
import useStyles from './YearsList.styles';

export type YearsListStylesNames = CalendarPickerControlStylesNames | Selectors<typeof useStyles>;

export interface YearsListSettings {
  /** dayjs format for months list  */
  yearsListFormat?: string;

  /** Minimum possible date */
  minDate?: Date;

  /** Maximum possible date */
  maxDate?: Date;

  /** dayjs locale, defaults to value defined in DatesProvider */
  locale?: string;

  /** Adds props to month picker control based on date */
  getMonthControlProps?(date: Date): Partial<CalendarPickerControlProps>;
}

export interface YearsListProps
  extends DefaultProps<YearsListStylesNames>,
    YearsListSettings,
    React.ComponentPropsWithoutRef<'table'> {
  __staticSelector?: string;

  /** Decade for which years list should be displayed */
  decade: Date;
}

const defaultProps: Partial<YearsListProps> = {
  yearsListFormat: 'YYYY',
};

export const YearsList = forwardRef<HTMLTableElement, YearsListProps>((props, ref) => {
  const {
    decade,
    className,
    yearsListFormat,
    locale,
    minDate,
    maxDate,
    getMonthControlProps,
    classNames,
    styles,
    unstyled,
    __staticSelector,
    ...others
  } = useComponentDefaultProps('YearsList', defaultProps, props);
  const { classes, cx } = useStyles(null, {
    classNames,
    styles,
    unstyled,
    name: ['YearsList', __staticSelector],
  });

  const ctx = useDatesContext();

  const years = getYearsData(decade);

  const rows = years.map((yearsRow, rowIndex) => {
    const cells = yearsRow.map((month, cellIndex) => (
      <td key={cellIndex}>
        <CalendarPickerControl
          classNames={classNames}
          styles={styles}
          unstyled={unstyled}
          __staticSelector={__staticSelector || 'YearsList'}
          disabled={isYearDisabled(month, minDate, maxDate)}
          {...getMonthControlProps?.(month)}
        >
          {dayjs(month).locale(ctx.getLocale(locale)).format(yearsListFormat)}
        </CalendarPickerControl>
      </td>
    ));

    return <tr key={rowIndex}>{cells}</tr>;
  });

  return (
    <Box component="table" ref={ref} className={cx(classes.yearsList, className)} {...others}>
      <tbody>{rows}</tbody>
    </Box>
  );
});

YearsList.displayName = '@mantine/dates/YearsList';
