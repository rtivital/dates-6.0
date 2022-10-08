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

  it('has correct default __staticSelector', () => {
    const { container } = render(
      <YearPickerInput
        {...defaultProps}
        popoverProps={{ opened: true, withinPortal: false, transitionDuration: 0 }}
      />
    );
    expect(container.firstChild).toHaveClass('mantine-YearPickerInput-root');
    expect(container.querySelector('[data-dates-input]')).toHaveClass(
      'mantine-YearPickerInput-input'
    );

    expect(container.querySelector('table button')).toHaveClass(
      'mantine-YearPickerInput-calendarPickerControl'
    );
  });

  it('has supports styles api (classNames)', () => {
    const { container } = render(
      <YearPickerInput
        {...defaultProps}
        popoverProps={{ opened: true, withinPortal: false, transitionDuration: 0 }}
        classNames={{
          root: 'test-root',
          input: 'test-input',
          calendarPickerControl: 'test-control',
        }}
      />
    );
    expect(container.firstChild).toHaveClass('test-root');
    expect(container.querySelector('[data-dates-input]')).toHaveClass('test-input');
    expect(container.querySelector('table button')).toHaveClass('test-control');
  });

  it('has supports styles api (styles)', () => {
    const { container } = render(
      <YearPickerInput
        {...defaultProps}
        popoverProps={{ opened: true, withinPortal: false, transitionDuration: 0 }}
        styles={{
          root: { borderColor: '#CCEE45' },
          input: { borderColor: '#EB4522' },
          calendarPickerControl: { borderColor: '#EE4533' },
        }}
      />
    );
    expect(container.firstChild).toHaveStyle({ borderColor: '#CCEE45' });
    expect(container.querySelector('[data-dates-input]')).toHaveStyle({ borderColor: '#EB4522' });
    expect(container.querySelector('table button')).toHaveStyle({ borderColor: '#EE4533' });
  });
});
