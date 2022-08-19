import React from 'react';
import { Day } from './Day';

export default { title: 'Day' };

export function Usage() {
  return (
    <div style={{ padding: 40 }}>
      <Day date={new Date()} />
      <Day date={new Date()} weekend />
      <Day date={new Date()} disabled />
    </div>
  );
}
