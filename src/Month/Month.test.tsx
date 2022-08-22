import 'dayjs/locale/ru';
import React from 'react';
import { render, screen } from '@testing-library/react';
import { Month, MonthProps } from './Month';

const defaultProps: MonthProps = {
  month: new Date(2022, 3, 2),
};

function expectWeekdaysNames(names: string[]) {
  expect(screen.getAllByRole('columnheader').map((th) => th.textContent)).toStrictEqual(names);
}

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

  it('renders correct days when firstDayOfWeek is set', () => {
    render(<Month {...defaultProps} firstDayOfWeek={6} />);

    const days = screen.getAllByRole('button');
    expect(days).toHaveLength(42);

    expect(days[0].textContent).toBe('26');
    expect(days[1].textContent).toBe('27');
    expect(days[2].textContent).toBe('28');
    expect(days[3].textContent).toBe('29');
    expect(days[4].textContent).toBe('30');
    expect(days[5].textContent).toBe('31');
    expect(days[6].textContent).toBe('1');

    expect(days[40].textContent).toBe('5');
    expect(days[41].textContent).toBe('6');
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

  it('supports localization', () => {
    render(<Month {...defaultProps} locale="ru" />);
    expectWeekdaysNames(['пн', 'вт', 'ср', 'чт', 'пт', 'сб', 'вс']);
  });

  it('supports changing weekday format', () => {
    render(<Month {...defaultProps} weekdayFormat="dddd" />);
    expectWeekdaysNames([
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
      'Sunday',
    ]);
  });

  it('reorders weekdays names depending on firstDayOfWeek', () => {
    const { rerender } = render(<Month {...defaultProps} firstDayOfWeek={4} />);
    expectWeekdaysNames(['Th', 'Fr', 'Sa', 'Su', 'Mo', 'Tu', 'We']);

    rerender(<Month {...defaultProps} firstDayOfWeek={6} />);
    expectWeekdaysNames(['Sa', 'Su', 'Mo', 'Tu', 'We', 'Th', 'Fr']);
  });
});
