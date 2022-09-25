import React, { forwardRef } from 'react';
import { useComponentDefaultProps } from '@mantine/core';
import { useDatesState } from '../__utils__/use-dates-state';
import { DecadeLevelSettings } from '../DecadeLevel';
import { DatePickerBaseProps, DatePickerType } from '../types';
import { CalendarLevels, CalendarLevelsBaseProps } from '../CalendarLevels';

export interface YearPickerProps<Type extends DatePickerType = 'default'>
  extends DatePickerBaseProps<Type>,
    DecadeLevelSettings,
    CalendarLevelsBaseProps {}

const defaultProps: Partial<YearPickerProps> = {
  type: 'default',
};

type YearPickerComponent = (<Type extends DatePickerType = 'default'>(
  props: YearPickerProps<Type>
) => JSX.Element) & { displayName?: string };

export const YearPicker: YearPickerComponent = forwardRef(
  <Type extends DatePickerType = 'default'>(
    props: YearPickerProps<Type>,
    ref: React.ForwardedRef<HTMLDivElement>
  ) => {
    const {
      type,
      defaultValue,
      value,
      onChange,
      __staticSelector,
      getYearControlProps,
      allowSingleDateInRange,
      onMouseLeave,
      ...others
    } = useComponentDefaultProps('YearsRangePicker', defaultProps, props as any);

    const { onDateChange, onRootMouseLeave, onHoveredDateChange, getControlProps } =
      useDatesState<Type>({
        type,
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
        onYearSelect={onDateChange}
        getYearControlProps={(date) => ({
          ...getYearControlProps?.(date),
          ...getControlProps(date),
        })}
        {...others}
      />
    );
  }
);

YearPicker.displayName = '@mantine/dates/YearPicker';
