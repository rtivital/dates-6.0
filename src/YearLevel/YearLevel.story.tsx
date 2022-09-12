import React from 'react';
import { YearLevel } from './YearLevel';

export default { title: 'YearLevel' };

export function Usage() {
  return (
    <div style={{ padding: 40 }}>
      <YearLevel year={new Date(2022, 3, 11)} />
    </div>
  );
}
