import React from 'react';
import { MonthsGroup } from './MonthsGroup';

export default { title: 'MonthsGroup' };

export function Usage() {
  return (
    <div style={{ padding: 40 }}>
      <MonthsGroup amountOfMonths={3} month={new Date(2022, 3, 11)} />
    </div>
  );
}
