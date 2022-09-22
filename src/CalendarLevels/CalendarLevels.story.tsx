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

export function NumberOfColumns() {
  return (
    <div style={{ padding: 40 }}>
      <div>1 column</div>
      <CalendarLevels mb={50} mt="xs" />

      <div>2 columns</div>
      <CalendarLevels numberOfColumns={2} mb={50} mt="xs" />

      <div>3 columns</div>
      <CalendarLevels numberOfColumns={3} mb={50} mt="xs" />
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
