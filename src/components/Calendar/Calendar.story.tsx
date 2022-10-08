import React, { useState } from 'react';
import { DatesRangeValue } from '../../types';
import { Calendar } from './Calendar';

export default { title: 'Calendar' };

export function Usage() {
  return (
    <div style={{ padding: 40 }}>
      <Calendar />
    </div>
  );
}

export function Multiple() {
  return (
    <div style={{ padding: 40 }}>
      <Calendar type="multiple" />
    </div>
  );
}

export function Range() {
  return (
    <div style={{ padding: 40 }}>
      <Calendar type="range" />
    </div>
  );
}

export function AllowDeselect() {
  return (
    <div style={{ padding: 40 }}>
      <Calendar allowDeselect />
    </div>
  );
}

export function Controlled() {
  const [value, setValue] = useState<Date | null>(null);
  return (
    <div style={{ padding: 40 }}>
      <Calendar value={value} onChange={setValue} numberOfColumns={3} columnsToScroll={1} />
      {value?.toISOString()}
    </div>
  );
}

export function ControlledRange() {
  const [value, setValue] = useState<DatesRangeValue>([null, null]);
  return (
    <div style={{ padding: 40 }}>
      <Calendar
        type="range"
        value={value}
        onChange={setValue}
        numberOfColumns={3}
        columnsToScroll={1}
      />
      {value.map((date) => (date ? date.toISOString() : 'ns')).join(' – ')}
    </div>
  );
}

export function ControlledMultiple() {
  const [value, setValue] = useState<Date[]>([]);
  return (
    <div style={{ padding: 40 }}>
      <Calendar
        type="multiple"
        value={value}
        onChange={setValue}
        numberOfColumns={3}
        columnsToScroll={1}
      />
      {value.map((date) => (date ? date.toISOString() : 'ns')).join(', ')}
    </div>
  );
}
