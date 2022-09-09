import React from 'react';
import { render, screen } from '@testing-library/react';
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

  it('renders correct number of months based on numberOfMonths prop', () => {
    const { rerender } = render(<MonthsGroup {...defaultProps} numberOfMonths={1} />);
    expect(screen.getAllByLabelText('level-control')).toHaveLength(1);

    rerender(<MonthsGroup {...defaultProps} numberOfMonths={2} />);
    expect(screen.getAllByLabelText('level-control')).toHaveLength(2);

    rerender(<MonthsGroup {...defaultProps} numberOfMonths={3} />);
    expect(screen.getAllByLabelText('level-control')).toHaveLength(3);
  });
});
