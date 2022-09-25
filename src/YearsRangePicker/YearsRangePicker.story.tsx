import React, { useState } from 'react';
import { RangeValue } from '../types';
import { YearsRangePicker } from './YearsRangePicker';

export default { title: 'YearsRangePicker' };

export function Usage() {
  return (
    <div style={{ padding: 40 }}>
      <YearsRangePicker numberOfColumns={2} />
    </div>
  );
}

export function Controlled() {
  const [value, setValue] = useState<RangeValue>([new Date(2022, 3, 11), null]);

  return (
    <div style={{ padding: 40 }}>
      <YearsRangePicker numberOfColumns={2} value={value} onChange={setValue} />
      {value.map((item) => (item ? item.toISOString() : 'ns')).join(' – ')}
    </div>
  );
}

export function AllowSingleDateInRange() {
  return (
    <div style={{ padding: 40 }}>
      <YearsRangePicker numberOfColumns={2} allowSingleDateInRange />
    </div>
  );
}
