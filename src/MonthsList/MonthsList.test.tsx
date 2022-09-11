import 'dayjs/locale/ru';
import React from 'react';
import { render, screen } from '@testing-library/react';
import dayjs from 'dayjs';
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

function expectMonthNames(monthNames: string[]) {
  expect(screen.getAllByRole('button').map((node) => node.textContent)).toStrictEqual(monthNames);
}

describe('@mantine/dates/MonthsList', () => {
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
});
