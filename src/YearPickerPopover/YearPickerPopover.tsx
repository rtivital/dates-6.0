import React from 'react';
import {
  Popover,
  PopoverStylesNames,
  DefaultProps,
  useComponentDefaultProps,
  PopoverDropdownProps,
} from '@mantine/core';
import { createSafeContext } from '@mantine/utils';
import { CalendarLevelsStylesNames } from '../CalendarLevels';
import { YearPicker, YearPickerProps } from '../YearPicker';
import { DatesPopoverProps, DatePickerType } from '../types';

export type YearPickerPopoverStylesNames = CalendarLevelsStylesNames | PopoverStylesNames;

export interface YearPickerPopoverProps<Type extends DatePickerType = 'default'>
  extends DefaultProps<YearPickerPopoverStylesNames>,
    Omit<YearPickerProps<Type>, 'classNames' | 'styles'> {
  /** Popover component props */
  popoverProps?: DatesPopoverProps;
}

const [YearPickerPopoverProvider, useYearPickerPopoverContext] = createSafeContext<
  Omit<YearPickerPopoverProps, 'children' | 'popoverProps'>
>('YearPickerPopover component was not found in the tree');

const defaultProps: YearPickerPopoverProps = {
  type: 'default',
};

export function YearPickerPopover<Type extends DatePickerType = 'default'>(
  props: YearPickerPopoverProps<Type>
) {
  const { popoverProps, children, ...others } = useComponentDefaultProps(
    'YearPickerPopover',
    defaultProps as any,
    props
  );

  return (
    <YearPickerPopoverProvider value={others as any}>
      <Popover {...popoverProps}>{children}</Popover>
    </YearPickerPopoverProvider>
  );
}

function YearPickerPopoverDropdown(props: PopoverDropdownProps) {
  const ctx = useYearPickerPopoverContext();
  return (
    <Popover.Dropdown {...props}>
      <YearPicker {...ctx} />
    </Popover.Dropdown>
  );
}

YearPickerPopover.Target = Popover.Target;
YearPickerPopover.Dropdown = YearPickerPopoverDropdown;
YearPickerPopover.displayName = '@mantine/dates/YearPickerPopover';
YearPickerPopoverDropdown.displayName = '@mantine/dates/YearPickerPopoverDropdown';
