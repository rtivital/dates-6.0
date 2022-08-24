import React, { forwardRef } from 'react';
import { DefaultProps, Selectors, Box, useComponentDefaultProps } from '@mantine/core';
import useStyles from './CalendarHeader.styles';

export type CalendarHeaderStylesNames = Selectors<typeof useStyles>;

export interface CalendarHeaderProps
  extends DefaultProps<CalendarHeaderStylesNames>,
    React.ComponentPropsWithoutRef<'div'> {}

const defaultProps: Partial<CalendarHeaderProps> = {};

export const CalendarHeader = forwardRef<HTMLDivElement, CalendarHeaderProps>((props, ref) => {
  const { className, ...others } = useComponentDefaultProps('CalendarHeader', defaultProps, props);
  const { classes, cx } = useStyles();
  return (
    <Box className={cx(classes.calendarHeader, className)} ref={ref} {...others}>
      Header
    </Box>
  );
});
