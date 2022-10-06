import React from 'react';
import { CalendarPickerControl } from './CalendarPickerControl';

export default { title: 'CalendarPickerControl' };

export function Usage() {
  return (
    <div style={{ padding: 40 }}>
      <CalendarPickerControl>March</CalendarPickerControl>
      <CalendarPickerControl disabled>March</CalendarPickerControl>
      <CalendarPickerControl selected>March</CalendarPickerControl>
    </div>
  );
}

export function Unstyled() {
  return (
    <div style={{ padding: 40 }}>
      <CalendarPickerControl unstyled>March</CalendarPickerControl>
    </div>
  );
}

export function Range() {
  return (
    <div style={{ padding: 40, display: 'flex' }}>
      <CalendarPickerControl firstInRange inRange selected>
        March
      </CalendarPickerControl>
      <CalendarPickerControl inRange>April</CalendarPickerControl>
      <CalendarPickerControl inRange>May</CalendarPickerControl>
      <CalendarPickerControl lastInRange inRange selected>
        June
      </CalendarPickerControl>
    </div>
  );
}
