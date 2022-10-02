import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { DateInputBase, DateInputBaseProps } from './DateInputBase';

const noop = () => {};

const defaultProps: DateInputBaseProps = {
  dropdownOpened: false,
  dropdownHandlers: { open: noop, close: noop, toggle: noop },
  formattedValue: 'test-value',
  __staticSelector: 'DateInputBase',
  children: 'test-children',
  modalProps: { withinPortal: false, transitionDuration: 0 },
  popoverProps: { transitionDuration: 0 },
};

describe('@mantine/dates/DateInputBase', () => {
  it('opens toggles dropdown when ', async () => {
    const toggle = jest.fn();
    const close = jest.fn();
    const { rerender } = render(
      <DateInputBase {...defaultProps} dropdownHandlers={{ toggle, close, open: noop }} />
    );

    await userEvent.click(screen.getByText('test-value'));
    expect(toggle).toHaveBeenCalled();
    expect(close).not.toHaveBeenCalled();

    rerender(
      <DateInputBase
        {...defaultProps}
        dropdownOpened
        dropdownHandlers={{ toggle, close, open: noop }}
      />
    );

    await userEvent.click(document.body);
    expect(close).toHaveBeenCalled();
  });
});
