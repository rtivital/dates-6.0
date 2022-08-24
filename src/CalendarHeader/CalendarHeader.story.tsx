import React from 'react';
import { CalendarHeader } from './CalendarHeader';

export default { title: 'CalendarHeader' };

export function Usage() {
  return (
    <div style={{ padding: 40, width: 300 }}>
      <CalendarHeader label="March 2022" />
    </div>
  );
}
