import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { CalendarLevels, CalendarLevelsProps } from './CalendarLevels';
import {
  itSupportsMonthProps,
  itHandlesMonthKeyboardEvents,
  itHandlesControlsKeyboardEvents,
} from '../__tests__';

const defaultProps: CalendarLevelsProps = {
  defaultDate: new Date(2022, 3, 11),
  ariaLabels: {
    monthLevelControl: 'month-level',
    yearLevelControl: 'year-level',
    decadeLevelControl: 'decade-level',
    nextMonth: 'next-month',
    previousMonth: 'previous-month',
    nextYear: 'next-year',
    previousYear: 'previous-year',
    nextDecade: 'next-decade',
    previousDecade: 'previous-decade',
  },
};

function expectLevelsCount([monthsCount, yearsCount, decadesCount]: [number, number, number]) {
  expect(screen.queryAllByLabelText('month-level')).toHaveLength(monthsCount);
  expect(screen.queryAllByLabelText('year-level')).toHaveLength(yearsCount);
  expect(screen.queryAllByLabelText('decade-level')).toHaveLength(decadesCount);
}

function expectHeaderLevel(level: 'month' | 'year' | 'decade', label: string) {
  expect(screen.getByLabelText(`${level}-level`).textContent).toBe(label);
}

async function clickNext(level: 'month' | 'year' | 'decade') {
  await userEvent.click(screen.getByLabelText(`next-${level}`));
}

async function clickPrevious(level: 'month' | 'year' | 'decade') {
  await userEvent.click(screen.getByLabelText(`previous-${level}`));
}

describe('@mantine/dates/CalendarLevels', () => {
  itSupportsMonthProps(CalendarLevels, defaultProps);
  itHandlesMonthKeyboardEvents(CalendarLevels, defaultProps);
  itHandlesControlsKeyboardEvents(CalendarLevels, 'year', '.mantine-MonthsList-monthsList', {
    ...defaultProps,
    level: 'year',
  });
  itHandlesControlsKeyboardEvents(CalendarLevels, 'decade', '.mantine-YearsList-yearsList', {
    ...defaultProps,
    level: 'decade',
  });

  it('sets correct aria-labels based on ariaLabels prop', () => {
    const testLabels = {
      monthLevelControl: 'test-month-level',
      yearLevelControl: 'test-year-level',
      decadeLevelControl: 'test-decade-level',
      nextMonth: 'test-next-month',
      previousMonth: 'test-previous-month',
      nextYear: 'test-next-year',
      previousYear: 'test-previous-year',
      nextDecade: 'test-next-decade',
      previousDecade: 'test-previous-decade',
    };

    const { rerender } = render(
      <CalendarLevels {...defaultProps} ariaLabels={testLabels} level="month" />
    );

    expect(screen.getByLabelText('test-month-level')).toBeInTheDocument();
    expect(screen.getByLabelText('test-next-month')).toBeInTheDocument();
    expect(screen.getByLabelText('test-previous-month')).toBeInTheDocument();

    rerender(<CalendarLevels {...defaultProps} ariaLabels={testLabels} level="year" />);
    expect(screen.getByLabelText('test-year-level')).toBeInTheDocument();
    expect(screen.getByLabelText('test-next-year')).toBeInTheDocument();
    expect(screen.getByLabelText('test-previous-year')).toBeInTheDocument();

    rerender(<CalendarLevels {...defaultProps} ariaLabels={testLabels} level="decade" />);
    expect(screen.getByLabelText('test-decade-level')).toBeInTheDocument();
    expect(screen.getByLabelText('test-next-decade')).toBeInTheDocument();
    expect(screen.getByLabelText('test-previous-decade')).toBeInTheDocument();
  });

  it('supports numberOfColumns', () => {
    const { rerender } = render(
      <CalendarLevels {...defaultProps} numberOfColumns={1} level="month" />
    );
    expectLevelsCount([1, 0, 0]);

    rerender(<CalendarLevels {...defaultProps} numberOfColumns={2} level="month" />);
    expectLevelsCount([2, 0, 0]);

    rerender(<CalendarLevels {...defaultProps} numberOfColumns={1} level="year" />);
    expectLevelsCount([0, 1, 0]);

    rerender(<CalendarLevels {...defaultProps} numberOfColumns={2} level="year" />);
    expectLevelsCount([0, 2, 0]);

    rerender(<CalendarLevels {...defaultProps} numberOfColumns={1} level="decade" />);
    expectLevelsCount([0, 0, 1]);

    rerender(<CalendarLevels {...defaultProps} numberOfColumns={2} level="decade" />);
    expectLevelsCount([0, 0, 2]);
  });

  it('changes level correctly', async () => {
    const { container } = render(<CalendarLevels {...defaultProps} />);
    expectLevelsCount([1, 0, 0]);

    await userEvent.click(screen.getByLabelText('month-level'));
    expectLevelsCount([0, 1, 0]);

    await userEvent.click(screen.getByLabelText('year-level'));
    expectLevelsCount([0, 0, 1]);

    await userEvent.click(container.querySelector('table button'));
    expectLevelsCount([0, 1, 0]);

    await userEvent.click(container.querySelector('table button'));
    expectLevelsCount([1, 0, 0]);
  });

  it('supports defaultLevel prop (uncontrolled)', async () => {
    render(<CalendarLevels {...defaultProps} defaultLevel="year" />);
    expectLevelsCount([0, 1, 0]);
    await userEvent.click(screen.getByLabelText('year-level'));
    expectLevelsCount([0, 0, 1]);
  });

  it('supports level prop (controlled)', async () => {
    render(<CalendarLevels {...defaultProps} level="year" />);
    expectLevelsCount([0, 1, 0]);
    await userEvent.click(screen.getByLabelText('year-level'));
    expectLevelsCount([0, 1, 0]);
  });

  it('calls onLevelChange when level changes', async () => {
    const spy = jest.fn();
    const { container } = render(<CalendarLevels {...defaultProps} onLevelChange={spy} />);

    await userEvent.click(screen.getByLabelText('month-level'));
    expect(spy).toHaveBeenCalledWith('year');

    await userEvent.click(screen.getByLabelText('year-level'));
    expect(spy).toHaveBeenCalledWith('decade');

    await userEvent.click(container.querySelector('table button'));
    expect(spy).toHaveBeenCalledWith('year');

    await userEvent.click(container.querySelector('table button'));
    expect(spy).toHaveBeenCalledWith('month');
  });

  it('renders correct header labels with defaultDate (uncontrolled)', async () => {
    render(<CalendarLevels {...defaultProps} defaultDate={new Date(2021, 3, 11)} />);
    expectHeaderLevel('month', 'April 2021');

    await userEvent.click(screen.getByLabelText('month-level'));
    expectHeaderLevel('year', '2021');

    await userEvent.click(screen.getByLabelText('year-level'));
    expectHeaderLevel('decade', '2019 – 2030');
  });

  it('renders correct header labels with date (controlled)', async () => {
    render(<CalendarLevels {...defaultProps} date={new Date(2021, 3, 11)} />);
    expectHeaderLevel('month', 'April 2021');

    await userEvent.click(screen.getByLabelText('month-level'));
    expectHeaderLevel('year', '2021');

    await userEvent.click(screen.getByLabelText('year-level'));
    expectHeaderLevel('decade', '2019 – 2030');
  });

  it('changes displayed date when next/previous controls are clicked with defaultDate prop (uncontrolled)', async () => {
    const { rerender } = render(<CalendarLevels {...defaultProps} level="month" />);
    expectHeaderLevel('month', 'April 2022');
    await clickNext('month');
    expectHeaderLevel('month', 'May 2022');
    await clickPrevious('month');
    expectHeaderLevel('month', 'April 2022');

    rerender(<CalendarLevels {...defaultProps} level="year" />);
    expectHeaderLevel('year', '2022');
    await clickNext('year');
    expectHeaderLevel('year', '2023');
    await clickPrevious('year');
    expectHeaderLevel('year', '2022');

    rerender(<CalendarLevels {...defaultProps} level="decade" />);
    expectHeaderLevel('decade', '2019 – 2030');
    await clickNext('decade');
    expectHeaderLevel('decade', '2029 – 2040');
    await clickPrevious('decade');
    expectHeaderLevel('decade', '2019 – 2030');
  });

  it('does not change date when next/previous controls are clicked with date prop (controlled)', async () => {
    const { rerender } = render(
      <CalendarLevels {...defaultProps} date={new Date(2022, 3, 11)} level="month" />
    );
    expectHeaderLevel('month', 'April 2022');
    await clickNext('month');
    expectHeaderLevel('month', 'April 2022');

    rerender(<CalendarLevels {...defaultProps} date={new Date(2022, 3, 11)} level="year" />);
    expectHeaderLevel('year', '2022');
    await clickNext('year');
    expectHeaderLevel('year', '2022');

    rerender(<CalendarLevels {...defaultProps} date={new Date(2022, 3, 11)} level="decade" />);
    expectHeaderLevel('decade', '2019 – 2030');
    await clickNext('decade');
    expectHeaderLevel('decade', '2019 – 2030');
  });

  it('calls onDateChange when date changes', async () => {
    const spy = jest.fn();
    const { rerender } = render(
      <CalendarLevels
        {...defaultProps}
        level="month"
        date={new Date(2022, 3, 11)}
        onDateChange={spy}
      />
    );

    await clickNext('month');
    expect(spy).toHaveBeenLastCalledWith(new Date(2022, 4, 11));

    await clickPrevious('month');
    expect(spy).toHaveBeenLastCalledWith(new Date(2022, 2, 11));

    rerender(
      <CalendarLevels
        {...defaultProps}
        level="year"
        date={new Date(2022, 3, 11)}
        onDateChange={spy}
      />
    );

    await clickNext('year');
    expect(spy).toHaveBeenLastCalledWith(new Date(2023, 3, 11));

    await clickPrevious('year');
    expect(spy).toHaveBeenLastCalledWith(new Date(2021, 3, 11));

    rerender(
      <CalendarLevels
        {...defaultProps}
        level="decade"
        date={new Date(2022, 3, 11)}
        onDateChange={spy}
      />
    );

    await clickNext('decade');
    expect(spy).toHaveBeenLastCalledWith(new Date(2032, 3, 11));

    await clickPrevious('decade');
    expect(spy).toHaveBeenLastCalledWith(new Date(2012, 3, 11));
  });
});
