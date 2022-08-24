import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { CalendarHeader, CalendarHeaderProps } from './CalendarHeader';

const defaultProps: CalendarHeaderProps = {
  nextLabel: 'next',
  previousLabel: 'prev',
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
});
