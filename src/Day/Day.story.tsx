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
      <Day date={new Date()} disabled />
      <Day date={new Date()} renderDay={(date) => date.getFullYear()} />
    </div>
  );
}
