import dayjs from 'dayjs';
import React from 'react';
import { Code } from '@mantine/core';
import { Month, MonthProps } from './Month';

export default { title: 'Month' };

function Wrapper(props: Partial<MonthProps>) {
  return (
    <div style={{ padding: 40 }}>
      <Code>{dayjs(props.month || new Date(2022, 3, 1)).format('MMMM YYYY')}</Code>
      <Month month={new Date(2022, 3, 1)} mt="xl" {...props} />
    </div>
  );
}

export function Usage() {
  return <Wrapper />;
}

export function Selected() {
  return (
    <Wrapper
      getDayProps={(date) => ({ selected: dayjs(date).isSame(new Date(2022, 3, 12), 'date') })}
    />
  );
}
