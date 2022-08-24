import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { CalendarHeader, CalendarHeaderProps } from './CalendarHeader';

const defaultProps: CalendarHeaderProps = {
  nextLabel: 'next',
  previousLabel: 'prev',
  label: '',
};

describe('@mantine/dates/CalendarHeader', () => {
  it('supports nextIcon and previousIcon props', () => {
    render(
      <CalendarHeader
        {...defaultProps}
        nextIcon="test-next-icon"
        previousIcon="test-previous-icon"
      />
    );

    expect(screen.getByLabelText('next').textContent).toBe('test-next-icon');
    expect(screen.getByLabelText('prev').textContent).toBe('test-previous-icon');
  });

  it('supports nextLabel and previousLabel props', () => {
    const { container } = render(
      <CalendarHeader
        {...defaultProps}
        nextLabel="test-next-label"
        previousLabel="test-previous-label"
      />
    );

    expect(container.querySelector('[data-next]')).toHaveAttribute('aria-label', 'test-next-label');
    expect(container.querySelector('[data-previous]')).toHaveAttribute(
      'aria-label',
      'test-previous-label'
    );
  });

  it('supports onNext and onPrevious props', async () => {
    const onNext = jest.fn();
    const onPrevious = jest.fn();
    render(<CalendarHeader {...defaultProps} onNext={onNext} onPrevious={onPrevious} />);

    await userEvent.click(screen.getByLabelText('next'));
    expect(onNext).toHaveBeenCalledTimes(1);
    expect(onPrevious).toHaveBeenCalledTimes(0);

    await userEvent.click(screen.getByLabelText('prev'));
    expect(onNext).toHaveBeenCalledTimes(1);
    expect(onPrevious).toHaveBeenCalledTimes(1);
  });

  it('renders given label', () => {
    render(<CalendarHeader {...defaultProps} label="test-label" />);
    expect(screen.getByText('test-label')).toBeInTheDocument();
  });

  it('calls onLevelChange when level control is clicked', async () => {
    const spy = jest.fn();
    render(<CalendarHeader {...defaultProps} label="click me" onLevelChange={spy} />);

    await userEvent.click(screen.getByText('click me'));
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('has correct default __staticSelector', () => {
    render(<CalendarHeader {...defaultProps} />);
    expect(screen.getByLabelText('next')).toHaveClass(
      'mantine-CalendarHeader-calendarHeaderControl'
    );
  });

  it('supports custom __staticSelector', () => {
    render(<CalendarHeader {...defaultProps} __staticSelector="Calendar" />);
    expect(screen.getByLabelText('next')).toHaveClass('mantine-Calendar-calendarHeaderControl');
  });

  it('supports styles api (styles)', () => {
    render(
      <CalendarHeader
        {...defaultProps}
        styles={{ calendarHeaderControl: { borderColor: '#CECECE' } }}
      />
    );

    expect(screen.getByLabelText('next')).toHaveStyle({ borderColor: '#CECECE' });
  });

  it('supports styles api (classNames)', () => {
    render(
      <CalendarHeader {...defaultProps} classNames={{ calendarHeaderControl: 'test-control' }} />
    );
    expect(screen.getByLabelText('next')).toHaveClass('test-control');
  });
});
