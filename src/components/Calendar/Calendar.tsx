import React, { forwardRef } from 'react';
import { useComponentDefaultProps } from '@mantine/core';
import { useDatesState } from '../../hooks';
import { DecadeLevelSettings } from '../DecadeLevel';
import { YearLevelSettings } from '../YearLevel';
import { DatePickerBaseProps, DatePickerType } from '../../types';
import {
  CalendarLevels,
  CalendarLevelsBaseProps,
  CalendarLevelsSystemProps,
} from '../CalendarLevels';

export interface CalendarBaseProps<Type extends DatePickerType = 'default'>
  extends DatePickerBaseProps<Type>,
    DecadeLevelSettings,
    YearLevelSettings,
    CalendarLevelsBaseProps {}

export interface CalendarProps<Type extends DatePickerType = 'default'>
  extends CalendarBaseProps<Type>,
    CalendarLevelsSystemProps {}

const defaultProps: Partial<CalendarProps> = {
  type: 'default',
};

type CalendarComponent = (<Type extends DatePickerType = 'default'>(
  props: CalendarProps<Type>
) => JSX.Element) & { displayName?: string };

export const Calendar: CalendarComponent = forwardRef(
  <Type extends DatePickerType = 'default'>(
    props: CalendarProps<Type>,
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
    } = useComponentDefaultProps('Calendar', defaultProps, props as any);

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
        __staticSelector={__staticSelector || 'Calendar'}
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

Calendar.displayName = '@mantine/dates/Calendar';
