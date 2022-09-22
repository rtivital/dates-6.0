/* eslint-disable react/no-unused-prop-types */
import React, { forwardRef } from 'react';
import { Box, DefaultProps, Selectors, useComponentDefaultProps } from '@mantine/core';
import { useUncontrolled } from '@mantine/hooks';
import { getInitialLevel } from './get-initial-level/get-initial-level';
import useStyles from './CalendarLevels.styles';

export type CalendarLevelsStylesNames = Selectors<typeof useStyles>;
export type CalendarLevel = 'decade' | 'year' | 'month';

export interface CalendarLevelsProps
  extends DefaultProps<CalendarLevelsStylesNames>,
    React.ComponentPropsWithoutRef<'div'> {
  __staticSelector?: string;

  /** Max level that user can go up to (decade, year, month), defaults to decade */
  maxLevel?: CalendarLevel;

  /** Min level that user can go down to (decade, year, month), defaults to month */
  minLevel?: CalendarLevel;

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

    // Other props
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
    value: getInitialLevel(level, minLevel, maxLevel),
    defaultValue: getInitialLevel(defaultLevel, minLevel, maxLevel),
    finalValue: getInitialLevel(undefined, minLevel, maxLevel),
    onChange: onLevelChange,
  });

  return (
    <Box className={cx(classes.calendarLevels, className)} ref={ref} {...others}>
      Levels
    </Box>
  );
});

CalendarLevels.displayName = '@mantine/dates/CalendarLevels';
