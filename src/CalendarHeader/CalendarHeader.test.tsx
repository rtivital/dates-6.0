import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { itSupportsHeaderProps } from '../__tests__';
import { CalendarHeader, CalendarHeaderProps } from './CalendarHeader';

const defaultProps: CalendarHeaderProps = {
  nextLabel: 'next',
  previousLabel: 'prev',
  label: '',
};

describe('@mantine/dates/CalendarHeader', () => {
  itSupportsHeaderProps(CalendarHeader, defaultProps);

  it('renders given label', () => {
    render(<CalendarHeader {...defaultProps} label="test-label" />);
    expect(screen.getByText('test-label')).toBeInTheDocument();
  });

  it('supports levelControlAriaLabel', () => {
    render(
      <CalendarHeader {...defaultProps} label="test-label" levelControlAriaLabel="Change month" />
    );

    expect(screen.getByText('test-label')).toHaveAttribute('aria-label', 'Change month');
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
});
