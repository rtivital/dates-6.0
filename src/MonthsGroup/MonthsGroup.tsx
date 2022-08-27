import React, { forwardRef } from 'react';
import { DefaultProps, Box, Selectors, useComponentDefaultProps } from '@mantine/core';
import { MonthLevelStylesNames, MonthLevelSettings } from '../MonthLevel';
import useStyles from './MonthsGroup.styles';

export type MonthsGroupStylesNames = Selectors<typeof useStyles> | MonthLevelStylesNames;

export interface MonthsGroupProps
  extends DefaultProps<MonthLevelStylesNames>,
    MonthLevelSettings,
    React.ComponentPropsWithoutRef<'div'> {}

const defaultProps: Partial<MonthsGroupProps> = {};

export const MonthsGroup = forwardRef<HTMLDivElement, MonthsGroupProps>((props, ref) => {
  const { className, ...others } = useComponentDefaultProps('MonthsGroup', defaultProps, props);
  const { classes, cx } = useStyles();

  return (
    <Box className={cx(classes.monthsGroup, className)} ref={ref} {...others}>
      MonthsGroup
    </Box>
  );
});

MonthsGroup.displayName = '@mantine/dates/MonthsGroup';
