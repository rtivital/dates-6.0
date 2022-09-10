import React from 'react';
import { MonthsList } from './MonthsList';

export default { title: 'MonthsList' };

export function Usage() {
  return (
    <div style={{ padding: 40, width: 320 }}>
      <MonthsList year={new Date()} />
    </div>
  );
}
