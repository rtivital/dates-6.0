import dayjs from 'dayjs';
import React from 'react';
import { YearPickerInput } from './YearPickerInput';

export default { title: 'YearPickerInput' };

export function Usage() {
  return (
    <div style={{ padding: 40, maxWidth: 400 }}>
      <YearPickerInput
        label="Year picker input"
        placeholder="Pick year"
        numberOfColumns={3}
        closeOnChange={false}
      />
    </div>
  );
}

export function DropdownModal() {
  return (
    <div style={{ padding: 40, maxWidth: 400 }}>
      <YearPickerInput label="Year picker input" placeholder="Pick year" dropdownType="modal" />
    </div>
  );
}

export function Range() {
  return (
    <div style={{ padding: 40 }}>
      <YearPickerInput type="range" label="Year picker input" />
    </div>
  );
}

export function Multiple() {
  return (
    <div style={{ padding: 40 }}>
      <YearPickerInput type="multiple" label="Year picker input" />
    </div>
  );
}

export function SelectedDisabledYear() {
  return (
    <div style={{ padding: 40 }}>
      <YearPickerInput
        label="Year picker input"
        defaultValue={new Date()}
        getYearControlProps={(date) => ({ disabled: dayjs(date).isSame(new Date(), 'year') })}
      />
    </div>
  );
}

export function WithMaxDate() {
  return (
    <div style={{ padding: 40 }}>
      <YearPickerInput label="Year picker input" maxDate={new Date()} />
    </div>
  );
}

export function Clearable() {
  return (
    <div style={{ padding: 40 }}>
      <YearPickerInput label="Default" clearable />
      <YearPickerInput label="Multiple" type="multiple" clearable />
      <YearPickerInput label="Range" type="range" clearable />
    </div>
  );
}
