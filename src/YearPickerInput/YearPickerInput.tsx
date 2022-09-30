import React, { forwardRef } from 'react';
import {
  Input,
  useInputProps,
  InputSharedProps,
  InputWrapperBaseProps,
  DefaultProps,
  Selectors,
} from '@mantine/core';
import { useDatesInput } from '../__utils__/use-dates-input';
import { pickCalendarLevelsProps, CalendarLevelsStylesNames } from '../CalendarLevels';
import { YearPicker, YearPickerBaseProps } from '../YearPicker';
import { DatePickerType } from '../types';
import useStyles from './YearPickerInput.styles';

export type YearPickerInputStylesNames = CalendarLevelsStylesNames | Selectors<typeof useStyles>;

export interface YearPickerInputProps<Type extends DatePickerType = 'default'>
  extends DefaultProps<YearPickerInputStylesNames>,
    InputSharedProps,
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
    placeholder,
    classNames,
    styles,
    unstyled,
    ...rest
  } = useInputProps('YearPickerInput', defaultProps, props);

  const { classes } = useStyles(null, { classNames, styles, unstyled, name: 'YearPickerInput' });
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
    <Input.Wrapper __staticSelector="YearPickerInput" {...wrapperProps}>
      <Input
        component="button"
        __staticSelector="YearPickerInput"
        {...inputProps}
        {...others}
        ref={ref}
      >
        {formattedValue || <div className={classes.placeholder}>{placeholder}</div>}
      </Input>
      <YearPicker
        {...calendarLevelsProps}
        type={type}
        value={_value}
        onChange={setValue}
        yearsListFormat={yearsListFormat}
        locale={locale}
        classNames={classNames}
        styles={styles}
        unstyled={unstyled}
        __staticSelector="YearPickerInput"
      />
    </Input.Wrapper>
  );
});

YearPickerInput.displayName = '@mantine/dates/YearPickerInput';
