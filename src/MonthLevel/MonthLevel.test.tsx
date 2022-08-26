import 'dayjs/locale/ru';
import React from 'react';
import { render, screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
import { MonthLevel, MonthLevelProps } from './MonthLevel';
import { itSupportsMonthProps, itSupportsHeaderProps } from '../__tests__';

// function expectWeekdaysNames(names: string[]) {
//   expect(screen.getAllByRole('columnheader').map((th) => th.textContent)).toStrictEqual(names);
// }

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
  itSupportsHeaderProps(MonthLevel, defaultProps);
  itSupportsMonthProps(MonthLevel, defaultProps);

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
});
