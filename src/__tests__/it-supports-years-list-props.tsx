import dayjs from 'dayjs';
import React from 'react';
import { render } from '@testing-library/react';
import { DatesProvider } from '../DatesProvider';

export interface MonthsListProps {
  locale?: string;
  yearsListFormat?: string;
  decade?: Date;
  minDate?: Date;
  maxDate?: Date;
  getYearControlProps?(date: Date): Record<string, any>;
}

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

function expectYearNames(container: HTMLElement, monthNames: string[]) {
  expect(
    Array.from(container.querySelectorAll('table button')).map((node) => node.textContent)
  ).toStrictEqual(monthNames);
}

export function itSupportsYearListProps(
  Component: React.FC<MonthsListProps>,
  requiredProps?: Record<string, any>
) {
  it('renders correct years list', () => {
    const { container } = render(<Component {...requiredProps} />);
    expectYearNames(container, defaultYearsNames);
  });

  it('supports locale prop with custom yearsListFormat', () => {
    const { container } = render(
      <Component {...requiredProps} locale="ru" yearsListFormat="MMM YYYY" />
    );
    expectYearNames(container, ruYearsNames);
  });

  it('supports years list localization with DatesProvider', () => {
    const { container } = render(
      <DatesProvider settings={{ locale: 'ru' }}>
        <Component {...requiredProps} yearsListFormat="MMM YYYY" />
      </DatesProvider>
    );
    expectYearNames(container, ruYearsNames);
  });

  it('supports custom yearsListFormat format', () => {
    const { container } = render(<Component {...requiredProps} yearsListFormat="MMM YY" />);
    expectYearNames(container, customFormatYearsNames);
  });

  it('disables years if they are before minDate', () => {
    const { container } = render(
      <Component decade={new Date(2022, 3, 11)} minDate={new Date(2023, 4, 11)} />
    );
    const years = container.querySelectorAll('table button');
    expect(years[0]).toBeDisabled();
    expect(years[1]).toBeDisabled();
    expect(years[3]).toBeDisabled();
    expect(years[4]).not.toBeDisabled();
    expect(years[11]).not.toBeDisabled();
  });

  it('disables years if they are after minDate', () => {
    const { container } = render(
      <Component decade={new Date(2022, 3, 11)} maxDate={new Date(2023, 4, 11)} />
    );
    const years = container.querySelectorAll('table button');
    expect(years[0]).not.toBeDisabled();
    expect(years[4]).not.toBeDisabled();
    expect(years[5]).toBeDisabled();
    expect(years[11]).toBeDisabled();
  });

  it('supports getYearControlProps', () => {
    const { container } = render(
      <Component
        {...requiredProps}
        getYearControlProps={(date) => ({
          selected: dayjs(date).isSame(new Date(2022, 3, 11), 'year'),
        })}
      />
    );

    const years = container.querySelectorAll('table button');
    expect(years[2]).not.toHaveAttribute('data-selected');
    expect(years[3]).toHaveAttribute('data-selected');
    expect(years[4]).not.toHaveAttribute('data-selected');
  });
}