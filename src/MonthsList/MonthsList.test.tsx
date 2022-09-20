import 'dayjs/locale/ru';
import React from 'react';
import { render, screen } from '@testing-library/react';
import dayjs from 'dayjs';
import { itSupportsGetControlRef } from '../__tests__';
import { DatesProvider } from '../DatesProvider';
import { MonthsList, MonthsListProps } from './MonthsList';

const defaultProps: MonthsListProps = {
  year: new Date(2022, 3, 11),
};

const defaultMonthNames = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

const ruMonthsNames = [
  'янв.',
  'февр.',
  'март',
  'апр.',
  'май',
  'июнь',
  'июль',
  'авг.',
  'сент.',
  'окт.',
  'нояб.',
  'дек.',
];

const customFormatMonthsNames = [
  'Jan 22',
  'Feb 22',
  'Mar 22',
  'Apr 22',
  'May 22',
  'Jun 22',
  'Jul 22',
  'Aug 22',
  'Sep 22',
  'Oct 22',
  'Nov 22',
  'Dec 22',
];

function expectMonthNames(monthNames: string[]) {
  expect(screen.getAllByRole('button').map((node) => node.textContent)).toStrictEqual(monthNames);
}

describe('@mantine/dates/MonthsList', () => {
  itSupportsGetControlRef(MonthsList, defaultProps);

  it('renders correct months list', () => {
    render(<MonthsList {...defaultProps} />);
    expectMonthNames(defaultMonthNames);
  });

  it('supports months list localization', () => {
    render(<MonthsList {...defaultProps} locale="ru" />);
    expectMonthNames(ruMonthsNames);
  });

  it('supports months list localization with DatesProvider', () => {
    render(
      <DatesProvider settings={{ locale: 'ru' }}>
        <MonthsList {...defaultProps} />
      </DatesProvider>
    );
    expectMonthNames(ruMonthsNames);
  });

  it('supports custom monthsListFormat format', () => {
    render(<MonthsList {...defaultProps} monthsListFormat="MMM YY" />);
    expectMonthNames(customFormatMonthsNames);
  });

  it('disables months if they are before minDate', () => {
    render(<MonthsList year={new Date(2022, 3, 11)} minDate={new Date(2022, 4, 11)} />);
    const months = screen.getAllByRole('button');
    expect(months[0]).toBeDisabled();
    expect(months[1]).toBeDisabled();
    expect(months[3]).toBeDisabled();
    expect(months[4]).not.toBeDisabled();
    expect(months[11]).not.toBeDisabled();
  });

  it('disables months if they are after minDate', () => {
    render(<MonthsList year={new Date(2022, 3, 11)} maxDate={new Date(2022, 4, 11)} />);
    const months = screen.getAllByRole('button');
    expect(months[0]).not.toBeDisabled();
    expect(months[4]).not.toBeDisabled();
    expect(months[5]).toBeDisabled();
    expect(months[11]).toBeDisabled();
  });

  it('supports getMonthControlProps', () => {
    render(
      <MonthsList
        {...defaultProps}
        getMonthControlProps={(date) => ({
          selected: dayjs(date).isSame(new Date(2022, 3, 11), 'month'),
        })}
      />
    );

    const months = screen.getAllByRole('button');
    expect(months[2]).not.toHaveAttribute('data-selected');
    expect(months[3]).toHaveAttribute('data-selected');
    expect(months[4]).not.toHaveAttribute('data-selected');
  });

  it('has correct default __staticSelector', () => {
    render(<MonthsList {...defaultProps} />);
    expect(screen.getByRole('table')).toHaveClass('mantine-MonthsList-monthsList');
    expect(screen.getAllByRole('button')[0]).toHaveClass(
      'mantine-MonthsList-calendarPickerControl'
    );
  });

  it('supports custom __staticSelector', () => {
    render(<MonthsList {...defaultProps} __staticSelector="Calendar" />);
    expect(screen.getByRole('table')).toHaveClass('mantine-Calendar-monthsList');
    expect(screen.getAllByRole('button')[0]).toHaveClass('mantine-Calendar-calendarPickerControl');
  });

  it('supports styles api (styles)', () => {
    render(
      <MonthsList
        {...defaultProps}
        styles={{
          monthsList: { borderColor: '#331156' },
          calendarPickerControl: { borderColor: '#123123' },
        }}
      />
    );

    expect(screen.getByRole('table')).toHaveStyle({ borderColor: '#331156' });
    expect(screen.getAllByRole('button')[0]).toHaveStyle({ borderColor: '#123123' });
  });

  it('supports styles api (classNames)', () => {
    render(
      <MonthsList
        {...defaultProps}
        classNames={{ monthsList: 'test-months-list', calendarPickerControl: 'test-control' }}
      />
    );
    expect(screen.getByRole('table')).toHaveClass('test-months-list');
    expect(screen.getAllByRole('button')[0]).toHaveClass('test-control');
  });
});
