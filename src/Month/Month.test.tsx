import 'dayjs/locale/ru';
import dayjs from 'dayjs';
import React from 'react';
import { MantineProvider } from '@mantine/core';
import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';
import { itSupportsWeekdaysProps } from '../tests';
import { Month, MonthProps } from './Month';

const defaultProps: MonthProps = {
  month: new Date(2022, 3, 2),
};

describe('@mantine/core/Month', () => {
  itSupportsWeekdaysProps(Month, defaultProps);

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

  it('supports getDayProps', async () => {
    const spy = jest.fn();
    render(
      <Month
        {...defaultProps}
        getDayProps={(date) => ({
          selected: dayjs(date).isSame(new Date(2022, 3, 15)),
          onClick: spy,
        })}
      />
    );

    const days = screen.getAllByRole('button');

    expect(days[18]).toHaveAttribute('data-selected');
    expect(days[0]).not.toHaveAttribute('data-selected');
    expect(days[1]).not.toHaveAttribute('data-selected');

    await userEvent.click(days[0]);
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('adds disabled prop to Day components based on excludeDate callback', () => {
    render(<Month {...defaultProps} excludeDate={(date) => date.getDay() === 0} />);
    const days = screen.getAllByRole('button');

    expect(days[5]).not.toHaveAttribute('data-disabled');
    expect(days[6]).toHaveAttribute('data-disabled');
    expect(days[13]).toHaveAttribute('data-disabled');
  });

  it('supports minDate', () => {
    render(<Month {...defaultProps} minDate={new Date(2022, 3, 10)} />);
    const days = screen.getAllByRole('button');

    expect(days[0]).toHaveAttribute('data-disabled');
    expect(days[1]).toHaveAttribute('data-disabled');
    expect(days[12]).toHaveAttribute('data-disabled');
    expect(days[13]).not.toHaveAttribute('data-disabled');
    expect(days[14]).not.toHaveAttribute('data-disabled');
    expect(days[34]).not.toHaveAttribute('data-disabled');
  });

  it('supports maxDate', () => {
    render(<Month {...defaultProps} maxDate={new Date(2022, 3, 22)} />);
    const days = screen.getAllByRole('button');

    expect(days[34]).toHaveAttribute('data-disabled');
    expect(days[33]).toHaveAttribute('data-disabled');
    expect(days[32]).toHaveAttribute('data-disabled');
    expect(days[26]).toHaveAttribute('data-disabled');
    expect(days[25]).not.toHaveAttribute('data-disabled');
    expect(days[24]).not.toHaveAttribute('data-disabled');
    expect(days[23]).not.toHaveAttribute('data-disabled');
  });

  it('supports renderDay', () => {
    render(<Month {...defaultProps} renderDay={(date) => date.getFullYear()} />);
    const days = screen.getAllByRole('button');

    days.forEach((day) => {
      expect(day.textContent).toBe('2022');
    });
  });

  it('supports hideOutsideDates', () => {
    render(<Month {...defaultProps} hideOutsideDates />);
    const days = screen.getAllByRole('button');

    expect(days).toHaveLength(30);
    expect(days[0].textContent).toBe('1');
    expect(days[29].textContent).toBe('30');
  });

  it('supports hideWeekdays', () => {
    render(<Month {...defaultProps} hideWeekdays />);
    expect(screen.queryAllByRole('columnheader')).toHaveLength(0);
  });

  it('sets correct default aria-label on days without getDayAriaLabel', () => {
    render(<Month {...defaultProps} />);
    const days = screen.getAllByRole('button');
    expect(days[0]).toHaveAttribute('aria-label', '28 March 2022');
    expect(days[4]).toHaveAttribute('aria-label', '1 April 2022');
  });

  it('supports default days aria-label localization with locale prop', () => {
    render(<Month {...defaultProps} locale="ru" />);
    const days = screen.getAllByRole('button');
    expect(days[0]).toHaveAttribute('aria-label', '28 марта 2022');
    expect(days[4]).toHaveAttribute('aria-label', '1 апреля 2022');
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

  it('allows changing days aria-label with getDayAriaLabel prop', () => {
    render(
      <Month {...defaultProps} getDayAriaLabel={(date) => dayjs(date).format('DD/MM/YYYY')} />
    );

    const days = screen.getAllByRole('button');
    expect(days[0]).toHaveAttribute('aria-label', '28/03/2022');
    expect(days[4]).toHaveAttribute('aria-label', '01/04/2022');
  });

  it('supports static prop', () => {
    const { container, rerender } = render(<Month {...defaultProps} />);
    expect((container.querySelector('td').firstChild as HTMLElement).tagName).toBe('BUTTON');

    rerender(<Month {...defaultProps} static />);
    expect((container.querySelector('td').firstChild as HTMLElement).tagName).toBe('DIV');
  });
});
