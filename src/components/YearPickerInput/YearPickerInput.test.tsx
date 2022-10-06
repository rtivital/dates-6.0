// import React from 'react';
// import { render } from '@testing-library/react';
import { itSupportsClearableProps, itSupportsYearsListProps } from '../../tests';
import { YearPickerInput, YearPickerInputProps } from './YearPickerInput';

const defaultProps: YearPickerInputProps = {};

describe('@mantine/dates/YearPickerInput', () => {
  itSupportsClearableProps(YearPickerInput, { ...defaultProps, defaultValue: new Date() });
  itSupportsYearsListProps(YearPickerInput, {
    ...defaultProps,
    defaultValue: new Date(),
    popoverProps: { opened: true, withinPortal: false, transitionDuration: 0 },
  });
});
