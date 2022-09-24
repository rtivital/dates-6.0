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

function isInRange(date: Date, range: [Date, Date]) {
  const _range = [...range].sort((a, b) => a.getTime() - b.getTime());
  return (
    dayjs(date).subtract(1, 'day').isBefore(_range[1]) &&
    dayjs(date).add(1, 'day').isAfter(_range[0])
  );
}

export const YearsRangePicker = forwardRef<HTMLDivElement, YearsRangePickerProps>((props, ref) => {
  const {
    defaultValue,
    value,
    onChange,
    __staticSelector,
    getYearControlProps,
    allowSingleDateInRange,
    onMouseLeave,
    ...others
  } = useComponentDefaultProps('YearsRangePicker', defaultProps, props);

  const [pickedDate, setPickedDate] = useState<Date>(null);
  const [hoveredDate, setHoveredDate] = useState<Date>(null);

  const [_value, setValue] = useUncontrolled({
    value,
    defaultValue,
    finalValue: [null, null],
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

    if (_value[0] && dayjs(date).isSame(_value[0], 'year') && !allowSingleDateInRange) {
      setPickedDate(null);
      setHoveredDate(null);
      setValue([null, null]);
      return null;
    }

    setValue([date, null]);
    setPickedDate(date);
    return null;
  };

  const isDateInRange = (date: Date) => {
    if (pickedDate instanceof Date && hoveredDate instanceof Date) {
      return isInRange(date, [hoveredDate, pickedDate]);
    }

    if (_value[0] instanceof Date && _value[1] instanceof Date) {
      return isInRange(date, _value);
    }

    return false;
  };

  const handleMouseLeave = (event: React.MouseEvent<HTMLDivElement>) => {
    onMouseLeave?.(event);
    setHoveredDate(null);
  };

  return (
    <CalendarLevels
      ref={ref}
      minLevel="decade"
      __updateDateOnYearSelect={false}
      __staticSelector={__staticSelector || 'YearsRangePicker'}
      onMouseLeave={handleMouseLeave}
      onYearMouseEnter={(event, date) => setHoveredDate(date)}
      onYearSelect={setRange}
      getYearControlProps={(date) => ({
        ...getYearControlProps?.(date),
        selected: _value.some((selection) => selection && dayjs(selection).isSame(date, 'year')),
        inRange: isDateInRange(date),
        firstInRange: _value[0] instanceof Date && dayjs(date).isSame(_value[0], 'year'),
        lastInRange: _value[1] instanceof Date && dayjs(date).isSame(_value[1], 'year'),
      })}
      {...others}
    />
  );
});

YearsRangePicker.displayName = '@mantine/dates/YearsRangePicker';
