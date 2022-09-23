import React, { forwardRef } from 'react';
import { useUncontrolled } from '@mantine/hooks';
import { useComponentDefaultProps } from '@mantine/core';
import dayjs from 'dayjs';
import { CalendarLevels, CalendarLevelsBaseProps } from '../CalendarLevels';

export interface YearPickerProps extends CalendarLevelsBaseProps {
  __staticSelector?: string;

  /** Default value for uncontrolled component */
  defaultValue?: Date | null;

  /** Value for controlled component */
  value?: Date | null;

  /** Called when value changes */
  onChange?(date: Date): void;
}

const defaultProps: Partial<YearPickerProps> = {};

export const YearPicker = forwardRef<HTMLDivElement, YearPickerProps>((props, ref) => {
  const { defaultValue, value, onChange, __staticSelector, ...others } = useComponentDefaultProps(
    'YearPicker',
    defaultProps,
    props
  );

  const [_value, setValue] = useUncontrolled({
    value,
    defaultValue,
    finalValue: null,
    onChange,
  });

  return (
    <CalendarLevels
      ref={ref}
      minLevel="decade"
      __updateDateOnYearSelect={false}
      __staticSelector={__staticSelector || 'YearPicker'}
      getYearControlProps={(date) => ({
        selected: dayjs(date).isSame(_value, 'year'),
        onClick: () => setValue(date),
      })}
      {...others}
    />
  );
});

YearPicker.displayName = '@mantine/dates/YearPicker';
