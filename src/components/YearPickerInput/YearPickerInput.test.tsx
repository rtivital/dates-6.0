import React from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { itSupportsClearableProps, itSupportsYearsListProps } from '../../tests';
import { YearPickerInput, YearPickerInputProps } from './YearPickerInput';

const defaultProps: YearPickerInputProps = {
  popoverProps: { withinPortal: false, transitionDuration: 0 },
  modalProps: { withinPortal: false, transitionDuration: 0 },
};

describe('@mantine/dates/YearPickerInput', () => {
  itSupportsClearableProps(YearPickerInput, { ...defaultProps, defaultValue: new Date() });
  itSupportsYearsListProps(YearPickerInput, {
    ...defaultProps,
    defaultValue: new Date(),
    popoverProps: { opened: true, withinPortal: false, transitionDuration: 0 },
  });

  it('toggles popover when input is clicked (dropdownType="popover")', async () => {
    const { container } = render(<YearPickerInput {...defaultProps} />);

    await userEvent.click(container.querySelector('[data-dates-input]'));
    expect(container.querySelector('[data-dates-dropdown]')).toBeInTheDocument();
    expect(container.querySelectorAll('[data-dates-modal]')).toHaveLength(0);

    await userEvent.click(container.querySelector('[data-dates-input]'));
    expect(container.querySelectorAll('[data-dates-dropdown]')).toHaveLength(0);
  });

  it('toggles modal when input is clicked (dropdownType="modal")', async () => {
    const { container } = render(<YearPickerInput {...defaultProps} dropdownType="modal" />);

    await userEvent.click(container.querySelector('[data-dates-input]'));
    expect(container.querySelector('[data-dates-modal]')).toBeInTheDocument();
    expect(container.querySelectorAll('[data-dates-popover]')).toHaveLength(0);

    await userEvent.click(container.querySelector('[data-dates-input]'));
    expect(container.querySelectorAll('[data-dates-modal]')).toHaveLength(0);
  });
});
