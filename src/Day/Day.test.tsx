import React from 'react';
import { render, screen } from '@testing-library/react';
import { Day, DayProps } from './Day';

const defaultProps: DayProps = {
  date: new Date(2022, 1, 3),
};

describe('@mantine/dates/Day', () => {
  it('renders given date value', () => {
    render(<Day {...defaultProps} />);
    expect(screen.getByRole('button')).toHaveTextContent(defaultProps.date.getDate().toString());
  });

  it('supports radius prop', () => {
    render(<Day {...defaultProps} radius={45} />);
    expect(screen.getByRole('button')).toHaveStyle({ borderRadius: '45px' });
  });

  it('adds correct disabled attributes when disabled prop is set', () => {
    render(<Day {...defaultProps} disabled />);
    expect(screen.getByRole('button')).toHaveAttribute('disabled');
    expect(screen.getByRole('button')).toHaveAttribute('data-disabled');
  });
});
