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

  /** Called when next button is clicked */
  onNext?(): void;

  /** Called when previous button is clicked */
  onPrevious?(): void;
}

const defaultProps: Partial<CalendarHeaderProps> = {};

export const CalendarHeader = forwardRef<HTMLDivElement, CalendarHeaderProps>((props, ref) => {
  const {
    className,
    nextIcon,
    previousIcon,
    nextLabel,
    previousLabel,
    onNext,
    onPrevious,
    ...others
  } = useComponentDefaultProps('CalendarHeader', defaultProps, props);

  const { classes, cx } = useStyles();

  return (
    <Box className={cx(classes.calendarHeader, className)} ref={ref} {...others}>
      <ActionIcon
        className={classes.calendarHeaderControl}
        data-previous
        aria-label={previousLabel}
        onClick={onPrevious}
      >
        {previousIcon || (
          <Chevron
            className={classes.calendarHeaderControlIcon}
            direction="previous"
            data-previous
          />
        )}
      </ActionIcon>

      <ActionIcon
        className={classes.calendarHeaderControl}
        data-next
        aria-label={nextLabel}
        onClick={onNext}
      >
        {nextIcon || (
          <Chevron className={classes.calendarHeaderControlIcon} direction="next" data-next />
        )}
      </ActionIcon>
    </Box>
  );
});
