import React, { forwardRef } from 'react';
import {
  UnstyledButton,
  DefaultProps,
  useComponentDefaultProps,
  MantineNumberSize,
  Selectors,
} from '@mantine/core';
import useStyles, { DayStylesParams } from './Day.styles';

export type DayStylesNames = Selectors<typeof useStyles>;

export interface DayProps
  extends DefaultProps<DayStylesNames, DayStylesParams>,
    React.ComponentPropsWithoutRef<'button'> {
  __staticSelector?: string;

  /** Date that should be displayed */
  date: Date;

  /** Key of theme.radius or number to set border-radius in px */
  radius?: MantineNumberSize;
}

const defaultProps: Partial<DayProps> = {
  tabIndex: -1,
};

export const Day = forwardRef<HTMLButtonElement, DayProps>((props, ref) => {
  const {
    className,
    date,
    radius,
    disabled,
    styles,
    classNames,
    unstyled,
    __staticSelector,
    ...others
  } = useComponentDefaultProps('Day', defaultProps, props);

  const { classes, cx } = useStyles(
    { radius },
    { classNames, styles, unstyled, name: ['Day', __staticSelector] }
  );

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
