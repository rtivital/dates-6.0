import 'dayjs/locale/ru';
import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MonthLevel, MonthLevelProps } from './MonthLevel';

function expectWeekdaysNames(names: string[]) {
  expect(screen.getAllByRole('columnheader').map((th) => th.textContent)).toStrictEqual(names);
}

function expectLabel(label: string) {
  expect(screen.getByLabelText('level-control')).toHaveTextContent(label);
}

const defaultProps: MonthLevelProps = {
  month: new Date(2022, 3, 11),
  levelControlAriaLabel: 'level-control',
  nextLabel: 'next',
  previousLabel: 'prev',
};

describe('@mantine/dates/MonthLevel', () => {
  it('renders correct CalendarHeader label', () => {
    render(<MonthLevel {...defaultProps} />);
    expectLabel('April 2022');
  });

  it('supports changing month label format', () => {
    render(<MonthLevel {...defaultProps} monthLabelFormat="MM/YY" />);
    expectLabel('04/22');
  });

  it('supports changing month label with callback', () => {
    render(
      <MonthLevel
        {...defaultProps}
        monthLabelFormat={(date) => `${date.getMonth()}/${date.getFullYear()}`}
      />
    );

    expectLabel('3/2022');
  });

  it('supports localization', () => {
    render(<MonthLevel {...defaultProps} locale="ru" />);
    expectLabel('апрель 2022');
    expectWeekdaysNames(['пн', 'вт', 'ср', 'чт', 'пт', 'сб', 'вс']);
  });

  it('supports onNext and onPrevious props', async () => {
    const onNext = jest.fn();
    const onPrevious = jest.fn();
    render(<MonthLevel {...defaultProps} onNext={onNext} onPrevious={onPrevious} />);

    // await userEvent.click()
  });
});
