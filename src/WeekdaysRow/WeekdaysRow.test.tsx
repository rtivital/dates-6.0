import 'dayjs/locale/ru';
import React from 'react';
import { render, screen } from '@testing-library/react';
import { WeekdaysRow, WeekdaysRowProps } from './WeekdaysRow';

const defaultProps: WeekdaysRowProps = {};

function Wrapper(props: Partial<WeekdaysRowProps>) {
  return (
    <table>
      <thead>
        <WeekdaysRow {...defaultProps} {...props} />
      </thead>
    </table>
  );
}

function expectWeekdaysNames(names: string[]) {
  expect(screen.getAllByRole('columnheader').map((th) => th.textContent)).toStrictEqual(names);
}

describe('@mantine/dates/WeekdaysRow', () => {
  it('renders weekdays names', () => {
    render(<Wrapper />);
    expectWeekdaysNames(['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su']);
  });

  it('supports changing locale', () => {
    render(<Wrapper locale="ru" />);
    expectWeekdaysNames(['пн', 'вт', 'ср', 'чт', 'пт', 'сб', 'вс']);
  });

  it('supports changing first day of week', () => {
    const { rerender } = render(<Wrapper firstDayOfWeek={0} />);
    expectWeekdaysNames(['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']);

    rerender(<Wrapper firstDayOfWeek={6} />);
    expectWeekdaysNames(['Sa', 'Su', 'Mo', 'Tu', 'We', 'Th', 'Fr']);
  });

  it('supports changing cell component', () => {
    render(<Wrapper cellComponent="td" />);
    expect(screen.queryAllByRole('cell')).toHaveLength(7);
    expect(screen.queryAllByRole('columnheader')).toHaveLength(0);
  });
});
