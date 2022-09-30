import { DatePickerType, DatePickerValue } from '../types';
import { useDatesContext } from '../DatesProvider';
import { useUncontrolledDates } from './use-uncontrolled-dates';
import { getFormattedDate } from './get-formatted-date';

interface UseDatesInput<Type extends DatePickerType = 'default'> {
  type: Type;
  value: DatePickerValue<Type>;
  defaultValue: DatePickerValue<Type>;
  onChange(value: DatePickerValue<Type>): void;
  locale: string;
  format: string;
}

export function useDatesInput<Type extends DatePickerType = 'default'>({
  type,
  value,
  defaultValue,
  onChange,
  locale,
  format,
}: UseDatesInput<Type>) {
  const ctx = useDatesContext();
  const [_value, setValue] = useUncontrolledDates({
    type,
    value,
    defaultValue,
    onChange,
  });

  const formattedValue = getFormattedDate({
    type,
    date: _value,
    locale: ctx.getLocale(locale),
    format,
  });

  return {
    _value,
    setValue,
    formattedValue,
  };
}
