import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MonthLevelGroup, MonthLevelGroupProps } from './MonthLevelGroup';
import { itSupportsMonthProps, itSupportsHeaderProps, itSupportsOnDayClick } from '../__tests__';

const defaultProps: MonthLevelGroupProps = {
  month: new Date(2022, 3, 11),
  levelControlAriaLabel: () => 'level-control',
  nextLabel: 'next',
  previousLabel: 'prev',
};

describe('@mantine/dates/MonthLevelGroup', () => {
  itSupportsMonthProps(MonthLevelGroup, defaultProps);
  itSupportsHeaderProps(MonthLevelGroup, defaultProps);
  itSupportsOnDayClick(MonthLevelGroup, defaultProps);

  it('renders correct number of months based on numberOfColumns prop', () => {
    const { rerender } = render(<MonthLevelGroup {...defaultProps} numberOfColumns={1} />);
    expect(screen.getAllByLabelText('level-control')).toHaveLength(1);

    rerender(<MonthLevelGroup {...defaultProps} numberOfColumns={2} />);
    expect(screen.getAllByLabelText('level-control')).toHaveLength(2);

    rerender(<MonthLevelGroup {...defaultProps} numberOfColumns={3} />);
    expect(screen.getAllByLabelText('level-control')).toHaveLength(3);
  });

  it('renders correct months group based on month prop', () => {
    render(<MonthLevelGroup {...defaultProps} numberOfColumns={3} />);
    expect(screen.getAllByLabelText('level-control').map((node) => node.textContent)).toStrictEqual(
      ['April 2022', 'May 2022', 'June 2022']
    );
  });

  it('supports levelControlAriaLabel as string', () => {
    render(<MonthLevelGroup {...defaultProps} levelControlAriaLabel="test-label" />);
    expect(screen.getByText('April 2022')).toHaveAttribute('aria-label', 'test-label');
  });

  it('supports levelControlAriaLabel as function', () => {
    render(
      <MonthLevelGroup
        {...defaultProps}
        levelControlAriaLabel={(date) => `${date.getMonth()}/${date.getFullYear()}`}
      />
    );
    expect(screen.getByText('April 2022')).toHaveAttribute('aria-label', '3/2022');
  });

  it('handles arrow keyboard events correctly (numberOfColumns=1)', async () => {
    const { container } = render(<MonthLevelGroup {...defaultProps} numberOfColumns={1} />);
    const days = container.querySelectorAll('table button');

    await userEvent.click(days[0]);
    expect(days[0]).toHaveFocus();

    await userEvent.type(days[0], '{ArrowRight}', { skipClick: true });
    expect(days[1]).toHaveFocus();

    await userEvent.type(days[1], '{ArrowDown}', { skipClick: true });
    expect(days[8]).toHaveFocus();

    await userEvent.type(days[8], '{ArrowLeft}', { skipClick: true });
    expect(days[7]).toHaveFocus();

    await userEvent.type(days[7], '{ArrowUp}', { skipClick: true });
    expect(days[0]).toHaveFocus();
  });

  it('handles arrow keyboard events correctly (numberOfColumns=2)', async () => {
    const { container } = render(<MonthLevelGroup {...defaultProps} numberOfColumns={2} />);
    const months = container.querySelectorAll('.mantine-Month-month');
    const firstMonthDays = months[0].querySelectorAll('button');
    const secondMonthDays = months[1].querySelectorAll('button');

    await userEvent.click(firstMonthDays[5]);
    expect(firstMonthDays[5]).toHaveFocus();

    await userEvent.type(firstMonthDays[5], '{ArrowRight}', { skipClick: true });
    expect(firstMonthDays[6]).toHaveFocus();

    await userEvent.type(firstMonthDays[6], '{ArrowRight}', { skipClick: true });
    expect(secondMonthDays[0]).toHaveFocus();

    await userEvent.type(secondMonthDays[0], '{ArrowDown}', { skipClick: true });
    expect(secondMonthDays[7]).toHaveFocus();

    await userEvent.type(secondMonthDays[7], '{ArrowLeft}', { skipClick: true });
    expect(firstMonthDays[13]).toHaveFocus();
  });

  it('handles arrow keyboard events correctly at month edges', async () => {
    const { container } = render(<MonthLevelGroup {...defaultProps} numberOfColumns={1} />);
    const days = container.querySelectorAll('table button');

    await userEvent.type(days[6], '{ArrowRight}');
    expect(days[6]).toHaveFocus();

    await userEvent.type(days[0], '{ArrowLeft}');
    expect(days[0]).toHaveFocus();

    await userEvent.type(days[0], '{ArrowUp}');
    expect(days[0]).toHaveFocus();

    await userEvent.type(days[days.length - 1], '{ArrowDown}');
    expect(days[days.length - 1]).toHaveFocus();
  });

  it('has correct default __staticSelector', () => {
    const { container } = render(<MonthLevelGroup {...defaultProps} />);
    expect(container.firstChild).toHaveClass('mantine-MonthLevelGroup-monthLevelGroup');
    expect(container.querySelector('table button')).toHaveClass('mantine-MonthLevelGroup-day');
  });

  it('supports custom __staticSelector', () => {
    const { container } = render(<MonthLevelGroup {...defaultProps} __staticSelector="Calendar" />);
    expect(container.firstChild).toHaveClass('mantine-Calendar-monthLevelGroup');
    expect(container.querySelector('table button')).toHaveClass('mantine-Calendar-day');
  });

  it('supports styles api (styles)', () => {
    const { container } = render(
      <MonthLevelGroup
        {...defaultProps}
        styles={{
          monthLevelGroup: { borderColor: '#CCEE45' },
          day: { borderColor: '#443443' },
        }}
      />
    );

    expect(container.firstChild).toHaveStyle({ borderColor: '#CCEE45' });
    expect(container.querySelector('table button')).toHaveStyle({ borderColor: '#443443' });
  });

  it('supports styles api (classNames)', () => {
    const { container } = render(
      <MonthLevelGroup
        {...defaultProps}
        classNames={{ monthLevelGroup: 'test-group', day: 'test-day' }}
      />
    );

    expect(container.firstChild).toHaveClass('test-group');
    expect(container.querySelector('table button')).toHaveClass('test-day');
  });
});
