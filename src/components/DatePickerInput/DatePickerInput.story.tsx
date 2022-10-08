import dayjs from 'dayjs';
import React from 'react';
import { DatePickerInput } from './DatePickerInput';

export default { title: 'DatePickerInput' };

export function Usage() {
  return (
    <div style={{ padding: 40, maxWidth: 400 }}>
      <DatePickerInput
        label="Date picker input"
        placeholder="Pick date"
        numberOfColumns={3}
        allowDeselect
      />
    </div>
  );
}

export function Disabled() {
  return (
    <div style={{ padding: 40, maxWidth: 400 }}>
      <DatePickerInput label="Date picker input" placeholder="Pick date" disabled />
    </div>
  );
}

export function DropdownModal() {
  return (
    <div style={{ padding: 40, maxWidth: 400 }}>
      <DatePickerInput label="Date picker input" placeholder="Pick date" dropdownType="modal" />
    </div>
  );
}

export function Range() {
  return (
    <div style={{ padding: 40 }}>
      <DatePickerInput type="range" label="Date picker input" />
    </div>
  );
}

export function Multiple() {
  return (
    <div style={{ padding: 40 }}>
      <DatePickerInput type="multiple" label="Date picker input" />
    </div>
  );
}

export function SelectedDisabledDate() {
  return (
    <div style={{ padding: 40 }}>
      <DatePickerInput
        label="Date picker input"
        defaultValue={new Date()}
        getDayProps={(date) => ({ disabled: dayjs(date).isSame(new Date(), 'day') })}
      />
    </div>
  );
}

export function WithMaxDate() {
  return (
    <div style={{ padding: 40 }}>
      <DatePickerInput label="Date picker input" maxDate={new Date()} />
    </div>
  );
}

export function Clearable() {
  return (
    <div style={{ padding: 40 }}>
      <DatePickerInput label="Default" clearable />
      <DatePickerInput label="Multiple" type="multiple" clearable />
      <DatePickerInput label="Range" type="range" clearable />
    </div>
  );
}
