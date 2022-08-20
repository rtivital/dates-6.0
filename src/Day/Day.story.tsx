import React from 'react';
import { Day } from './Day';

export default { title: 'Day' };

export function Usage() {
  return (
    <div style={{ padding: 40 }}>
      <Day date={new Date()} />
      <Day date={new Date()} weekend />
      <Day date={new Date()} outside />
      <Day date={new Date()} selected />
      <Day date={new Date()} selected weekend />
      <Day date={new Date()} selected outside />
      <Day date={new Date()} disabled />
      <Day date={new Date()} renderDay={(date) => date.getFullYear()} />
    </div>
  );
}

export function Range() {
  return (
    <div style={{ padding: 40 }}>
      <Day date={new Date()} firstInRange inRange selected />
      <Day date={new Date()} inRange />
      <Day date={new Date()} inRange />
      <Day date={new Date()} inRange />
      <Day date={new Date()} lastInRange inRange selected />
    </div>
  );
}
