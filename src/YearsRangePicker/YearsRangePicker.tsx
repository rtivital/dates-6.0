import React, { forwardRef } from 'react';
import { useComponentDefaultProps } from '@mantine/core';
import { useDatesRangeState } from '../__utils__/use-dates-state';
import { DatesRangeValue } from '../types';
import { DecadeLevelSettings } from '../DecadeLevel';
import { CalendarLevels, CalendarLevelsBaseProps } from '../CalendarLevels';

export interface YearsRangePickerProps extends DecadeLevelSettings, CalendarLevelsBaseProps {
  /** Default value for uncontrolled component */
  defaultValue?: DatesRangeValue;

  /** Value for controlled component */
  value?: DatesRangeValue;

  /** Called when value changes */
  onChange?(range: DatesRangeValue): void;

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
    onMouseLeave,
    ...others
  } = useComponentDefaultProps('YearsRangePicker', defaultProps, props);
  const { onRangeChange, onRootMouseLeave, onHoveredDateChange, getControlProps } =
    useDatesRangeState({
      level: 'year',
      allowSingleDateInRange,
      value,
      defaultValue,
      onChange,
      onMouseLeave,
    });

  return (
    <CalendarLevels
      ref={ref}
      minLevel="decade"
      __updateDateOnYearSelect={false}
      __staticSelector={__staticSelector || 'YearsRangePicker'}
      onMouseLeave={onRootMouseLeave}
      onYearMouseEnter={(_event, date) => onHoveredDateChange(date)}
      onYearSelect={onRangeChange}
      getYearControlProps={(date) => ({
        ...getYearControlProps?.(date),
        ...getControlProps(date),
      })}
      {...others}
    />
  );
});

YearsRangePicker.displayName = '@mantine/dates/YearsRangePicker';
