import React, { forwardRef } from 'react';
import { useComponentDefaultProps } from '@mantine/core';
import { useDatesState } from '../../hooks';
import { DecadeLevelSettings } from '../DecadeLevel';
import { YearLevelSettings } from '../YearLevel';
import { MonthLevelSettings } from '../MonthLevel';
import { PickerBaseProps, DatePickerType } from '../../types';
import {
  CalendarLevels,
  CalendarLevelsBaseProps,
  CalendarLevelsSystemProps,
} from '../CalendarLevels';

export interface DatePickerBaseProps<Type extends DatePickerType = 'default'>
  extends PickerBaseProps<Type>,
    CalendarLevelsBaseProps,
    DecadeLevelSettings,
    YearLevelSettings,
    MonthLevelSettings {}

export interface DatePickerProps<Type extends DatePickerType = 'default'>
  extends DatePickerBaseProps<Type>,
    CalendarLevelsSystemProps {}

const defaultProps: Partial<DatePickerProps> = {
  type: 'default',
};

type DatePickerComponent = (<Type extends DatePickerType = 'default'>(
  props: DatePickerProps<Type>
) => JSX.Element) & { displayName?: string };

export const DatePicker: DatePickerComponent = forwardRef(
  <Type extends DatePickerType = 'default'>(
    props: DatePickerProps<Type>,
    ref: React.ForwardedRef<HTMLDivElement>
  ) => {
    const {
      type,
      defaultValue,
      value,
      onChange,
      __staticSelector,
      getDayProps,
      allowSingleDateInRange,
      allowDeselect,
      onMouseLeave,
      onMonthSelect,
      ...others
    } = useComponentDefaultProps('DatePicker', defaultProps, props as any);

    const { onDateChange, onRootMouseLeave, onHoveredDateChange, getControlProps } =
      useDatesState<Type>({
        type,
        level: 'day',
        allowDeselect,
        allowSingleDateInRange,
        value,
        defaultValue,
        onChange,
        onMouseLeave,
      });

    return (
      <CalendarLevels
        ref={ref}
        minLevel="month"
        __updateDateOnMonthSelect={false}
        __staticSelector={__staticSelector || 'DatePicker'}
        onMouseLeave={onRootMouseLeave}
        __onDayMouseEnter={(_event, date) => onHoveredDateChange(date)}
        __onDayClick={(_event, date) => onDateChange(date)}
        getDayProps={(date) => ({
          ...getControlProps(date),
          ...getDayProps?.(date),
        })}
        {...others}
      />
    );
  }
);

DatePicker.displayName = '@mantine/dates/DatePicker';
