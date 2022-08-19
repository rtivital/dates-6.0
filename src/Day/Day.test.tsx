import React from 'react';
import { render, screen } from '@testing-library/react';
import { Day, DayProps } from './Day';

const defaultProps: DayProps = {
  date: new Date(2022, 1, 3),
};

function validateDataAttribute(attribute: string) {
  it(`sets data-${attribute} attribute when ${attribute} prop is set`, () => {
    const { rerender } = render(<Day {...defaultProps} />);
    expect(screen.getByRole('button')).not.toHaveAttribute(`data-${attribute}`);

    rerender(<Day {...defaultProps} {...{ [attribute]: true }} />);
    expect(screen.getByRole('button')).toHaveAttribute(`data-${attribute}`);

    rerender(<Day {...defaultProps} {...{ [attribute]: true }} disabled />);
    expect(screen.getByRole('button')).not.toHaveAttribute(`data-${attribute}`);
  });
}

describe('@mantine/dates/Day', () => {
  validateDataAttribute('weekend');
  validateDataAttribute('outside');
  validateDataAttribute('selected');

  it('renders given date value', () => {
    render(<Day {...defaultProps} />);
    expect(screen.getByRole('button')).toHaveTextContent(defaultProps.date.getDate().toString());
  });

  it('has -1 tabIndex by default', () => {
    render(<Day {...defaultProps} />);
    expect(screen.getByRole('button')).toHaveAttribute('tabindex', '-1');
  });

  it('allows to customize tabIndex', () => {
    render(<Day {...defaultProps} tabIndex={0} />);
    expect(screen.getByRole('button')).toHaveAttribute('tabindex', '0');
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

  it('has correct default __staticSelector', () => {
    render(<Day {...defaultProps} />);
    expect(screen.getByRole('button')).toHaveClass('mantine-Day-day');
  });

  it('supports __staticSelector', () => {
    render(<Day {...defaultProps} __staticSelector="Month" />);
    expect(screen.getByRole('button')).toHaveClass('mantine-Day-day', 'mantine-Month-day');
  });

  it('supports styles api (styles)', () => {
    render(<Day {...defaultProps} styles={{ day: { borderColor: '#CECECE' } }} />);
    expect(screen.getByRole('button')).toHaveStyle({ borderColor: '#CECECE' });
  });

  it('supports styles api (classNames)', () => {
    render(<Day {...defaultProps} classNames={{ day: 'test-day-class' }} />);
    expect(screen.getByRole('button')).toHaveClass('test-day-class');
  });
});
