import React, { forwardRef } from 'react';
import { Input, useInputProps, InputSharedProps, InputWrapperBaseProps } from '@mantine/core';
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
};

export const YearPickerInput: YearPickerInputComponent = forwardRef((props, ref) => {
  const { inputProps, wrapperProps, type, ...others } = useInputProps(
    'YearPickerInput',
    defaultProps,
    props
  );

  return (
    <Input.Wrapper {...wrapperProps}>
      <Input component="button" {...inputProps} {...others} ref={ref} />
    </Input.Wrapper>
  );
});

YearPickerInput.displayName = '@mantine/dates/YearPickerInput';
