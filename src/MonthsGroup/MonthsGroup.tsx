import React, { forwardRef, useRef } from 'react';
import { DefaultProps, Box, Selectors, useComponentDefaultProps } from '@mantine/core';
import dayjs from 'dayjs';
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

const defaultProps: Partial<MonthsGroupProps> = {
  amountOfMonths: 1,
};

export const MonthsGroup = forwardRef<HTMLDivElement, MonthsGroupProps>((props, ref) => {
  const { className, month, amountOfMonths, ...others } = useComponentDefaultProps(
    'MonthsGroup',
    defaultProps,
    props
  );
  const { classes, cx } = useStyles();
  const daysRefs = useRef<Record<string, HTMLButtonElement>>({});

  const months = Array(amountOfMonths)
    .fill(0)
    .map((_, monthIndex) => (
      <MonthLevel
        key={monthIndex}
        month={dayjs(month).add(monthIndex, 'months').toDate()}
        withNext={monthIndex === amountOfMonths - 1}
        withPrevious={monthIndex === 0}
        __getDayRef={(rowIndex, cellIndex, node) => {
          daysRefs.current[`${monthIndex}.${rowIndex}.${cellIndex}`] = node;
        }}
      />
    ));

  return (
    <Box className={cx(classes.monthsGroup, className)} ref={ref} {...others}>
      {months}
    </Box>
  );
});

MonthsGroup.displayName = '@mantine/dates/MonthsGroup';
