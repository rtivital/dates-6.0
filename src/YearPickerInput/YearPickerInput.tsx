import React, { forwardRef } from 'react';
import { Input, useInputProps, InputSharedProps, InputWrapperBaseProps } from '@mantine/core';
import { useDatesInput } from '../__utils__/use-dates-input';
import { pickCalendarLevelsProps } from '../CalendarLevels';
import { YearPicker, YearPickerBaseProps } from '../YearPicker';
import { DatePickerType } from '../types';

export interface YearPickerInputProps<Type extends DatePickerType = 'default'>
  extends InputSharedProps,
    InputWrapperBaseProps,
    YearPickerBaseProps<Type>,
    Omit<React.ComponentPropsWithRef<'button'>, 'defaultValue' | 'value' | 'onChange' | 'type'> {}

type YearPickerInputComponent = (<Type extends DatePickerType = 'default'>(
  props: YearPickerInputProps<Type>
) => JSX.Element) & { displayName?: string };

const defaultProps: YearPickerInputProps = {
  type: 'default',
  yearsListFormat: 'YYYY',
};

export const YearPickerInput: YearPickerInputComponent = forwardRef((props, ref) => {
  const {
    inputProps,
    wrapperProps,
    type,
    value,
    defaultValue,
    onChange,
    yearsListFormat,
    locale,
    ...rest
  } = useInputProps('YearPickerInput', defaultProps, props);

  const { calendarLevelsProps, others } = pickCalendarLevelsProps(rest);

  const { _value, setValue, formattedValue } = useDatesInput({
    type,
    value,
    defaultValue,
    onChange,
    locale,
    format: yearsListFormat,
  });

  return (
    <Input.Wrapper {...wrapperProps}>
      <Input component="button" {...inputProps} {...others} ref={ref}>
        {formattedValue}
      </Input>
      <YearPicker
        {...calendarLevelsProps}
        type={type}
        value={_value}
        onChange={setValue}
        yearsListFormat={yearsListFormat}
        locale={locale}
      />
    </Input.Wrapper>
  );
});

YearPickerInput.displayName = '@mantine/dates/YearPickerInput';
