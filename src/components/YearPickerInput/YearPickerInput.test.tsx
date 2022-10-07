import {
  itSupportsClearableProps,
  itSupportsYearsListProps,
  itSupportsDateInputProps,
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
});
