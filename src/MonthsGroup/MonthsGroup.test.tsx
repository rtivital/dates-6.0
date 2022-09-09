// import React from 'react';
import { MonthsGroup, MonthsGroupProps } from './MonthsGroup';
import { itSupportsMonthProps, itSupportsHeaderProps } from '../__tests__';

const defaultProps: MonthsGroupProps = {
  month: new Date(2022, 3, 11),
  levelControlAriaLabel: () => 'level-control',
  nextLabel: 'next',
  previousLabel: 'prev',
};

describe('@mantine/dates/MonthsGroup', () => {
  itSupportsMonthProps(MonthsGroup, defaultProps);
  itSupportsHeaderProps(MonthsGroup, defaultProps);
});
