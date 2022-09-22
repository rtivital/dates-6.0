/* eslint-disable react/no-unused-prop-types */
import dayjs from 'dayjs';
import React, { forwardRef } from 'react';
import { Box, DefaultProps, Selectors, useComponentDefaultProps } from '@mantine/core';
import { useUncontrolled } from '@mantine/hooks';
import { MonthLevelGroup } from '../MonthLevelGroup';
import { MonthSettings } from '../Month';
import { YearLevelGroup } from '../YearLevelGroup';
import { MonthsListSettings } from '../MonthsList';
import { DecadeLevelGroup } from '../DecadeLevelGroup';
import { YearsListSettings } from '../YearsList';
import { CalendarLevel } from '../types';
import { getInitialLevel } from './get-initial-level/get-initial-level';
import useStyles from './CalendarLevels.styles';

export type CalendarLevelsStylesNames = Selectors<typeof useStyles>;

export interface CalendarLevelSettings
  extends YearsListSettings,
    MonthsListSettings,
    MonthSettings {
  /** Max level that user can go up to (decade, year, month), defaults to decade */
  maxLevel?: CalendarLevel;

  /** Min level that user can go down to (decade, year, month), defaults to month */
  minLevel?: CalendarLevel;
}

export interface CalendarLevelsProps
  extends DefaultProps<CalendarLevelsStylesNames>,
    CalendarLevelSettings,
    React.ComponentPropsWithoutRef<'div'> {
  __staticSelector?: string;

  /** Initial date that is displayed, used for uncontrolled component */
  defaultDate?: Date;

  /** Date that is displayed, used for controlled component */
  date?: Date;

  /** Called when date changes */
  onDateChange?(date: Date): void;

  /** Initial level displayed to the user (decade, year, month), used for uncontrolled component */
  defaultLevel?: CalendarLevel;

  /** Current level displayed to the user (decade, year, month), used for controlled component */
  level?: CalendarLevel;

  /** Called when level changes */
  onLevelChange?(level: CalendarLevel): void;
}

const defaultProps: Partial<CalendarLevelsProps> = {
  maxLevel: 'decade',
  minLevel: 'month',
};

export const CalendarLevels = forwardRef<HTMLDivElement, CalendarLevelsProps>((props, ref) => {
  const {
    // CalendarLevel props
    maxLevel,
    minLevel,
    defaultLevel,
    level,
    onLevelChange,
    date,
    defaultDate,
    onDateChange,

    // MonthLevelGroup props
    firstDayOfWeek,
    weekdayFormat,
    weekendDays,
    getDayProps,
    excludeDate,
    renderDay,
    hideOutsideDates,
    hideWeekdays,
    getDayAriaLabel,

    // YearLevelGroup props
    monthsListFormat,
    getMonthControlProps,

    // DecadeLevelGroup props
    yearsListFormat,
    getYearControlProps,

    // Other props
    minDate,
    maxDate,
    locale,
    className,
    classNames,
    styles,
    __staticSelector,
    unstyled,
    ...others
  } = useComponentDefaultProps('CalendarLevels', defaultProps, props);

  const { classes, cx } = useStyles(null, {
    classNames,
    styles,
    unstyled,
    name: ['CalendarLevels', __staticSelector],
  });

  const [_level, setLevel] = useUncontrolled({
    value: level ? getInitialLevel(level, minLevel, maxLevel) : undefined,
    defaultValue: defaultLevel ? getInitialLevel(defaultLevel, minLevel, maxLevel) : undefined,
    finalValue: getInitialLevel(undefined, minLevel, maxLevel),
    onChange: onLevelChange,
  });

  const [_date, setDate] = useUncontrolled({
    value: date,
    defaultValue: defaultDate,
    finalValue: new Date(),
    onChange: onDateChange,
  });

  return (
    <Box className={cx(classes.calendarLevels, className)} ref={ref} {...others}>
      {_level === 'month' && (
        <MonthLevelGroup
          month={_date}
          minDate={minDate}
          maxDate={maxDate}
          firstDayOfWeek={firstDayOfWeek}
          weekdayFormat={weekdayFormat}
          weekendDays={weekendDays}
          getDayProps={getDayProps}
          excludeDate={excludeDate}
          renderDay={renderDay}
          hideOutsideDates={hideOutsideDates}
          hideWeekdays={hideWeekdays}
          getDayAriaLabel={getDayAriaLabel}
          onNext={() => setDate(dayjs(_date).add(1, 'month').toDate())}
          onPrevious={() => setDate(dayjs(_date).subtract(1, 'month').toDate())}
          hasNextLevel={maxLevel !== 'month'}
          onLevelChange={() => setLevel('year')}
        />
      )}

      {_level === 'year' && (
        <YearLevelGroup
          year={_date}
          minDate={minDate}
          maxDate={maxDate}
          monthsListFormat={monthsListFormat}
          getMonthControlProps={getMonthControlProps}
          locale={locale}
          onNext={() => setDate(dayjs(_date).add(1, 'year').toDate())}
          onPrevious={() => setDate(dayjs(_date).subtract(1, 'year').toDate())}
          hasNextLevel={maxLevel !== 'month' && maxLevel !== 'year'}
          onLevelChange={() => setLevel('decade')}
        />
      )}

      {_level === 'decade' && (
        <DecadeLevelGroup
          decade={_date}
          minDate={minDate}
          maxDate={maxDate}
          yearsListFormat={yearsListFormat}
          getYearControlProps={getYearControlProps}
          locale={locale}
          onNext={() => setDate(dayjs(_date).add(10, 'year').toDate())}
          onPrevious={() => setDate(dayjs(_date).subtract(10, 'year').toDate())}
          hasNextLevel={false}
        />
      )}
    </Box>
  );
});

CalendarLevels.displayName = '@mantine/dates/CalendarLevels';
