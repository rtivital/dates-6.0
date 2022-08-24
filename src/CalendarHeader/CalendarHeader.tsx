import React, { forwardRef } from 'react';
import {
  DefaultProps,
  Selectors,
  Box,
  useComponentDefaultProps,
  UnstyledButton,
} from '@mantine/core';
import { Chevron } from './Chevron';
import useStyles from './CalendarHeader.styles';

export type CalendarHeaderStylesNames = Selectors<typeof useStyles>;

export interface CalendarHeaderProps
  extends DefaultProps<CalendarHeaderStylesNames>,
    React.ComponentPropsWithoutRef<'div'> {
  __staticSelector?: string;
  __preventFocus?: boolean;

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

  /** Called when level button is clicked */
  onLevelChange?(): void;

  /** Label displayed between next and previous buttons */
  label: React.ReactNode;

  /** Determines whether next control should be visible, defaults to true */
  hasNext?: boolean;

  /** Determines whether previous control should be visible, defaults to true */
  hasPrevious?: boolean;

  /** Determines whether next level button should be enabled, defaults to true */
  hasNextLevel?: boolean;
}

const defaultProps: Partial<CalendarHeaderProps> = {
  hasNext: true,
  hasPrevious: true,
  hasNextLevel: true,
};

export const CalendarHeader = forwardRef<HTMLDivElement, CalendarHeaderProps>((props, ref) => {
  const {
    className,
    nextIcon,
    previousIcon,
    nextLabel,
    previousLabel,
    onNext,
    onPrevious,
    onLevelChange,
    label,
    classNames,
    styles,
    unstyled,
    hasNext,
    hasPrevious,
    hasNextLevel,
    __staticSelector,
    __preventFocus,
    ...others
  } = useComponentDefaultProps('CalendarHeader', defaultProps, props);

  const { classes, cx } = useStyles(null, {
    name: ['CalendarHeader', __staticSelector],
    classNames,
    styles,
    unstyled,
  });

  const preventFocus = __preventFocus
    ? (event: React.MouseEvent<HTMLElement>) => event.preventDefault()
    : undefined;

  return (
    <Box className={cx(classes.calendarHeader, className)} ref={ref} {...others}>
      <UnstyledButton
        className={classes.calendarHeaderControl}
        data-previous
        aria-label={previousLabel}
        onClick={onPrevious}
        unstyled={unstyled}
        onMouseDown={preventFocus}
        disabled={!hasPrevious}
        data-disabled={!hasPrevious || undefined}
      >
        {previousIcon || (
          <Chevron
            className={classes.calendarHeaderControlIcon}
            direction="previous"
            data-previous
          />
        )}
      </UnstyledButton>

      <UnstyledButton
        component={hasNextLevel ? 'button' : 'div'}
        className={classes.calendarHeaderLevel}
        onClick={hasNextLevel ? onLevelChange : undefined}
        unstyled={unstyled}
        onMouseDown={hasNextLevel ? preventFocus : undefined}
        disabled={!hasNextLevel}
        data-static={!hasNextLevel || undefined}
      >
        {label}
      </UnstyledButton>

      <UnstyledButton
        className={classes.calendarHeaderControl}
        data-next
        aria-label={nextLabel}
        onClick={onNext}
        unstyled={unstyled}
        onMouseDown={preventFocus}
        disabled={!hasNext}
        data-disabled={!hasNext || undefined}
      >
        {nextIcon || (
          <Chevron className={classes.calendarHeaderControlIcon} direction="next" data-next />
        )}
      </UnstyledButton>
    </Box>
  );
});
