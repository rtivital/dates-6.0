import React, { useState } from 'react';
import { Button } from '@mantine/core';
import { YearPickerPopover } from './YearPickerPopover';

export default { title: 'YearPickerPopover' };

export function Usage() {
  const [value, setValue] = useState<Date>(null);
  return (
    <div style={{ padding: 120 }}>
      <YearPickerPopover value={value} onChange={setValue}>
        <YearPickerPopover.Target>
          <Button>Open popover</Button>
        </YearPickerPopover.Target>
        <YearPickerPopover.Dropdown />
      </YearPickerPopover>
      {value && value.toDateString()}
    </div>
  );
}
