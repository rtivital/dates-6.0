import dayjs from 'dayjs';
import React, { forwardRef, useState } from 'react';
import { useUncontrolled } from '@mantine/hooks';
import { useComponentDefaultProps } from '@mantine/core';
import { DecadeLevelSettings } from '../DecadeLevel';
import { CalendarLevels, CalendarLevelsBaseProps } from '../CalendarLevels';

export interface YearsRangePickerProps extends DecadeLevelSettings, CalendarLevelsBaseProps {
  /** Default value for uncontrolled component */
  defaultValue?: [Date | null, Date | null];

  /** Value for controlled component */
  value?: [Date | null, Date | null];

  /** Called when value changes */
  onChange?(range: [Date | null, Date | null]): void;

  /** Determines whether single year can be selected as range */
  allowSingleDateInRange?: boolean;
}

const defaultProps: Partial<YearsRangePickerProps> = {};

export const YearsRangePicker = forwardRef<HTMLDivElement, YearsRangePickerProps>((props, ref) => {
  const {
    defaultValue,
    value,
    onChange,
    __staticSelector,
    getYearControlProps,
    allowSingleDateInRange,
    ...others
  } = useComponentDefaultProps('YearsRangePicker', defaultProps, props);

  const [pickedDate, setPickedDate] = useState<Date>(null);
  const [hoveredDate, setHoveredDate] = useState<Date>(null);

  const [_value, setValue] = useUncontrolled({
    value,
    defaultValue,
    finalValue: null,
    onChange,
  });

  const setRange = (date: Date) => {
    if (pickedDate instanceof Date) {
      if (dayjs(date).isSame(pickedDate, 'year') && !allowSingleDateInRange) {
        setPickedDate(null);
        setHoveredDate(null);
        return null;
      }

      const result: [Date, Date] = [date, pickedDate];
      result.sort((a, b) => a.getTime() - b.getTime());
      setValue(result);
      setPickedDate(null);
      return null;
    }

    if (value[0] && dayjs(date).isSame(value[0], 'year') && !allowSingleDateInRange) {
      setPickedDate(null);
      setHoveredDate(null);
      setValue([null, null]);
      return null;
    }

    setValue([date, null]);
    setPickedDate(date);
    return null;
  };

  return (
    <CalendarLevels
      ref={ref}
      minLevel="decade"
      __updateDateOnYearSelect={false}
      __staticSelector={__staticSelector || 'YearsRangePicker'}
      onYearMouseEnter={(event, date) => setHoveredDate(date)}
      onYearSelect={setRange}
      getYearControlProps={(date) => ({
        ...getYearControlProps?.(date),
        selected: dayjs(date).isSame(_value, 'year'),
      })}
      {...others}
    />
  );
});

YearsRangePicker.displayName = '@mantine/dates/YearsRangePicker';
