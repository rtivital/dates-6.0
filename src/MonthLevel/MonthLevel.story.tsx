import dayjs from 'dayjs';
import React, { useState } from 'react';
import { MonthLevel } from './MonthLevel';

export default { title: 'MonthLevel' };

export function Usage() {
  const [month, setMonth] = useState(new Date(2022, 3, 11));

  const onNextMonth = () => setMonth((current) => dayjs(current).add(1, 'month').toDate());
  const onPrevMonth = () => setMonth((current) => dayjs(current).subtract(1, 'month').toDate());

  return (
    <div style={{ padding: 40 }}>
      <MonthLevel month={month} onNext={onNextMonth} onPrevious={onPrevMonth} />
    </div>
  );
}
