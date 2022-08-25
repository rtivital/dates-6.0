import React, { forwardRef } from 'react';
import { DefaultProps, Selectors, useComponentDefaultProps, Box } from '@mantine/core';
import type { FirstDayOfWeek } from '../types';
import { getWeekdayNames } from './get-weekdays-names/get-weekdays-names';
import useStyles from './WeekdaysRow.styles';

export type WeekdaysRowStylesNames = Selectors<typeof useStyles>;

export interface WeekdaysRowProps
  extends DefaultProps<WeekdaysRowStylesNames>,
    React.ComponentPropsWithoutRef<'tr'> {
  __staticSelector?: string;

  /** dayjs locale, defaults to theme.datesLocale */
  locale?: string;

  /** number 0-6, 0 – Sunday, 6 – Saturday, defaults to 1 – Monday */
  firstDayOfWeek?: FirstDayOfWeek;

  /** dayjs format to get weekday name, defaults to "dd" */
  weekdayFormat?: string;

  /** Choose cell type that will be used to render weekdays, defaults to th */
  cellComponent?: 'td' | 'th';
}

const defaultProps: Partial<WeekdaysRowProps> = {
  weekdayFormat: 'dd',
  cellComponent: 'th',
  firstDayOfWeek: 1,
};

export const WeekdaysRow = forwardRef<HTMLTableRowElement, WeekdaysRowProps>((props, ref) => {
  const {
    className,
    locale,
    firstDayOfWeek,
    weekdayFormat,
    cellComponent: CellComponent,
    __staticSelector,
    classNames,
    styles,
    unstyled,
    ...others
  } = useComponentDefaultProps('WeekdaysRow', defaultProps, props);

  const { classes, cx, theme } = useStyles(null, {
    classNames,
    styles,
    unstyled,
    name: ['WeekdaysRow', __staticSelector],
  });

  const weekdays = getWeekdayNames({
    locale: locale || theme.datesLocale,
    format: weekdayFormat,
    firstDayOfWeek,
  }).map((weekday, index) => (
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
