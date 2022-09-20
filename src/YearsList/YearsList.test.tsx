import 'dayjs/locale/ru';
import React from 'react';
import { render, screen } from '@testing-library/react';
import dayjs from 'dayjs';
import { DatesProvider } from '../DatesProvider';
import { itSupportsGetControlRef } from '../__tests__';
import { YearsList, YearsListProps } from './YearsList';

const defaultProps: YearsListProps = {
  decade: new Date(2022, 3, 11),
};

const defaultYearsNames = [
  '2019',
  '2020',
  '2021',
  '2022',
  '2023',
  '2024',
  '2025',
  '2026',
  '2027',
  '2028',
  '2029',
  '2030',
];

const ruYearsNames = [
  'янв. 2019',
  'янв. 2020',
  'янв. 2021',
  'янв. 2022',
  'янв. 2023',
  'янв. 2024',
  'янв. 2025',
  'янв. 2026',
  'янв. 2027',
  'янв. 2028',
  'янв. 2029',
  'янв. 2030',
];

const customFormatYearsNames = [
  'Jan 19',
  'Jan 20',
  'Jan 21',
  'Jan 22',
  'Jan 23',
  'Jan 24',
  'Jan 25',
  'Jan 26',
  'Jan 27',
  'Jan 28',
  'Jan 29',
  'Jan 30',
];

function expectYearNames(monthNames: string[]) {
  expect(screen.getAllByRole('button').map((node) => node.textContent)).toStrictEqual(monthNames);
}

describe('@mantine/dates/YearsList', () => {
  itSupportsGetControlRef(YearsList, defaultProps);

  it('renders correct years list', () => {
    render(<YearsList {...defaultProps} />);
    expectYearNames(defaultYearsNames);
  });

  it('supports locale prop with custom yearsListFormat', () => {
    render(<YearsList {...defaultProps} locale="ru" yearsListFormat="MMM YYYY" />);
    expectYearNames(ruYearsNames);
  });

  it('supports years list localization with DatesProvider', () => {
    render(
      <DatesProvider settings={{ locale: 'ru' }}>
        <YearsList {...defaultProps} yearsListFormat="MMM YYYY" />
      </DatesProvider>
    );
    expectYearNames(ruYearsNames);
  });

  it('supports custom yearsListFormat format', () => {
    render(<YearsList {...defaultProps} yearsListFormat="MMM YY" />);
    expectYearNames(customFormatYearsNames);
  });

  it('disables years if they are before minDate', () => {
    render(<YearsList decade={new Date(2022, 3, 11)} minDate={new Date(2023, 4, 11)} />);
    const years = screen.getAllByRole('button');
    expect(years[0]).toBeDisabled();
    expect(years[1]).toBeDisabled();
    expect(years[3]).toBeDisabled();
    expect(years[4]).not.toBeDisabled();
    expect(years[11]).not.toBeDisabled();
  });

  it('disables years if they are after minDate', () => {
    render(<YearsList decade={new Date(2022, 3, 11)} maxDate={new Date(2023, 4, 11)} />);
    const years = screen.getAllByRole('button');
    expect(years[0]).not.toBeDisabled();
    expect(years[4]).not.toBeDisabled();
    expect(years[5]).toBeDisabled();
    expect(years[11]).toBeDisabled();
  });

  it('supports getYearControlProps', () => {
    render(
      <YearsList
        {...defaultProps}
        getYearControlProps={(date) => ({
          selected: dayjs(date).isSame(new Date(2022, 3, 11), 'year'),
        })}
      />
    );

    const years = screen.getAllByRole('button');
    expect(years[2]).not.toHaveAttribute('data-selected');
    expect(years[3]).toHaveAttribute('data-selected');
    expect(years[4]).not.toHaveAttribute('data-selected');
  });

  it('has correct default __staticSelector', () => {
    render(<YearsList {...defaultProps} />);
    expect(screen.getByRole('table')).toHaveClass('mantine-YearsList-yearsList');
    expect(screen.getAllByRole('button')[0]).toHaveClass('mantine-YearsList-calendarPickerControl');
  });

  it('supports custom __staticSelector', () => {
    render(<YearsList {...defaultProps} __staticSelector="Calendar" />);
    expect(screen.getByRole('table')).toHaveClass('mantine-Calendar-yearsList');
    expect(screen.getAllByRole('button')[0]).toHaveClass('mantine-Calendar-calendarPickerControl');
  });

  it('supports styles api (styles)', () => {
    render(
      <YearsList
        {...defaultProps}
        styles={{
          yearsList: { borderColor: '#331156' },
          calendarPickerControl: { borderColor: '#123123' },
        }}
      />
    );

    expect(screen.getByRole('table')).toHaveStyle({ borderColor: '#331156' });
    expect(screen.getAllByRole('button')[0]).toHaveStyle({ borderColor: '#123123' });
  });

  it('supports styles api (classNames)', () => {
    render(
      <YearsList
        {...defaultProps}
        classNames={{ yearsList: 'test-years-list', calendarPickerControl: 'test-control' }}
      />
    );
    expect(screen.getByRole('table')).toHaveClass('test-years-list');
    expect(screen.getAllByRole('button')[0]).toHaveClass('test-control');
  });
});
