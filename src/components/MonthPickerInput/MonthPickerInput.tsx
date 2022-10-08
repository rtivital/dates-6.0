import React, { forwardRef } from 'react';
import { useComponentDefaultProps } from '@mantine/core';
import { useDatesInput } from '../../hooks';
import { pickCalendarLevelsProps } from '../CalendarLevels';
import { MonthPicker, MonthPickerBaseProps } from '../MonthPicker';
import { DatePickerType } from '../../types';
import { DateInputBase, DateInputSharedProps, DateInputBaseStylesNames } from '../DateInputBase';

export type MonthPickerInputStylesNames = DateInputBaseStylesNames;

export interface MonthPickerInputProps<Type extends DatePickerType = 'default'>
  extends DateInputSharedProps,
    MonthPickerBaseProps<Type> {
  /** Dayjs format to display input value, "MMMM YYYY" by default  */
  valueFormat?: string;
}

type MonthPickerInputComponent = (<Type extends DatePickerType = 'default'>(
  props: MonthPickerInputProps<Type>
) => JSX.Element) & { displayName?: string };

const defaultProps: Partial<MonthPickerInputProps> = {
  type: 'default',
  valueFormat: 'MMMM YYYY',
  closeOnChange: true,
};

export const MonthPickerInput: MonthPickerInputComponent = forwardRef((props, ref) => {
  const {
    type,
    value,
    defaultValue,
    onChange,
    valueFormat,
    locale,
    classNames,
    styles,
    unstyled,
    closeOnChange,
    ...rest
  } = useComponentDefaultProps('MonthPickerInput', defaultProps, props);

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
    format: valueFormat,
    closeOnChange,
  });

  return (
    <DateInputBase
      formattedValue={formattedValue}
      dropdownOpened={dropdownOpened}
      dropdownHandlers={dropdownHandlers}
      classNames={classNames}
      styles={styles}
      unstyled={unstyled}
      __staticSelector="MonthPickerInput"
      ref={ref}
      onClear={onClear}
      shouldClear={shouldClear}
      {...others}
    >
      <MonthPicker
        {...calendarLevelsProps}
        type={type}
        value={_value}
        defaultDate={Array.isArray(_value) ? _value[0] || undefined : _value || undefined}
        onChange={setValue}
        locale={locale}
        classNames={classNames}
        styles={styles}
        unstyled={unstyled}
        __staticSelector="MonthPickerInput"
      />
    </DateInputBase>
  );
});

MonthPickerInput.displayName = '@mantine/dates/MonthPickerInput';
