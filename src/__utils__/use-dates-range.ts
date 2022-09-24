import { useState } from 'react';
import { useUncontrolled } from '@mantine/hooks';
import dayjs from 'dayjs';

function isInRange(date: Date, range: [Date, Date]) {
  const _range = [...range].sort((a, b) => a.getTime() - b.getTime());
  return (
    dayjs(date).subtract(1, 'day').isBefore(_range[1]) &&
    dayjs(date).add(1, 'day').isAfter(_range[0])
  );
}

interface UseDatesRangeInput {
  level: 'year' | 'month' | 'day';
  defaultValue?: [Date | null, Date | null];
  value?: [Date | null, Date | null];
  onChange?(range: [Date | null, Date | null]): void;
  allowSingleDateInRange?: boolean;
  onMouseLeave?(event: React.MouseEvent<HTMLDivElement>): void;
}

export function useDatesRange({
  level,
  value,
  defaultValue,
  onChange,
  allowSingleDateInRange,
  onMouseLeave,
}: UseDatesRangeInput) {
  const [_value, setValue] = useUncontrolled({
    value,
    defaultValue,
    finalValue: [null, null],
    onChange,
  });

  const [pickedDate, setPickedDate] = useState<Date>(null);
  const [hoveredDate, setHoveredDate] = useState<Date>(null);

  const onRangeChange = (date: Date) => {
    if (pickedDate instanceof Date) {
      if (dayjs(date).isSame(pickedDate, level) && !allowSingleDateInRange) {
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

    if (_value[0] && dayjs(date).isSame(_value[0], level) && !allowSingleDateInRange) {
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

  const onRootMouseLeave = (event: React.MouseEvent<HTMLDivElement>) => {
    onMouseLeave?.(event);
    setHoveredDate(null);
  };

  const getControlProps = (date: Date) => ({
    selected: _value.some((selection) => selection && dayjs(selection).isSame(date, 'year')),
    inRange: isDateInRange(date),
    firstInRange: _value[0] instanceof Date && dayjs(date).isSame(_value[0], 'year'),
    lastInRange: _value[1] instanceof Date && dayjs(date).isSame(_value[1], 'year'),
  });

  return {
    onRangeChange,
    onRootMouseLeave,
    onHoveredDateChange: setHoveredDate,
    getControlProps,
    _value,
    setValue,
  };
}
