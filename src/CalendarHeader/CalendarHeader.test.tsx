import { render, screen } from '@testing-library/react';
import React from 'react';
import { CalendarHeader, CalendarHeaderProps } from './CalendarHeader';

const defaultProps: CalendarHeaderProps = {};

describe('@mantine/dates/CalendarHeader', () => {
  it('supports nextIcon and previousIcon props', () => {
    const { container } = render(
      <CalendarHeader
        {...defaultProps}
        nextIcon="test-next-icon"
        previousIcon="test-previous-icon"
      />
    );

    expect(container.querySelector('[data-next]').textContent).toBe('test-next-icon');
    expect(container.querySelector('[data-previous]').textContent).toBe('test-previous-icon');
  });
});
