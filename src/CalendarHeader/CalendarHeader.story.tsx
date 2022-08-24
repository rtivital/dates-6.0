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

export function DisabledControls() {
  return (
    <div style={{ padding: 40, width: 300 }}>
      <CalendarHeader label="March 2022" hasNext={false} hasPrevious={false} hasNextLevel={false} />
    </div>
  );
}

export function Unstyled() {
  return (
    <div style={{ padding: 40, width: 300 }}>
      <CalendarHeader label="March 2022" unstyled />
    </div>
  );
}
