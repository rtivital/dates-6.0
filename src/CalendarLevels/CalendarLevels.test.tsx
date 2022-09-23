import React from 'react';
import { CalendarLevels, CalendarLevelsProps } from './CalendarLevels';
import {
  itSupportsMonthProps,
  itHandlesMonthKeyboardEvents,
  itHandlesControlsKeyboardEvents,
} from '../__tests__';

const defaultProps: CalendarLevelsProps = {
  defaultDate: new Date(2022, 3, 11),
};

describe('@mantine/dates/CalendarLevels', () => {
  itSupportsMonthProps(CalendarLevels, defaultProps);
  itHandlesMonthKeyboardEvents(CalendarLevels, defaultProps);
  itHandlesControlsKeyboardEvents(CalendarLevels, 'year', '.mantine-MonthsList-monthsList', {
    ...defaultProps,
    level: 'year',
  });
  itHandlesControlsKeyboardEvents(CalendarLevels, 'decade', '.mantine-YearsList-yearsList', {
    ...defaultProps,
    level: 'decade',
  });
});
