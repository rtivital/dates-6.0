import React, { forwardRef } from 'react';
import { useComponentDefaultProps } from '@mantine/core';
import { useDatesState } from '../../hooks';
import { DecadeLevelSettings } from '../DecadeLevel';
import { DatePickerBaseProps, DatePickerType } from '../../types';
import {
  CalendarLevels,
  CalendarLevelsBaseProps,
  CalendarLevelsSystemProps,
} from '../CalendarLevels';

export interface YearPickerBaseProps<Type extends DatePickerType = 'default'>
  extends DatePickerBaseProps<Type>,
    DecadeLevelSettings,
    CalendarLevelsBaseProps {}

export interface YearPickerProps<Type extends DatePickerType = 'default'>
  extends YearPickerBaseProps<Type>,
    CalendarLevelsSystemProps {}

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
      allowDeselect,
      onMouseLeave,
      onYearSelect,
      ...others
    } = useComponentDefaultProps('YearsPicker', defaultProps, props as any);

    const { onDateChange, onRootMouseLeave, onHoveredDateChange, getControlProps } =
      useDatesState<Type>({
        type,
        level: 'year',
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
        minLevel="decade"
        __updateDateOnYearSelect={false}
        __staticSelector={__staticSelector || 'YearPicker'}
        onMouseLeave={onRootMouseLeave}
        onYearMouseEnter={(_event, date) => onHoveredDateChange(date)}
        onYearSelect={(date) => {
          onDateChange(date);
          onYearSelect?.(date);
        }}
        getYearControlProps={(date) => ({
          ...getControlProps(date),
          ...getYearControlProps?.(date),
        })}
        {...others}
      />
    );
  }
);

YearPicker.displayName = '@mantine/dates/YearPicker';