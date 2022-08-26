import React from 'react';
import { render, screen } from '@testing-library/react';
import { CalendarPickerControl, CalendarPickerControlProps } from './CalendarPickerControl';

const defaultProps: CalendarPickerControlProps = {};

describe('@mantine/dates/CalendarPickerControl', () => {
  it('sets correct attributes when disabled prop is set', () => {
    const { rerender } = render(<CalendarPickerControl {...defaultProps} />);
    expect(screen.getByRole('button')).not.toHaveAttribute('disabled');
    expect(screen.getByRole('button')).not.toHaveAttribute('data-disabled');

    rerender(<CalendarPickerControl {...defaultProps} disabled />);
    expect(screen.getByRole('button')).toHaveAttribute('disabled');
    expect(screen.getByRole('button')).toHaveAttribute('data-disabled');
  });

  it('correctly handles selected attribute', () => {
    const { rerender } = render(<CalendarPickerControl {...defaultProps} />);
    expect(screen.getByRole('button')).not.toHaveAttribute('data-selected');

    rerender(<CalendarPickerControl {...defaultProps} selected />);
    expect(screen.getByRole('button')).toHaveAttribute('data-selected');

    rerender(<CalendarPickerControl {...defaultProps} selected disabled />);
    expect(screen.getByRole('button')).not.toHaveAttribute('data-selected');
  });

  it('has correct default __staticSelector', () => {
    render(<CalendarPickerControl {...defaultProps} />);
    expect(screen.getByRole('button')).toHaveClass(
      'mantine-CalendarPickerControl-calendarPickerControl'
    );
  });

  it('supports custom __staticSelector', () => {
    render(<CalendarPickerControl {...defaultProps} __staticSelector="Calendar" />);
    expect(screen.getByRole('button')).toHaveClass('mantine-Calendar-calendarPickerControl');
  });

  it('supports styles api (styles)', () => {
    render(
      <CalendarPickerControl
        {...defaultProps}
        styles={{ calendarPickerControl: { borderColor: '#999124' } }}
      />
    );

    expect(screen.getByRole('button')).toHaveStyle({ borderColor: '#999124' });
  });

  it('supports styles api (classNames)', () => {
    render(
      <CalendarPickerControl
        {...defaultProps}
        classNames={{ calendarPickerControl: 'test-control' }}
      />
    );

    expect(screen.getByRole('button')).toHaveClass('test-control');
  });
});
