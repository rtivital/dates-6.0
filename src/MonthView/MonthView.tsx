import React, { forwardRef } from 'react';
import { Box, DefaultProps, useComponentDefaultProps, Selectors } from '@mantine/core';
import { Month, MonthSettings, MonthStylesNames } from '../Month';
import useStyles from './MonthView.styles';

export type MonthViewStylesNames = Selectors<typeof useStyles> | MonthStylesNames;

export interface MonthViewProps
  extends DefaultProps,
    MonthSettings,
    React.ComponentPropsWithoutRef<'div'> {}

const defaultProps: Partial<MonthViewProps> = {};

export const MonthView = forwardRef<HTMLDivElement, MonthViewProps>((props, ref) => {
  const { className, ...others } = useComponentDefaultProps('MonthView', defaultProps, props);
  const { classes, cx } = useStyles();
  return (
    <Box className={cx(classes.monthView, className)} ref={ref} {...others}>
      MonthView
    </Box>
  );
});
