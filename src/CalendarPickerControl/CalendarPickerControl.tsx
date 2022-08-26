/* eslint-disable react/no-unused-prop-types */
import React, { forwardRef } from 'react';
import { DefaultProps, UnstyledButton, Selectors, useComponentDefaultProps } from '@mantine/core';
import useStyles from './CalendarPickerControl.styles';

export type CalendarPickerControlStylesNames = Selectors<typeof useStyles>;

export interface CalendarPickerControlProps
  extends DefaultProps<CalendarPickerControlStylesNames>,
    React.ComponentPropsWithoutRef<'button'> {
  __staticSelector?: string;

  /** Control children */
  children?: React.ReactNode;

  /** Determines whether control should be disabled */
  disabled?: boolean;

  /** Determines whether control should have selected styles */
  selected?: boolean;
}

const defaultProps: Partial<CalendarPickerControlProps> = {};

export const CalendarPickerControl = forwardRef<HTMLButtonElement, CalendarPickerControlProps>(
  (props, ref) => {
    const {
      className,
      children,
      disabled,
      selected,
      classNames,
      styles,
      unstyled,
      __staticSelector,
      ...others
    } = useComponentDefaultProps('CalendarPickerControl', defaultProps, props);

    const { classes, cx } = useStyles(null, {
      name: ['CalendarPickerControl', __staticSelector],
      classNames,
      styles,
      unstyled,
    });

    return (
      <UnstyledButton
        className={cx(classes.calendarPickerControl, className)}
        ref={ref}
        unstyled={unstyled}
        data-selected={(selected && !disabled) || undefined}
        data-disabled={disabled || undefined}
        disabled={disabled}
        {...others}
      >
        {children}
      </UnstyledButton>
    );
  }
);

CalendarPickerControl.displayName = '@mantine/dates/CalendarPickerControl';
