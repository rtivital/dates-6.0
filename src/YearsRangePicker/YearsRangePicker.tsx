import React, { forwardRef, useState } from 'react';
import { useUncontrolled } from '@mantine/hooks';
import { useComponentDefaultProps } from '@mantine/core';
import dayjs from 'dayjs';
import { DecadeLevelSettings } from '../DecadeLevel';
import { CalendarLevels, CalendarLevelsBaseProps } from '../CalendarLevels';

export interface YearsRangePickerProps extends DecadeLevelSettings, CalendarLevelsBaseProps {
  /** Default value for uncontrolled component */
  defaultValue?: [Date | null, Date | null];

  /** Value for controlled component */
  value?: [Date | null, Date | null];

  /** Called when value changes */
  onChange?(range: [Date | null, Date | null]): void;
}

const defaultProps: Partial<YearsRangePickerProps> = {};

export const YearsRangePicker = forwardRef<HTMLDivElement, YearsRangePickerProps>((props, ref) => {
  const { defaultValue, value, onChange, __staticSelector, getYearControlProps, ...others } =
    useComponentDefaultProps('YearsRangePicker', defaultProps, props);

  const [pickedDate, setPickedDate] = useState<Date>(null);
  const [hoveredDate, setHoveredDate] = useState<Date>(null);

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
      __staticSelector={__staticSelector || 'YearsRangePicker'}
      onYearSelect={setValue}
      getYearControlProps={(date) => ({
        ...getYearControlProps?.(date),
        selected: dayjs(date).isSame(_value, 'year'),
      })}
      {...others}
    />
  );
});

YearsRangePicker.displayName = '@mantine/dates/YearsRangePicker';
