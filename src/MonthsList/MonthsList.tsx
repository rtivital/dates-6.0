/* eslint-disable react/no-unused-prop-types */
import React, { forwardRef } from 'react';
import { DefaultProps, Box, Selectors, useComponentDefaultProps } from '@mantine/core';
import { CalendarPickerControl, CalendarPickerControlStylesNames } from '../CalendarPickerControl';
import useStyles from './MonthsList.styles';

export type MonthsListStylesNames = CalendarPickerControlStylesNames | Selectors<typeof useStyles>;

export interface MonthsListProps
  extends DefaultProps<MonthsListStylesNames>,
    React.ComponentPropsWithoutRef<'table'> {
  /** Year for which months list should be displayed */
  year: Date;
}

const defaultProps: Partial<MonthsListProps> = {};

export const MonthsList = forwardRef<HTMLTableElement, MonthsListProps>((props, ref) => {
  const { year, className, ...others } = useComponentDefaultProps(
    'MonthsList',
    defaultProps,
    props
  );
  const { classes, cx } = useStyles();

  return (
    <Box component="table" ref={ref} className={cx(classes.monthsList, className)} {...others}>
      MonthsList
    </Box>
  );
});
