import React, { useState } from 'react';
import { YearPicker } from './YearPicker';

export default { title: 'YearPicker' };

export function Usage() {
  return (
    <div style={{ padding: 40 }}>
      <YearPicker />
    </div>
  );
}

export function AllowDeselect() {
  return (
    <div style={{ padding: 40 }}>
      <YearPicker allowDeselect />
    </div>
  );
}

export function Controlled() {
  const [value, setValue] = useState<Date | null>(null);
  return (
    <div style={{ padding: 40 }}>
      <YearPicker value={value} onChange={setValue} numberOfColumns={3} columnsToScroll={1} />
      {value?.toISOString()}
    </div>
  );
}
