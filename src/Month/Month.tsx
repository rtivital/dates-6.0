/* eslint-disable react/no-unused-prop-types */
import React, { forwardRef } from 'react';
import { DefaultProps, Selectors, Box, useComponentDefaultProps } from '@mantine/core';
import type { FirstDayOfWeek } from '../types';
import { WeekdaysRow, WeekdaysRowStylesNames } from '../WeekdaysRow';
import useStyles from './Month.styles';

export type MonthStylesNames = Selectors<typeof useStyles> | WeekdaysRowStylesNames;

export interface MonthSettings {}

export interface MonthProps
  extends DefaultProps<MonthStylesNames>,
    MonthSettings,
    React.ComponentPropsWithoutRef<'table'> {
  __staticSelector?: string;

  /** dayjs locale, defaults to theme.datesLocale */
  locale?: string;

  /** number 0-6, 0 – Sunday, 6 – Saturday, defaults to 1 – Monday */
  firstDayOfWeek?: FirstDayOfWeek;

  /** dayjs format for weekdays names */
  weekdayFormat?: string;
}

const defaultProps: Partial<MonthProps> = {};

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
    __staticSelector,
  };

  return (
    <Box component="table" className={cx(classes.month, className)} ref={ref} {...others}>
      <thead>
        <WeekdaysRow
          {...stylesApiProps}
          locale={locale}
          firstDayOfWeek={firstDayOfWeek}
          format={weekdayFormat}
        />
      </thead>
    </Box>
  );
});

Month.displayName = '@mantine/dates/Month';
