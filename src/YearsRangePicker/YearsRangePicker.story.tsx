import React from 'react';
import { YearsRangePicker } from './YearsRangePicker';

export default { title: 'YearsRangePicker' };

export function Usage() {
  return (
    <div style={{ padding: 40 }}>
      <YearsRangePicker numberOfColumns={2} />
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
