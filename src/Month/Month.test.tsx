import React from 'react';
import { render, screen } from '@testing-library/react';
import { Month, MonthProps } from './Month';

const defaultProps: MonthProps = {
  month: new Date(2022, 3, 2),
};

describe('@mantine/core/Month', () => {
  it('renders correct days', () => {
    render(<Month {...defaultProps} />);

    const days = screen.getAllByRole('button');
    expect(days).toHaveLength(35);

    // first week of April 2022 (with outside dates)
    expect(days[0].textContent).toBe('28');
    expect(days[1].textContent).toBe('29');
    expect(days[2].textContent).toBe('30');
    expect(days[3].textContent).toBe('31');
    expect(days[4].textContent).toBe('1');
    expect(days[5].textContent).toBe('2');
    expect(days[6].textContent).toBe('3');

    // Last days of April 2022 (with outside dates)
    expect(days[33].textContent).toBe('30');
    expect(days[34].textContent).toBe('1');
  });

  it('detects outside days correctly', () => {
    render(<Month {...defaultProps} />);
    const days = screen.getAllByRole('button');

    // first week of April 2022 (with outside dates)
    expect(days[0]).toHaveAttribute('data-outside');
    expect(days[1]).toHaveAttribute('data-outside');
    expect(days[2]).toHaveAttribute('data-outside');
    expect(days[3]).toHaveAttribute('data-outside');
    expect(days[4]).not.toHaveAttribute('data-outside');
    expect(days[5]).not.toHaveAttribute('data-outside');
    expect(days[6]).not.toHaveAttribute('data-outside');

    // Last days of April 2022 (with outside dates)
    expect(days[33]).not.toHaveAttribute('data-outside');
    expect(days[34]).toHaveAttribute('data-outside');
  });

  it('detects weekends correctly with default weekendDays value', () => {
    render(<Month {...defaultProps} />);
    const days = screen.getAllByRole('button');

    expect(days[0]).not.toHaveAttribute('data-weekend');
    expect(days[4]).not.toHaveAttribute('data-weekend');
    expect(days[5]).toHaveAttribute('data-weekend');
    expect(days[6]).toHaveAttribute('data-weekend');
    expect(days[33]).toHaveAttribute('data-weekend');
    expect(days[34]).not.toHaveAttribute('data-weekend');
  });

  it('detects weekends correctly with custom weekendDays value', () => {
    render(<Month {...defaultProps} weekendDays={[3, 4]} />);
    const days = screen.getAllByRole('button');

    expect(days[7]).not.toHaveAttribute('data-weekend');
    expect(days[8]).not.toHaveAttribute('data-weekend');
    expect(days[9]).toHaveAttribute('data-weekend');
    expect(days[10]).toHaveAttribute('data-weekend');
  });
});
