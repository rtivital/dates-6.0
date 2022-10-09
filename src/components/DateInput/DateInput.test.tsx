import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { expectNoPopover, expectOpenedPopover, expectValue, clickControl } from '../../tests';
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
});
