import React from 'react';
import { MantineProvider } from '@mantine/core';
import { render, screen } from '@testing-library/react';
import { itSupportsMonthProps } from '../tests';
import { Month, MonthProps } from './Month';

const defaultProps: MonthProps = {
  month: new Date(2022, 3, 2),
};

describe('@mantine/core/Month', () => {
  itSupportsMonthProps(Month, defaultProps);

  it('has correct default __staticSelector', () => {
    const { container } = render(<Month {...defaultProps} />);
    expect(container.querySelector('table')).toHaveClass('mantine-Month-month');
    expect(container.querySelector('thead tr')).toHaveClass('mantine-Month-weekdaysRow');
    expect(container.querySelector('tbody tr td button')).toHaveClass('mantine-Month-day');
  });

  it('supports __staticSelector', () => {
    const { container } = render(<Month {...defaultProps} __staticSelector="Calendar" />);
    expect(container.querySelector('table')).toHaveClass('mantine-Calendar-month');
    expect(container.querySelector('thead tr')).toHaveClass('mantine-Calendar-weekdaysRow');
    expect(container.querySelector('tbody tr td button')).toHaveClass('mantine-Calendar-day');
  });

  it('supports styles api (styles)', () => {
    const { container } = render(
      <Month
        {...defaultProps}
        styles={{
          day: { borderColor: '#CECECE' },
          month: { borderColor: '#EFC65E' },
          weekdaysRow: { borderColor: '#FF4534' },
        }}
      />
    );
    expect(container.querySelector('table')).toHaveStyle({ borderColor: '#EFC65E' });
    expect(container.querySelector('thead tr')).toHaveStyle({ borderColor: '#FF4534' });
    expect(container.querySelector('tbody tr td button')).toHaveStyle({ borderColor: '#CECECE' });
  });

  it('supports styles api (classNames)', () => {
    const { container } = render(
      <Month
        {...defaultProps}
        classNames={{
          day: 'test-day',
          month: 'test-month',
          weekdaysRow: 'test-weekdays',
        }}
      />
    );
    expect(container.querySelector('table')).toHaveClass('test-month');
    expect(container.querySelector('thead tr')).toHaveClass('test-weekdays');
    expect(container.querySelector('tbody tr td button')).toHaveClass('test-day');
  });

  it('supports default days aria-label localization with theme.datesLocale', () => {
    render(
      <MantineProvider theme={{ datesLocale: 'ru' }}>
        <Month {...defaultProps} />
      </MantineProvider>
    );
    const days = screen.getAllByRole('button');
    expect(days[0]).toHaveAttribute('aria-label', '28 марта 2022');
    expect(days[4]).toHaveAttribute('aria-label', '1 апреля 2022');
  });

  it('supports static prop', () => {
    const { container, rerender } = render(<Month {...defaultProps} />);
    expect((container.querySelector('td').firstChild as HTMLElement).tagName).toBe('BUTTON');

    rerender(<Month {...defaultProps} static />);
    expect((container.querySelector('td').firstChild as HTMLElement).tagName).toBe('DIV');
  });
});
