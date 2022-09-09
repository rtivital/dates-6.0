import React from 'react';
import { MonthsGroup } from './MonthsGroup';

export default { title: 'MonthsGroup' };

export function Usage() {
  return (
    <div style={{ padding: 40 }}>
      <div>1 month</div>
      <MonthsGroup month={new Date(2022, 3, 11)} mb={50} mt="xs" />

      <div>2 months</div>
      <MonthsGroup numberOfMonths={2} month={new Date(2022, 3, 11)} mb={50} mt="xs" />

      <div>3 months</div>
      <MonthsGroup numberOfMonths={3} month={new Date(2022, 3, 11)} mb={50} mt="xs" />
    </div>
  );
}
