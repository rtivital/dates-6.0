import React from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { itSupportsClearableProps, itSupportsYearsListProps } from '../../tests';
import { YearPickerInput } from './YearPickerInput';

const defaultProps = {
  popoverProps: { withinPortal: false, transitionDuration: 0 },
  modalProps: { withinPortal: false, transitionDuration: 0 },
};

function getInputValue(container: HTMLElement) {
  return container.querySelector('[data-dates-input]').textContent;
}

function expectValue(container: HTMLElement, value: string) {
  expect(getInputValue(container)).toBe(value);
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

  it('does not close dropdown when date is selected (type="multiple")', async () => {
    const { container } = render(<YearPickerInput {...defaultProps} type="multiple" />);
    expectNoPopover(container);

    await clickInput(container);
    expectOpenedPopover(container);

    await clickControl(container, 0);
    expectOpenedPopover(container);

    await clickControl(container, 3);
    expectOpenedPopover(container);
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

  it('supports uncontrolled state (type="range")', async () => {
    const { container } = render(
      <YearPickerInput {...defaultProps} type="range" placeholder="test-placeholder" />
    );
    expectValue(container, 'test-placeholder');

    await clickInput(container);
    await clickControl(container, 0);
    expectValue(container, '2020 – ');

    await clickControl(container, 3);
    expectValue(container, '2020 – 2023');
  });

  it('supports uncontrolled state (type="multiple")', async () => {
    const { container } = render(
      <YearPickerInput {...defaultProps} type="multiple" placeholder="test-placeholder" />
    );
    expectValue(container, 'test-placeholder');

    await clickInput(container);
    await clickControl(container, 0);
    expectValue(container, '2020');

    await clickControl(container, 3);
    expectValue(container, '2020, 2023');

    await clickControl(container, 5);
    expectValue(container, '2020, 2023, 2025');
  });

  it('supports controlled state (type="default")', async () => {
    const spy = jest.fn();
    const { container } = render(
      <YearPickerInput
        {...defaultProps}
        type="default"
        value={new Date(2022, 3, 11)}
        onChange={spy}
      />
    );

    const initialValue = getInputValue(container);
    expect(initialValue).not.toBe('');

    await clickInput(container);
    await clickControl(container, 0);
    expect(spy).toHaveBeenCalledWith(expect.any(Date));
    expect(getInputValue(container)).toBe(initialValue);
  });

  it('supports controlled state (type="range")', async () => {
    const spy = jest.fn();
    const { container } = render(
      <YearPickerInput
        {...defaultProps}
        type="range"
        value={[new Date(2022, 3, 11), null]}
        onChange={spy}
      />
    );

    const initialValue = getInputValue(container);
    expect(initialValue).not.toBe('');

    await clickInput(container);
    await clickControl(container, 0);
    expect(spy).toHaveBeenCalledWith(expect.arrayContaining([expect.any(Date)]));
    expect(spy).toHaveBeenCalledWith(expect.not.arrayContaining([null]));
    expect(getInputValue(container)).toBe(initialValue);
  });

  it('supports controlled state (type="multiple")', async () => {
    const spy = jest.fn();
    const { container } = render(
      <YearPickerInput
        {...defaultProps}
        type="multiple"
        value={[new Date(2022, 3, 11)]}
        onChange={spy}
      />
    );

    const initialValue = getInputValue(container);
    expect(initialValue).not.toBe('');

    await clickInput(container);
    await clickControl(container, 0);
    expect(spy).toHaveBeenCalledWith(expect.arrayContaining([expect.any(Date)]));
    expect(spy).toHaveBeenCalledWith(expect.not.arrayContaining([null]));
    expect(getInputValue(container)).toBe(initialValue);
  });
});
