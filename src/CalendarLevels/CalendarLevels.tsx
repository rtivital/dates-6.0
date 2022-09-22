/* eslint-disable react/no-unused-prop-types */
import React, { forwardRef } from 'react';
import { Box, DefaultProps, Selectors, useComponentDefaultProps } from '@mantine/core';
import useStyles from './CalendarLevels.styles';

export type CalendarLevelsStylesNames = Selectors<typeof useStyles>;

export interface CalendarLevelsProps
  extends DefaultProps<CalendarLevelsStylesNames>,
    React.ComponentPropsWithoutRef<'div'> {
  __staticSelector?: string;
}

const defaultProps: Partial<CalendarLevelsProps> = {};

export const CalendarLevels = forwardRef<HTMLDivElement, CalendarLevelsProps>((props, ref) => {
  const { className, classNames, styles, __staticSelector, unstyled, ...others } =
    useComponentDefaultProps('CalendarLevels', defaultProps, props);
  const { classes, cx } = useStyles(null, {
    classNames,
    styles,
    unstyled,
    name: ['CalendarLevels', __staticSelector],
  });

  return (
    <Box className={cx(classes.calendarLevels, className)} ref={ref} {...others}>
      Levels
    </Box>
  );
});

CalendarLevels.displayName = '@mantine/dates/CalendarLevels';
