import React from 'react';
import { YearPickerInput } from './YearPickerInput';

export default { title: 'YearPickerInput' };

export function Usage() {
  return (
    <div style={{ padding: 40, maxWidth: 400 }}>
      <YearPickerInput label="Year picker input" placeholder="Pick year" numberOfColumns={3} />
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
