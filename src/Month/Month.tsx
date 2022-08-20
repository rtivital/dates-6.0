/* eslint-disable react/no-unused-prop-types */
import React, { forwardRef } from 'react';
import { DefaultProps, Selectors, Box, useComponentDefaultProps } from '@mantine/core';
import useStyles from './Month.styles';
import { WeekdaysRow } from '../WeekdaysRow';

export type MonthStylesNames = Selectors<typeof useStyles>;

export interface MonthSettings {}

export interface MonthProps
  extends DefaultProps<MonthStylesNames>,
    MonthSettings,
    React.ComponentPropsWithoutRef<'table'> {
  __staticSelector?: string;
}

const defaultProps: Partial<MonthProps> = {};

export const Month = forwardRef<HTMLTableElement, MonthProps>((props, ref) => {
  const { className, classNames, styles, unstyled, __staticSelector, ...others } =
    useComponentDefaultProps('Month', defaultProps, props);

  const { classes, cx } = useStyles(null, {
    classNames,
    styles,
    unstyled,
    name: ['Month', __staticSelector],
  });

  return (
    <Box component="table" className={cx(classes.month, className)} ref={ref} {...others}>
      <thead>
        <WeekdaysRow />
      </thead>
    </Box>
  );
});

Month.displayName = '@mantine/dates/Month';
