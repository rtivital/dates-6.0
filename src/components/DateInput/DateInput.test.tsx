import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {
  expectNoPopover,
  expectOpenedPopover,
  expectValue,
  clickControl,
  itSupportsClearableProps,
} from '../../tests';
import { DateInput, DateInputProps } from './DateInput';

const defaultProps: DateInputProps = {
  defaultDate: new Date(2022, 3, 11),
  popoverProps: { transitionDuration: 0, withinPortal: false },
  ariaLabels: {
    monthLevelControl: 'level-control',
    yearLevelControl: 'level-control',
    decadeLevelControl: 'level-control',
    nextMonth: 'next',
    previousMonth: 'previous',
    nextYear: 'next',
    previousYear: 'previous',
    nextDecade: 'next',
    previousDecade: 'previous',
  },
};

function getInput(container: HTMLElement) {
  return container.querySelector('[data-dates-input]');
}

describe('@mantine/dates/DateInput', () => {
  itSupportsClearableProps(DateInput, { ...defaultProps, defaultValue: new Date(2022, 3, 11) });

  it('opens/closes dropdown when input is focused/blurred', async () => {
    const { container } = render(<DateInput {...defaultProps} />);
    expectNoPopover(container);

    await userEvent.tab();
    expect(getInput(container)).toHaveFocus();
    expectOpenedPopover(container);

    await userEvent.tab();
    expect(document.body).toHaveFocus();
    expectNoPopover(container);
  });

  it('closes popover after date control was clicked', async () => {
    const { container } = render(<DateInput {...defaultProps} />);
    await userEvent.tab();
    await clickControl(container, 10);
    expectNoPopover(container);
  });

  it('opens popover when input is clicked', async () => {
    const { container } = render(<DateInput {...defaultProps} />);
    await userEvent.tab();
    await clickControl(container, 10);
    await userEvent.click(getInput(container));
    expectOpenedPopover(container);
  });

  it('allows changing levels in popover', async () => {
    const { container } = render(<DateInput {...defaultProps} />);
    await userEvent.tab();
    await userEvent.click(screen.getByLabelText('level-control'));
    await userEvent.click(screen.getByLabelText('level-control'));
    await userEvent.click(screen.getByLabelText('previous'));
    await userEvent.click(container.querySelector('table button'));
    await userEvent.click(container.querySelector('table button'));
    await userEvent.click(container.querySelectorAll('table button')[4]);
    expect(getInput(container)).toHaveFocus();
    expectValue(container, 'January 1, 2010');
  });

  it('supports uncontrolled state (dropdown click)', async () => {
    const { container } = render(<DateInput {...defaultProps} />);
    await userEvent.tab();
    await clickControl(container, 4);
    expectValue(container, 'April 1, 2022');
  });

  it('supports controlled state (dropdown click)', async () => {
    const spy = jest.fn();
    const { container } = render(
      <DateInput {...defaultProps} value={new Date(2022, 3, 11)} onChange={spy} />
    );
    await userEvent.tab();
    await clickControl(container, 4);
    expectValue(container, 'April 11, 2022');
    expect(spy).toHaveBeenCalledWith(new Date(2022, 3, 1));
  });

  it('supports uncontrolled state (free input)', async () => {
    const { container } = render(<DateInput {...defaultProps} />);
    await userEvent.tab();
    await userEvent.type(getInput(container), 'April 1, 2022');
    await userEvent.tab();
    expectValue(container, 'April 1, 2022');
  });

  it('supports controlled state (free input)', async () => {
    const spy = jest.fn();
    const { container } = render(
      <DateInput {...defaultProps} value={new Date(2022, 3, 11)} onChange={spy} />
    );
    await userEvent.tab();
    await userEvent.clear(getInput(container));
    await userEvent.type(getInput(container), 'April 1, 2022');
    await userEvent.tab();
    expectValue(container, 'April 11, 2022');
    expect(spy).toHaveBeenLastCalledWith(new Date(2022, 3, 1));
  });

  it('clears input when clear button is clicked (uncontrolled)', async () => {
    const { container } = render(
      <DateInput
        {...defaultProps}
        clearable
        defaultValue={new Date(2022, 3, 11)}
        clearButtonProps={{ 'aria-label': 'clear-button' }}
      />
    );

    expectValue(container, 'April 11, 2022');
    await userEvent.click(screen.getByLabelText('clear-button'));
    expectValue(container, '');
  });

  it('clears input when clear button is clicked (controlled)', async () => {
    const spy = jest.fn();
    const { container } = render(
      <DateInput
        {...defaultProps}
        clearable
        value={new Date(2022, 3, 11)}
        onChange={spy}
        clearButtonProps={{ 'aria-label': 'clear-button' }}
      />
    );

    expectValue(container, 'April 11, 2022');
    await userEvent.click(screen.getByLabelText('clear-button'));
    expectValue(container, 'April 11, 2022');
    expect(spy).toHaveBeenLastCalledWith(null);
  });

  it('allows to clear input value when allowDeselect is set (uncontrolled)', async () => {
    const { container } = render(
      <DateInput {...defaultProps} allowDeselect defaultValue={new Date(2022, 3, 11)} />
    );

    expectValue(container, 'April 11, 2022');
    await userEvent.clear(getInput(container));
    await userEvent.tab();
    expectValue(container, '');
  });

  it('does not allow to clear input value when allowDeselect is set (uncontrolled)', async () => {
    const { container } = render(
      <DateInput {...defaultProps} allowDeselect={false} defaultValue={new Date(2022, 3, 11)} />
    );

    expectValue(container, 'April 11, 2022');
    await userEvent.clear(getInput(container));
    await userEvent.tab();
    expectValue(container, 'April 11, 2022');
  });

  it('allows to clear input value when allowDeselect is set (controlled)', async () => {
    const spy = jest.fn();
    const { container } = render(
      <DateInput {...defaultProps} allowDeselect value={new Date(2022, 3, 11)} onChange={spy} />
    );

    expectValue(container, 'April 11, 2022');
    await userEvent.clear(getInput(container));
    await userEvent.tab();
    expectValue(container, 'April 11, 2022');
    expect(spy).toHaveBeenLastCalledWith(null);
  });
});
