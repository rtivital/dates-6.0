import 'dayjs/locale/ru';
import React from 'react';
import { render, screen } from '@testing-library/react';
import { itSupportsGetControlRef, itSupportsMonthsListProps } from '../__tests__';
import { MonthsList, MonthsListProps } from './MonthsList';

const defaultProps: MonthsListProps = {
  year: new Date(2022, 3, 11),
};

describe('@mantine/dates/MonthsList', () => {
  itSupportsGetControlRef(MonthsList, defaultProps);
  itSupportsMonthsListProps(MonthsList, defaultProps);

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
