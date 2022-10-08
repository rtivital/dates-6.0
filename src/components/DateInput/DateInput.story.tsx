import React, { useState } from 'react';
import { DateInput } from './DateInput';

export default { title: 'DateInput' };

export function Usage() {
  return (
    <div style={{ padding: 40, maxWidth: 400 }}>
      <DateInput placeholder="Enter date" minDate={new Date(2020, 0, 1)} />
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
