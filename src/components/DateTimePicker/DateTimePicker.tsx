import dayjs from 'dayjs';
import React, { forwardRef, useState } from 'react';
import {
  useComponentDefaultProps,
  CheckIcon,
  ActionIcon,
  ActionIconProps,
  Selectors,
  DefaultProps,
} from '@mantine/core';
import { useDisclosure, useUncontrolled, useDidUpdate } from '@mantine/hooks';
import { assignTime } from '../../utils';
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

  /** Determines whether seconds input should be rendered */
  withSeconds?: boolean;
}

const defaultProps: Partial<DateTimePickerProps> = {
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
    withSeconds,
    ...rest
  } = useComponentDefaultProps('DateTimePicker', defaultProps, props);

  const _valueFormat = valueFormat || (withSeconds ? 'DD/MM/YYYY HH:mm:ss' : 'DD/MM/YYYY HH:mm');

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

  const formatTime = (dateValue: Date) =>
    dateValue ? dayjs(dateValue).format(withSeconds ? 'HH:mm:ss' : 'HH:mm') : '';

  const [timeValue, setTimeValue] = useState(formatTime(_value));

  const [dropdownOpened, dropdownHandlers] = useDisclosure(false);
  const formattedValue = _value
    ? dayjs(_value).locale(ctx.getLocale(locale)).format(_valueFormat)
    : '';

  const handleTimeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const val = event.currentTarget.value;
    setTimeValue(val);

    if (val) {
      const [hours, minutes, seconds] = val.split(':').map(Number);
      const timeDate = new Date();
      timeDate.setHours(hours);
      timeDate.setMinutes(minutes);
      seconds !== undefined && timeDate.setSeconds(seconds);
      setValue(assignTime(timeDate, _value || new Date()));
    }
  };

  const handleDateChange = (date: Date) => {
    setValue(assignTime(_value, date));
  };

  useDidUpdate(() => {
    if (!dropdownOpened) {
      setTimeValue(formatTime(_value));
    }
  }, [_value, dropdownOpened]);

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
      onClear={() => setValue(null)}
      shouldClear={!!_value}
      value={_value}
      type="default"
      {...others}
    >
      <DatePicker
        {...calendarProps}
        type="default"
        value={_value}
        defaultDate={_value}
        onChange={handleDateChange}
        locale={locale}
        classNames={classNames}
        styles={styles}
        unstyled={unstyled}
        __staticSelector="DateTimePicker"
      />

      <div className={classes.timeWrapper}>
        <TimeInput
          className={cx(classes.timeInput, timeInputProps?.className)}
          value={timeValue}
          onChange={handleTimeChange}
          withSeconds={withSeconds}
          {...timeInputProps}
        />
        <ActionIcon<'button'>
          variant="default"
          size={36}
          onClick={(event) => {
            submitButtonProps?.onClick(event);
            dropdownHandlers.close();
          }}
          // eslint-disable-next-line react/no-children-prop
          children={<CheckIcon width={12} />}
          {...submitButtonProps}
        />
      </div>
    </PickerInputBase>
  );
});

DateTimePicker.displayName = '@mantine/dates/DateTimePicker';
