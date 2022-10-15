import React from 'react';
import { DateTimePicker } from './DateTimePicker';

export default { title: 'DateTimePicker' };

export function Usage() {
  return (
    <div style={{ padding: 40, maxWidth: 400 }}>
      <DateTimePicker placeholder="Date time picker" />
    </div>
  );
}

export function WithSeconds() {
  return (
    <div style={{ padding: 40, maxWidth: 400 }}>
      <DateTimePicker placeholder="Date time picker" withSeconds />
    </div>
  );
}
