import React from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { YearsRangePicker, YearsRangePickerProps } from './YearsRangePicker';

const defaultProps: YearsRangePickerProps = {
  date: new Date(2022, 3, 11),
};

describe('@mantine/dates/YearsRangePicker', () => {
  it('supports uncontrolled state', async () => {
    const { container } = render(<YearsRangePicker {...defaultProps} />);
    expect(container.querySelectorAll('[data-selected]')).toHaveLength(0);

    await userEvent.click(container.querySelectorAll('table button')[5]);
    expect(container.querySelectorAll('[data-selected]')).toHaveLength(1);
    expect(container.querySelectorAll('[data-selected]')[0].textContent).toBe('2025');

    await userEvent.click(container.querySelectorAll('table button')[9]);
    expect(container.querySelectorAll('[data-selected]')).toHaveLength(2);
    expect(container.querySelectorAll('[data-selected]')[0].textContent).toBe('2025');
    expect(container.querySelectorAll('[data-selected]')[1].textContent).toBe('2029');
    expect(container.querySelectorAll('[data-in-range]')).toHaveLength(3);
  });

  it('supports controlled state', async () => {
    const spy = jest.fn();
    const { container } = render(
      <YearsRangePicker {...defaultProps} value={[null, null]} onChange={spy} />
    );
    expect(container.querySelectorAll('[data-selected]')).toHaveLength(0);
    await userEvent.click(container.querySelector('table button'));
    expect(spy).toHaveBeenLastCalledWith([new Date(2020, 0, 1), null]);
  });
});
