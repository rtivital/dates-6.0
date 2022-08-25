import React from 'react';
import { MonthView } from './MonthView';

export default { title: 'MonthView' };

export function Usage() {
  return (
    <div style={{ padding: 40 }}>
      <MonthView month={new Date(2022, 3, 11)} />
    </div>
  );
}
