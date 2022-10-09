import dayjs from 'dayjs';
import React, { forwardRef, useState } from 'react';
import {
  DefaultProps,
  InputSharedProps,
  InputWrapperBaseProps,
  InputStylesNames,
  InputWrapperStylesNames,
  useInputProps,
  Input,
  PopoverProps,
  Popover,
  CloseButton,
} from '@mantine/core';
import { useUncontrolled, useDidUpdate } from '@mantine/hooks';
import { Calendar, CalendarBaseProps, CalendarStylesNames, pickCalendarProps } from '../Calendar';
import { DecadeLevelSettings } from '../DecadeLevel';
import { YearLevelSettings } from '../YearLevel';
import { MonthLevelSettings } from '../MonthLevel';
import { HiddenDatesInput } from '../HiddenDatesInput';
import { DateValue } from '../../types';
import { useDatesContext } from '../DatesProvider';
import { isDateValid } from './is-date-valid/is-date-valid';

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

  /** Dayjs format to display input value, "MMMM D, YYYY" by default  */
  valueFormat?: string;

  /** Determines whether input value should be reverted to last known valid value on blur, true by default */
  fixOnBlur?: boolean;

  /** Determines whether value can be deselected when the user clicks on the selected date in the calendar or erases content of the input, true if clearable prop is set, false by default */
  allowDeselect?: boolean;
}

const defaultProps: Partial<DateInputProps> = {
  valueFormat: 'MMMM D, YYYY',
  fixOnBlur: true,
};

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
    locale,
    valueFormat,
    dateParser,
    minDate,
    maxDate,
    fixOnBlur,
    onFocus,
    onBlur,
    onClick,
    readOnly,
    name,
    form,
    rightSection,
    unstyled,
    classNames,
    styles,
    allowDeselect,
    ...rest
  } = useInputProps('DateInput', defaultProps, props);
  const { calendarProps, others } = pickCalendarProps(rest);
  const ctx = useDatesContext();
  const defaultDateParser = (val: string) =>
    dayjs(val, valueFormat, ctx.getLocale(locale)).toDate();

  const _dateParser = dateParser || defaultDateParser;
  const _allowDeselect = clearable || allowDeselect;

  const [_value, setValue] = useUncontrolled({
    value,
    defaultValue,
    finalValue: null,
    onChange,
  });

  const formatValue = (val: Date) =>
    val ? dayjs(val).locale(ctx.getLocale(locale)).format(valueFormat) : '';

  const [inputValue, setInputValue] = useState(formatValue(_value));
  const [inputFocused, setInputFocused] = useState(false);
  const [dropdownOpened, setDropdownOpened] = useState(false);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const val = event.currentTarget.value;
    setInputValue(val);

    if (val.trim() === '' && _allowDeselect) {
      setValue(null);
    } else {
      const dateValue = _dateParser(val);
      isDateValid({ date: dateValue, minDate, maxDate }) && setValue(dateValue);
    }
  };

  const handleInputBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    onBlur?.(event);
    setInputFocused(false);
    setDropdownOpened(false);
    fixOnBlur && setInputValue(formatValue(_value));
  };

  const handleInputFocus = (event: React.FocusEvent<HTMLInputElement>) => {
    onFocus?.(event);
    setInputFocused(true);
    setDropdownOpened(true);
  };

  const handleInputClick = (event: React.MouseEvent<HTMLInputElement>) => {
    onClick?.(event);
    setDropdownOpened(true);
  };

  const _rightSection =
    rightSection ||
    (clearable && _value && !readOnly ? (
      <CloseButton
        variant="transparent"
        onMouseDown={(event) => event.preventDefault()}
        onClick={() => {
          setValue(null);
          setInputValue('');
        }}
        unstyled={unstyled}
        {...clearButtonProps}
      />
    ) : null);

  useDidUpdate(() => {
    !inputFocused && value && setInputValue(formatValue(value));
  }, [value, inputFocused]);

  return (
    <>
      <Input.Wrapper {...wrapperProps}>
        <Popover
          opened={dropdownOpened}
          trapFocus={false}
          position="bottom-start"
          disabled={readOnly}
          {...popoverProps}
        >
          <Popover.Target>
            <Input
              data-dates-input
              data-read-only={readOnly || undefined}
              autoComplete="off"
              ref={ref}
              value={inputValue}
              onChange={handleInputChange}
              onBlur={handleInputBlur}
              onFocus={handleInputFocus}
              onClick={handleInputClick}
              readOnly={readOnly}
              rightSection={_rightSection}
              {...inputProps}
              {...others}
            />
          </Popover.Target>
          <Popover.Dropdown onMouseDown={(event) => event.preventDefault()} data-dates-dropdown>
            <Calendar
              {...calendarProps}
              classNames={classNames}
              styles={styles}
              unstyled={unstyled}
              __preventFocus
              minDate={minDate}
              maxDate={maxDate}
              locale={locale}
              defaultDate={_value || undefined}
              getDayProps={(date) => ({
                ...getDayProps?.(date),
                selected: dayjs(_value).isSame(date, 'day'),
                onClick: () => {
                  const val = _allowDeselect
                    ? dayjs(_value).isSame(date, 'day')
                      ? null
                      : date
                    : date;
                  setValue(val);
                  setInputValue(formatValue(val));
                  setDropdownOpened(false);
                },
              })}
            />
          </Popover.Dropdown>
        </Popover>
      </Input.Wrapper>
      <HiddenDatesInput name={name} form={form} value={_value} type="default" />
    </>
  );
});
