import React, { forwardRef } from 'react';
import { DefaultProps, Selectors, useComponentDefaultProps, Box } from '@mantine/core';
import type { FirstDayOfWeek } from '../types';
import { getWeekdayNames } from './get-weekdays-names/get-weekdays-names';
import useStyles from './WeekdaysRow.styles';

export type WeekdaysRowStylesNames = Selectors<typeof useStyles>;

export interface WeekdaysRowProps
  extends DefaultProps<WeekdaysRowStylesNames>,
    React.ComponentPropsWithoutRef<'tr'> {
  /** dayjs locale, defaults to en */
  locale?: string;

  /** number 0-6, 0 – Sunday, 6 – Saturday, defaults to 1 – Monday */
  firstDayOfWeek?: FirstDayOfWeek;

  /** dayjs format to get weekday name, defaults to "dd" */
  format?: string;

  /** Choose cell type that will be used to render weekdays, defaults to th */
  cellComponent?: 'td' | 'th';
}

const defaultProps: Partial<WeekdaysRowProps> = {
  locale: 'en',
  format: 'dd',
  cellComponent: 'th',
  firstDayOfWeek: 1,
};

export const WeekdaysRow = forwardRef<HTMLTableRowElement, WeekdaysRowProps>((props, ref) => {
  const {
    className,
    locale,
    firstDayOfWeek,
    format,
    cellComponent: CellComponent,
    ...others
  } = useComponentDefaultProps('WeekdaysRow', defaultProps, props);

  const { classes, cx } = useStyles(null);
  const weekdays = getWeekdayNames({ locale, format, firstDayOfWeek }).map((weekday, index) => (
    <CellComponent key={index} className={classes.weekday}>
      {weekday}
    </CellComponent>
  ));

  return (
    <Box component="tr" ref={ref} className={cx(classes.weekdaysRow, className)} {...others}>
      {weekdays}
    </Box>
  );
});

WeekdaysRow.displayName = '@mantine/dates/WeekdayRow';
