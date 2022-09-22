import React from 'react';
import { CalendarLevels } from './CalendarLevels';

export default { title: 'CalendarLevels' };

export function Usage() {
  return (
    <div style={{ padding: 40 }}>
      <CalendarLevels />
    </div>
  );
}

export function InitialLevelYear() {
  return (
    <div style={{ padding: 40 }}>
      <CalendarLevels defaultLevel="year" />
    </div>
  );
}

export function InitialLevelDecade() {
  return (
    <div style={{ padding: 40 }}>
      <CalendarLevels defaultLevel="decade" />
    </div>
  );
}
