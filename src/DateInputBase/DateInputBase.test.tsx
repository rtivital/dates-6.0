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
  it('opens/toggles dropdown with click events', async () => {
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

  it('supports __staticSelector', () => {
    const { container } = render(
      <DateInputBase {...defaultProps} __staticSelector="TestStaticSelector" />
    );
    expect(container.firstChild).toHaveClass('mantine-TestStaticSelector-root');
    expect(screen.getByText('test-value')).toHaveClass('mantine-TestStaticSelector-input');
  });

  it('changes between Popover and Modal based on dropdownType prop', () => {
    const { rerender, container } = render(
      <DateInputBase {...defaultProps} dropdownOpened dropdownType="popover" />
    );

    expect(container.querySelector('.mantine-Popover-dropdown')).toBeInTheDocument();
    expect(container.querySelector('.mantine-Modal-root')).not.toBeInTheDocument();
    expect(screen.getByText('test-children')).toBeInTheDocument();

    rerender(<DateInputBase {...defaultProps} dropdownOpened dropdownType="modal" />);
    expect(container.querySelector('.mantine-Popover-dropdown')).not.toBeInTheDocument();
    expect(container.querySelector('.mantine-Modal-root')).toBeInTheDocument();
    expect(screen.getByText('test-children')).toBeInTheDocument();
  });

  it('supports onClick handler', async () => {
    const spy = jest.fn();
    render(<DateInputBase {...defaultProps} onClick={spy} />);
    await userEvent.click(screen.getByText('test-value'));
    expect(spy).toHaveBeenCalled();
  });

  it('displays placeholder if formattedValue is not provided', () => {
    const { rerender } = render(
      <DateInputBase {...defaultProps} formattedValue={null} placeholder="test-placeholder" />
    );

    expect(screen.getByText('test-placeholder')).toBeInTheDocument();
    rerender(
      <DateInputBase {...defaultProps} formattedValue="test-value" placeholder="test-placeholder" />
    );
    expect(screen.getByText('test-value')).toBeInTheDocument();
    expect(screen.queryAllByText('test-placeholder')).toHaveLength(0);
  });
});
