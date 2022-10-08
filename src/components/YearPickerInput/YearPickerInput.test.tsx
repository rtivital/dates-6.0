import React from 'react';
import { render } from '@testing-library/react';
import {
  itSupportsClearableProps,
  itSupportsYearsListProps,
  itSupportsDateInputProps,
  expectValue,
} from '../../tests';
import { YearPickerInput } from './YearPickerInput';

const defaultProps = {
  popoverProps: { withinPortal: false, transitionDuration: 0 },
  modalProps: { withinPortal: false, transitionDuration: 0 },
};

describe('@mantine/dates/YearPickerInput', () => {
  itSupportsDateInputProps(YearPickerInput, defaultProps);
  itSupportsClearableProps(YearPickerInput, { ...defaultProps, defaultValue: new Date() });
  itSupportsYearsListProps(YearPickerInput, {
    ...defaultProps,
    defaultValue: new Date(),
    popoverProps: { opened: true, withinPortal: false, transitionDuration: 0 },
  });

  it('supports valueFormat prop', () => {
    const { container, rerender } = render(
      <YearPickerInput {...defaultProps} valueFormat="YY" value={new Date(2022, 3, 11)} />
    );
    expectValue(container, '22');

    rerender(
      <YearPickerInput
        {...defaultProps}
        type="multiple"
        valueFormat="YY"
        value={[new Date(2022, 3, 11), new Date(2024, 3, 11)]}
      />
    );
    expectValue(container, '22, 24');

    rerender(
      <YearPickerInput
        {...defaultProps}
        type="range"
        valueFormat="YY"
        value={[new Date(2022, 3, 11), new Date(2024, 3, 11)]}
      />
    );
    expectValue(container, '22 – 24');
  });
});
