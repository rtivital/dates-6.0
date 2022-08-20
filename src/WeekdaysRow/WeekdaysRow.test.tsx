import 'dayjs/locale/ru';
import React from 'react';
import { MantineProvider } from '@mantine/core';
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

  it('has correct default __staticSelector', () => {
    render(<Wrapper />);
    expect(screen.getByRole('row')).toHaveClass('mantine-WeekdaysRow-weekdaysRow ');
  });

  it('supports __staticSelector', () => {
    render(<Wrapper __staticSelector="Month" />);
    expect(screen.getByRole('row')).toHaveClass(
      'mantine-WeekdaysRow-weekdaysRow',
      'mantine-Month-weekdaysRow '
    );
  });

  it('supports styles api (styles)', () => {
    render(
      <Wrapper
        styles={{ weekday: { borderColor: '#CECECE' }, weekdaysRow: { borderColor: '#FFEECD' } }}
      />
    );
    expect(screen.getAllByRole('columnheader')[0]).toHaveStyle({ borderColor: '#CECECE' });
    expect(screen.getByRole('row')).toHaveStyle({ borderColor: '#FFEECD' });
  });

  it('supports styles api (classNames)', () => {
    render(
      <Wrapper
        classNames={{ weekday: 'test-weekday-class', weekdaysRow: 'test-weekdays-row-class' }}
      />
    );
    expect(screen.getAllByRole('columnheader')[0]).toHaveClass('test-weekday-class');
    expect(screen.getByRole('row')).toHaveClass('test-weekdays-row-class');
  });

  it('supports theme.datesLocale', () => {
    render(
      <MantineProvider theme={{ datesLocale: 'ru' }}>
        <Wrapper />
      </MantineProvider>
    );

    expectWeekdaysNames(['пн', 'вт', 'ср', 'чт', 'пт', 'сб', 'вс']);
  });
});
