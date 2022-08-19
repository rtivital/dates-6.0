import React, { forwardRef } from 'react';
import {
  UnstyledButton,
  DefaultProps,
  useComponentDefaultProps,
  MantineNumberSize,
} from '@mantine/core';
import useStyles from './Day.styles';

export interface DayProps extends DefaultProps, React.ComponentPropsWithoutRef<'button'> {
  /** Date that should be displayed */
  date: Date;

  /** Key of theme.radius or number to set border-radius in px */
  radius?: MantineNumberSize;
}

const defaultProps: Partial<DayProps> = {
  tabIndex: -1,
};

export const Day = forwardRef<HTMLButtonElement, DayProps>((props, ref) => {
  const { className, date, radius, disabled, ...others } = useComponentDefaultProps(
    'Day',
    defaultProps,
    props
  );

  const { classes, cx } = useStyles({ radius });

  return (
    <UnstyledButton
      type="button"
      ref={ref}
      className={cx(classes.day, className)}
      data-disabled={disabled || undefined}
      disabled={disabled}
      {...others}
    >
      {date.getDate()}
    </UnstyledButton>
  );
});
