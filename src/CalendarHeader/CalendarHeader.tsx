import React, { forwardRef } from 'react';
import { DefaultProps, Selectors, Box, useComponentDefaultProps, ActionIcon } from '@mantine/core';
import { Chevron } from './Chevron';
import useStyles from './CalendarHeader.styles';

export type CalendarHeaderStylesNames = Selectors<typeof useStyles>;

export interface CalendarHeaderProps
  extends DefaultProps<CalendarHeaderStylesNames>,
    React.ComponentPropsWithoutRef<'div'> {
  /** Change next icon */
  nextIcon?: React.ReactNode;

  /** Change previous icon */
  previousIcon?: React.ReactNode;

  /** aria-label for next button */
  nextLabel?: string;

  /** aria-label for previous button */
  previousLabel?: string;
}

const defaultProps: Partial<CalendarHeaderProps> = {};

export const CalendarHeader = forwardRef<HTMLDivElement, CalendarHeaderProps>((props, ref) => {
  const { className, nextIcon, previousIcon, nextLabel, previousLabel, ...others } =
    useComponentDefaultProps('CalendarHeader', defaultProps, props);

  const { classes, cx } = useStyles();

  return (
    <Box className={cx(classes.calendarHeader, className)} ref={ref} {...others}>
      <ActionIcon
        className={classes.calendarHeaderControl}
        data-previous
        aria-label={previousLabel}
      >
        {previousIcon || (
          <Chevron
            className={classes.calendarHeaderControlIcon}
            direction="previous"
            data-previous
          />
        )}
      </ActionIcon>

      <ActionIcon className={classes.calendarHeaderControl} data-next aria-label={nextLabel}>
        {nextIcon || (
          <Chevron className={classes.calendarHeaderControlIcon} direction="next" data-next />
        )}
      </ActionIcon>
    </Box>
  );
});
