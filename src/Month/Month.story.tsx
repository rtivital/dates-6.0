import React from 'react';
import { Month } from './Month';

export default { title: 'Month' };

export function Usage() {
  return (
    <div style={{ padding: 40 }}>
      Month: {new Date(2022, 3, 1).toDateString()}
      <Month month={new Date(2022, 3, 1)} mt="xl" />
    </div>
  );
}
