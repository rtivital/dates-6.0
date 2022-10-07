import React from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { itSupportsClearableProps, itSupportsYearsListProps } from '../../tests';
import { YearPickerInput } from './YearPickerInput';

const defaultProps = {
  popoverProps: { withinPortal: false, transitionDuration: 0 },
  modalProps: { withinPortal: false, transitionDuration: 0 },
};

function expectValue(container: HTMLElement, value: string) {
  expect(container.querySelector('[data-dates-input]').textContent).toBe(value);
}

function clickInput(container: HTMLElement) {
  return userEvent.click(container.querySelector('[data-dates-input]'));
}

function expectOpenedPopover(container: HTMLElement) {
  expect(container.querySelector('[data-dates-dropdown]')).toBeInTheDocument();
}

function expectNoPopover(container: HTMLElement) {
  expect(container.querySelectorAll('[data-dates-dropdown]')).toHaveLength(0);
}

function expectOpenedModal(container: HTMLElement) {
  expect(container.querySelector('[data-dates-modal]')).toBeInTheDocument();
}

function expectNoModal(container: HTMLElement) {
  expect(container.querySelectorAll('[data-dates-modal]')).toHaveLength(0);
}

function clickControl(container: HTMLElement, index: number) {
  return userEvent.click(container.querySelectorAll('table button')[index]);
}

describe('@mantine/dates/YearPickerInput', () => {
  itSupportsClearableProps(YearPickerInput, { ...defaultProps, defaultValue: new Date() });
  itSupportsYearsListProps(YearPickerInput, {
    ...defaultProps,
    defaultValue: new Date(),
    popoverProps: { opened: true, withinPortal: false, transitionDuration: 0 },
  });

  it('toggles popover when input is clicked (dropdownType="popover")', async () => {
    const { container } = render(<YearPickerInput {...defaultProps} />);

    await clickInput(container);
    expectOpenedPopover(container);
    expectNoModal(container);

    await clickInput(container);
    expectNoPopover(container);
  });

  it('toggles modal when input is clicked (dropdownType="modal")', async () => {
    const { container } = render(<YearPickerInput {...defaultProps} dropdownType="modal" />);

    await clickInput(container);
    expectOpenedModal(container);
    expectNoPopover(container);

    await clickInput(container);
    expectNoModal(container);
  });

  it('closes dropdown when date is selected (type="default")', async () => {
    const { container } = render(<YearPickerInput {...defaultProps} />);
    expectNoPopover(container);

    await clickInput(container);
    expectOpenedPopover(container);

    await clickControl(container, 0);
    expectNoPopover(container);
  });

  it('closes dropdown when dates range is selected (type="range")', async () => {
    const { container } = render(<YearPickerInput {...defaultProps} type="range" />);
    expectNoPopover(container);

    await clickInput(container);
    expectOpenedPopover(container);

    await clickControl(container, 0);
    expectOpenedPopover(container);

    await clickControl(container, 3);
    expectNoPopover(container);
  });

  it('does not close dropdown when date is selected if closeOnChange is set to false (type="default")', async () => {
    const { container } = render(
      <YearPickerInput {...defaultProps} type="default" closeOnChange={false} />
    );
    expectNoPopover(container);

    await clickInput(container);
    expectOpenedPopover(container);

    await clickControl(container, 0);
    expectOpenedPopover(container);

    await clickControl(container, 3);
    expectOpenedPopover(container);
  });

  it('does not close dropdown when dates range is selected if closeOnChange is set to false (type="range")', async () => {
    const { container } = render(
      <YearPickerInput {...defaultProps} type="range" closeOnChange={false} />
    );
    expectNoPopover(container);

    await clickInput(container);
    expectOpenedPopover(container);

    await clickControl(container, 0);
    expectOpenedPopover(container);

    await clickControl(container, 3);
    expectOpenedPopover(container);
  });

  it('supports uncontrolled state (type="default")', async () => {
    const { container } = render(
      <YearPickerInput {...defaultProps} placeholder="test-placeholder" />
    );
    expectValue(container, 'test-placeholder');

    await clickInput(container);
    await clickControl(container, 0);
    expectValue(container, '2020');

    await clickInput(container);
    await clickControl(container, 3);
    expectValue(container, '2023');
  });
});
