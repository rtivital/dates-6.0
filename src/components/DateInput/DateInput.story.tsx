import React from 'react';
import { DateInput } from './DateInput';

export default { title: 'DateInput' };

export function Usage() {
  return (
    <div style={{ padding: 40, maxWidth: 400 }}>
      <DateInput placeholder="Enter date" />
    </div>
  );
}
