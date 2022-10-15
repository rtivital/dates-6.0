import dayjs from 'dayjs';
import React, { forwardRef } from 'react';
import {
  useComponentDefaultProps,
  CheckIcon,
  ActionIcon,
  ActionIconProps,
  Selectors,
  DefaultProps,
} from '@mantine/core';
import { useDisclosure, useUncontrolled } from '@mantine/hooks';
import { TimeInput, TimeInputProps } from '../TimeInput';
import { pickCalendarProps, CalendarBaseProps } from '../Calendar';
import { DatePicker } from '../DatePicker';
import { DecadeLevelSettings } from '../DecadeLevel';
import { YearLevelSettings } from '../YearLevel';
import { MonthLevelSettings } from '../MonthLevel';
import {
  PickerInputBase,
  DateInputSharedProps,
  PickerInputBaseStylesNames,
} from '../PickerInputBase';
import { DateValue } from '../../types';
import { useDatesContext } from '../DatesProvider';
import useStyles from './DateTimePicker.styles';

export type DateTimePickerStylesNames = PickerInputBaseStylesNames | Selectors<typeof useStyles>;

export interface DateTimePickerProps
  extends DefaultProps<DateTimePickerStylesNames>,
    Omit<DateInputSharedProps, 'classNames' | 'styles'>,
    CalendarBaseProps,
    DecadeLevelSettings,
    YearLevelSettings,
    MonthLevelSettings {
  /** Dayjs format to display input value, "DD/MM/YYYY HH:mm" by default  */
  valueFormat?: string;

  /** Controlled component value */
  value?: DateValue;

  /** Default value for uncontrolled component */
  defaultValue?: DateValue;

  /** Called when value changes */
  onChange?(value: DateValue): void;

  /** TimeInput component props */
  timeInputProps?: TimeInputProps;

  /** Props added to submit button */
  submitButtonProps?: ActionIconProps & React.ComponentPropsWithoutRef<'button'>;
}

const defaultProps: Partial<DateTimePickerProps> = {
  valueFormat: 'DD/MM/YYYY HH:mm',
  closeOnChange: true,
};

export const DateTimePicker = forwardRef<HTMLButtonElement, DateTimePickerProps>((props, ref) => {
  const {
    value,
    defaultValue,
    onChange,
    valueFormat,
    locale,
    classNames,
    styles,
    unstyled,
    closeOnChange,
    timeInputProps,
    submitButtonProps,
    ...rest
  } = useComponentDefaultProps('DateTimePicker', defaultProps, props);

  const { classes, cx } = useStyles(null, { name: 'DateTimePicker', classNames, styles, unstyled });

  const {
    calendarProps: { allowSingleDateInRange, ...calendarProps },
    others,
  } = pickCalendarProps(rest);

  const ctx = useDatesContext();
  const [_value, setValue] = useUncontrolled({
    value,
    defaultValue,
    finalValue: null,
    onChange,
  });

  const [dropdownOpened, dropdownHandlers] = useDisclosure(false);
  const formattedValue = _value
    ? dayjs(_value).locale(ctx.getLocale(locale)).format(valueFormat)
    : '';

  const handleClear = () => setValue(null);
  const shouldClear = !!_value;

  return (
    <PickerInputBase
      formattedValue={formattedValue}
      dropdownOpened={dropdownOpened}
      dropdownHandlers={dropdownHandlers}
      classNames={classNames}
      styles={styles}
      unstyled={unstyled}
      __staticSelector="DateTimePicker"
      ref={ref}
      onClear={handleClear}
      shouldClear={shouldClear}
      value={_value}
      type="default"
      {...others}
    >
      <DatePicker
        {...calendarProps}
        type="default"
        value={_value}
        defaultDate={_value}
        onChange={setValue}
        locale={locale}
        classNames={classNames}
        styles={styles}
        unstyled={unstyled}
        __staticSelector="DateTimePicker"
      />

      <div className={classes.timeWrapper}>
        <TimeInput
          className={cx(classes.timeInput, timeInputProps?.className)}
          {...timeInputProps}
        />
        <ActionIcon variant="default" size={36} {...submitButtonProps}>
          <CheckIcon width={12} />
        </ActionIcon>
      </div>
    </PickerInputBase>
  );
});

DateTimePicker.displayName = '@mantine/dates/DateTimePicker';
