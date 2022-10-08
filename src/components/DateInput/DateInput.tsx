import React, { forwardRef } from 'react';
import {
  DefaultProps,
  InputSharedProps,
  InputWrapperBaseProps,
  InputStylesNames,
  InputWrapperStylesNames,
  useInputProps,
  Input,
  PopoverProps,
} from '@mantine/core';
import { useUncontrolled } from '@mantine/hooks';
import dayjs from 'dayjs';
import { Calendar, CalendarBaseProps, CalendarStylesNames, pickCalendarProps } from '../Calendar';
import { DecadeLevelSettings } from '../DecadeLevel';
import { YearLevelSettings } from '../YearLevel';
import { MonthLevelSettings } from '../MonthLevel';
import { DateValue } from '../../types';

export type DateInputStylesNames = CalendarStylesNames | InputStylesNames | InputWrapperStylesNames;

export interface DateInputProps
  extends DefaultProps<DateInputStylesNames>,
    InputSharedProps,
    InputWrapperBaseProps,
    CalendarBaseProps,
    DecadeLevelSettings,
    YearLevelSettings,
    MonthLevelSettings,
    Omit<React.ComponentPropsWithoutRef<'input'>, 'size' | 'value' | 'defaultValue' | 'onChange'> {
  /** Parses user input to convert it to Date object */
  dateParser?: (value: string) => Date;

  /** Value for controlled component */
  value?: DateValue;

  /** Default value for uncontrolled component */
  defaultValue?: DateValue;

  /** Called when value changes */
  onChange?(value: DateValue): void;

  /** Props added to Popover component */
  popoverProps?: Partial<Omit<PopoverProps, 'children'>>;

  /** Determines whether input value can be cleared, adds clear button to right section, false by default */
  clearable?: boolean;

  /** Props added to clear button */
  clearButtonProps?: React.ComponentPropsWithoutRef<'button'>;
}

const defaultProps: Partial<DateInputProps> = {};

export const DateInput = forwardRef<HTMLInputElement, DateInputProps>((props, ref) => {
  const {
    inputProps,
    wrapperProps,
    value,
    defaultValue,
    onChange,
    clearable,
    clearButtonProps,
    popoverProps,
    getDayProps,
    ...rest
  } = useInputProps('DateInput', defaultProps, props);
  const { calendarProps, others } = pickCalendarProps(rest);

  const [_value, setValue] = useUncontrolled({
    value,
    defaultValue,
    finalValue: null,
    onChange,
  });

  return (
    <Input.Wrapper {...wrapperProps}>
      <Input {...inputProps} {...others} ref={ref} />
      <Calendar
        {...calendarProps}
        getDayProps={(date) => ({
          ...getDayProps?.(date),
          selected: dayjs(_value).isSame(date, 'day'),
          onClick: () => setValue(date),
        })}
      />
    </Input.Wrapper>
  );
});
