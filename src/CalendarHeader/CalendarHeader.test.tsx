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

  it('handles focus as usual when __preventFocus is set to false', async () => {
    render(<CalendarHeader {...defaultProps} __preventFocus={false} label="test-label" />);
    await userEvent.click(screen.getByLabelText('next'));
    expect(screen.getByLabelText('next')).toHaveFocus();

    await userEvent.click(screen.getByText('test-label'));
    expect(screen.getByText('test-label')).toHaveFocus();

    await userEvent.click(screen.getByLabelText('prev'));
    expect(screen.getByLabelText('prev')).toHaveFocus();
  });

  it('does not focus controls on click when __preventFocus is set to true', async () => {
    render(<CalendarHeader {...defaultProps} __preventFocus label="test-label" />);

    await userEvent.click(screen.getByLabelText('next'));
    expect(document.body).toHaveFocus();

    await userEvent.click(screen.getByText('test-label'));
    expect(document.body).toHaveFocus();

    await userEvent.click(screen.getByLabelText('prev'));
    expect(document.body).toHaveFocus();
  });

  it('supports hasNext prop', () => {
    const { rerender } = render(<CalendarHeader {...defaultProps} hasNext />);
    expect(screen.getByLabelText('next')).not.toHaveAttribute('data-disabled');
    expect(screen.getByLabelText('next')).not.toHaveAttribute('disabled');

    rerender(<CalendarHeader {...defaultProps} hasNext={false} />);
    expect(screen.getByLabelText('next')).toHaveAttribute('data-disabled');
    expect(screen.getByLabelText('next')).toHaveAttribute('disabled');
  });

  it('supports hasPrevious prop', () => {
    const { rerender } = render(<CalendarHeader {...defaultProps} hasPrevious />);
    expect(screen.getByLabelText('prev')).not.toHaveAttribute('data-disabled');
    expect(screen.getByLabelText('prev')).not.toHaveAttribute('disabled');

    rerender(<CalendarHeader {...defaultProps} hasPrevious={false} />);
    expect(screen.getByLabelText('prev')).toHaveAttribute('data-disabled');
    expect(screen.getByLabelText('prev')).toHaveAttribute('disabled');
  });

  it('supports hasNextLevel prop', () => {
    const { rerender } = render(
      <CalendarHeader {...defaultProps} label="test-level" hasNextLevel />
    );
    expect(screen.getByText('test-level')).not.toHaveAttribute('data-static');

    rerender(<CalendarHeader {...defaultProps} label="test-level" hasNextLevel={false} />);
    expect(screen.getByText('test-level')).toHaveAttribute('data-static');
  });

  it('does not call onLevelChange when level is clicked and hasNextLevel is false', async () => {
    const spy = jest.fn();
    const { rerender } = render(
      <CalendarHeader {...defaultProps} label="test-level" hasNextLevel onLevelChange={spy} />
    );

    await userEvent.click(screen.getByText('test-level'));
    expect(spy).toHaveBeenCalledTimes(1);

    rerender(
      <CalendarHeader
        {...defaultProps}
        label="test-level"
        hasNextLevel={false}
        onLevelChange={spy}
      />
    );

    await userEvent.click(screen.getByText('test-level'));
    expect(spy).toHaveBeenCalledTimes(1);
  });
});
