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
