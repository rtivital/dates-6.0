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

  it('renders correct months group based on month prop', () => {
    render(<MonthsGroup {...defaultProps} numberOfMonths={3} />);
    expect(screen.getAllByLabelText('level-control').map((node) => node.textContent)).toStrictEqual(
      ['April 2022', 'May 2022', 'June 2022']
    );
  });

  it('supports levelControlAriaLabel as string', () => {
    render(<MonthsGroup {...defaultProps} levelControlAriaLabel="test-label" />);
    expect(screen.getByText('April 2022')).toHaveAttribute('aria-label', 'test-label');
  });

  it('supports levelControlAriaLabel as function', () => {
    render(
      <MonthsGroup
        {...defaultProps}
        levelControlAriaLabel={(date) => `${date.getMonth()}/${date.getFullYear()}`}
      />
    );
    expect(screen.getByText('April 2022')).toHaveAttribute('aria-label', '3/2022');
  });
});
