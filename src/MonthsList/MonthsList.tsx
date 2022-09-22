/* eslint-disable react/no-unused-prop-types */
import dayjs from 'dayjs';
import React, { forwardRef } from 'react';
import { DefaultProps, Box, Selectors, useComponentDefaultProps } from '@mantine/core';
import {
  CalendarPickerControl,
  CalendarPickerControlStylesNames,
  CalendarPickerControlProps,
} from '../CalendarPickerControl';
import { ControlKeydownPayload } from '../__utils__/handle-control-key-down';
import { useDatesContext } from '../DatesProvider';
import { getMonthsData } from './get-months-data/get-months-data';
import { isMonthDisabled } from './is-month-disabled/is-month-disabled';
import useStyles from './MonthsList.styles';

export type MonthsListStylesNames = CalendarPickerControlStylesNames | Selectors<typeof useStyles>;

export interface MonthsListSettings {
  __onControlClick?(event: React.MouseEvent<HTMLButtonElement>, date: Date): void;
  __onControlKeyDown?(
    event: React.KeyboardEvent<HTMLButtonElement>,
    payload: ControlKeydownPayload
  ): void;
  __getControlRef?(rowIndex: number, cellIndex: number, node: HTMLButtonElement): void;

  /** dayjs format for months list  */
  monthsListFormat?: string;

  /** Minimum possible date */
  minDate?: Date;

  /** Maximum possible date */
  maxDate?: Date;

  /** dayjs locale, defaults to value defined in DatesProvider */
  locale?: string;

  /** Adds props to month picker control based on date */
  getMonthControlProps?(date: Date): Partial<CalendarPickerControlProps>;
}

export interface MonthsListProps
  extends DefaultProps<MonthsListStylesNames>,
    MonthsListSettings,
    React.ComponentPropsWithoutRef<'table'> {
  __staticSelector?: string;

  /** Year for which months list should be displayed */
  year: Date;
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
    classNames,
    styles,
    unstyled,
    __staticSelector,
    __getControlRef,
    __onControlKeyDown,
    __onControlClick,
    ...others
  } = useComponentDefaultProps('MonthsList', defaultProps, props);
  const { classes, cx } = useStyles(null, {
    classNames,
    styles,
    unstyled,
    name: ['MonthsList', __staticSelector],
  });

  const ctx = useDatesContext();

  const months = getMonthsData(year);

  const rows = months.map((monthsRow, rowIndex) => {
    const cells = monthsRow.map((month, cellIndex) => {
      const controlProps = getMonthControlProps?.(month);
      return (
        <td key={cellIndex}>
          <CalendarPickerControl
            classNames={classNames}
            styles={styles}
            unstyled={unstyled}
            __staticSelector={__staticSelector || 'MonthsList'}
            disabled={isMonthDisabled(month, minDate, maxDate)}
            ref={(node) => __getControlRef?.(rowIndex, cellIndex, node)}
            {...controlProps}
            onKeyDown={(event) => {
              controlProps?.onKeyDown?.(event);
              __onControlKeyDown?.(event, { rowIndex, cellIndex, date: month });
            }}
            onClick={(event) => {
              controlProps?.onClick?.(event);
              __onControlClick?.(event, month);
            }}
          >
            {dayjs(month).locale(ctx.getLocale(locale)).format(monthsListFormat)}
          </CalendarPickerControl>
        </td>
      );
    });

    return <tr key={rowIndex}>{cells}</tr>;
  });

  return (
    <Box component="table" ref={ref} className={cx(classes.monthsList, className)} {...others}>
      <tbody>{rows}</tbody>
    </Box>
  );
});

MonthsList.displayName = '@mantine/dates/MonthsList';
