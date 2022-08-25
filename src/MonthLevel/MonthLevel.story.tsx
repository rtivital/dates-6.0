import React from 'react';
import { MonthLevel } from './MonthLevel';

export default { title: 'MonthLevel' };

export function Usage() {
  return (
    <div style={{ padding: 40 }}>
      <MonthLevel month={new Date(2022, 3, 11)} />
    </div>
  );
}
