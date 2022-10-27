import React from 'react';
import { MantineDemo } from '@mantine/ds';
import { DateInput } from '@/extension';

const code = `
import { DateInput } from 'mantine-dates-6';

function Demo() {
  return (
    <div style={{ maxWidth: 400, margin: 'auto' }}>
      <DateInput placeholder="Free date input" />
    </div>
  );
}
`;

function Demo() {
  return (
    <div style={{ maxWidth: 400, margin: 'auto' }}>
      <DateInput placeholder="Free date input" />
    </div>
  );
}

export const usage: MantineDemo = {
  type: 'demo',
  component: Demo,
  code,
};
