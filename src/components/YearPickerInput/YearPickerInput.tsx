import React, { forwardRef } from 'react';
import { useComponentDefaultProps } from '@mantine/core';
import { useDatesInput } from '../../__utils__/use-dates-input';
import { pickCalendarLevelsProps } from '../CalendarLevels';
import { YearPicker, YearPickerBaseProps } from '../YearPicker';
import { DatePickerType } from '../../types';
import { DateInputBase, DateInputSharedProps, DateInputBaseStylesNames } from '../DateInputBase';

export type YearPickerInputStylesNames = DateInputBaseStylesNames;

export interface YearPickerInputProps<Type extends DatePickerType = 'default'>
  extends DateInputSharedProps,
    YearPickerBaseProps<Type> {}

type YearPickerInputComponent = (<Type extends DatePickerType = 'default'>(
  props: YearPickerInputProps<Type>
) => JSX.Element) & { displayName?: string };

const defaultProps: Partial<YearPickerInputProps> = {
  type: 'default',
  yearsListFormat: 'YYYY',
  closeOnChange: true,
};

export const YearPickerInput: YearPickerInputComponent = forwardRef((props, ref) => {
  const {
    type,
    value,
    defaultValue,
    onChange,
    yearsListFormat,
    locale,
    classNames,
    styles,
    unstyled,
    ...rest
  } = useComponentDefaultProps('YearPickerInput', defaultProps, props);

  const { calendarLevelsProps, others } = pickCalendarLevelsProps(rest);

  const {
    _value,
    setValue,
    formattedValue,
    dropdownHandlers,
    dropdownOpened,
    onClear,
    shouldClear,
  } = useDatesInput({
    type,
    value,
    defaultValue,
    onChange,
    locale,
    format: yearsListFormat,
  });

  return (
    <DateInputBase
      formattedValue={formattedValue}
      dropdownOpened={dropdownOpened}
      dropdownHandlers={dropdownHandlers}
      classNames={classNames}
      styles={styles}
      unstyled={unstyled}
      __staticSelector="YearPickerInput"
      ref={ref}
      onClear={onClear}
      shouldClear={shouldClear}
      {...others}
    >
      <YearPicker
        {...calendarLevelsProps}
        type={type}
        value={_value}
        defaultDate={Array.isArray(_value) ? _value[0] || undefined : _value || undefined}
        onChange={setValue}
        yearsListFormat={yearsListFormat}
        locale={locale}
        classNames={classNames}
        styles={styles}
        unstyled={unstyled}
        __staticSelector="YearPickerInput"
      />
    </DateInputBase>
  );
});

YearPickerInput.displayName = '@mantine/dates/YearPickerInput';
