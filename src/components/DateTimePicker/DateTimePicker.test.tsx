// import React from 'react';
// import { render, screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
import {
  itSupportsMonthsListProps,
  itSupportsYearsListProps,
  itSupportsClearableProps,
} from '../../tests';
import { DateTimePicker, DateTimePickerProps } from './DateTimePicker';

const defaultProps: DateTimePickerProps = {
  popoverProps: { withinPortal: false, transitionDuration: 0 },
  modalProps: { withinPortal: false, transitionDuration: 0 },
};

describe('@mantine/dates/DateTimePicker', () => {
  itSupportsClearableProps(DateTimePicker, { ...defaultProps, defaultValue: new Date() });
  itSupportsYearsListProps(DateTimePicker, {
    ...defaultProps,
    defaultLevel: 'decade',
    defaultValue: new Date(),
    popoverProps: { opened: true, withinPortal: false, transitionDuration: 0 },
  });
  itSupportsMonthsListProps(DateTimePicker, {
    ...defaultProps,
    defaultLevel: 'year',
    defaultValue: new Date(),
    popoverProps: { opened: true, withinPortal: false, transitionDuration: 0 },
  });

  // it('supports uncontrolled state', () => {});
});
