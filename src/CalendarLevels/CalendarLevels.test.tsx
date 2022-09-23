import React from 'react';
import { CalendarLevels, CalendarLevelsProps } from './CalendarLevels';
import { itSupportsMonthProps } from '../__tests__';

const defaultProps: CalendarLevelsProps = {
  defaultDate: new Date(2022, 3, 11),
};

describe('@mantine/dates/CalendarLevels', () => {
  itSupportsMonthProps(CalendarLevels, defaultProps);
});
