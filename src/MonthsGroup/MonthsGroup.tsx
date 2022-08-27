import React, { forwardRef, useRef } from 'react';
import { DefaultProps, Box, Selectors, useComponentDefaultProps } from '@mantine/core';
import { MonthLevel, MonthLevelStylesNames, MonthLevelSettings } from '../MonthLevel';
import useStyles from './MonthsGroup.styles';

export type MonthsGroupStylesNames = Selectors<typeof useStyles> | MonthLevelStylesNames;

export interface MonthsGroupProps
  extends DefaultProps<MonthLevelStylesNames>,
    MonthLevelSettings,
    React.ComponentPropsWithoutRef<'div'> {
  /** Amount of months to render next to each other */
  amountOfMonths?: number;

  /** Month that is currently displayed */
  month: Date;
}

const defaultProps: Partial<MonthsGroupProps> = {};

export const MonthsGroup = forwardRef<HTMLDivElement, MonthsGroupProps>((props, ref) => {
  const { className, month, amountOfMonths, ...others } = useComponentDefaultProps(
    'MonthsGroup',
    defaultProps,
    props
  );
  const { classes, cx } = useStyles();
  const daysRefs = useRef<Record<string, HTMLButtonElement>>({});

  console.log(daysRefs);

  return (
    <Box className={cx(classes.monthsGroup, className)} ref={ref} {...others}>
      <MonthLevel
        month={month}
        __getDayRef={(rowIndex, cellIndex, node) => {
          daysRefs.current[`${rowIndex}.${cellIndex}`] = node;
        }}
      />
    </Box>
  );
});

MonthsGroup.displayName = '@mantine/dates/MonthsGroup';
