import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import React, { useState } from 'react';
import { DateInput } from './DateInput';

dayjs.extend(customParseFormat);

export default { title: 'DateInput' };

export function Usage() {
  return (
    <div style={{ padding: 40, maxWidth: 400 }}>
      <DateInput placeholder="Enter date" minDate={new Date(2020, 0, 1)} />
    </div>
  );
}

export function ReadOnly() {
  return (
    <div style={{ padding: 40, maxWidth: 400 }}>
      <DateInput placeholder="Enter date" readOnly />
    </div>
  );
}

export function ValueFormat() {
  return (
    <div style={{ padding: 40, maxWidth: 400 }}>
      <DateInput placeholder="Enter date" valueFormat="DD/MM/YYYY" />
    </div>
  );
}

export function Controlled() {
  const [value, setValue] = useState(new Date(2022, 3, 11));
  return (
    <div style={{ padding: 40, maxWidth: 400 }}>
      <DateInput placeholder="Enter date" value={value} onChange={setValue} />
    </div>
  );
}
