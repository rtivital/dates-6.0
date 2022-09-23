import React from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { YearPicker, YearPickerProps } from './YearPicker';

const defaultProps: YearPickerProps = {};

describe('@mantine/dates/YearPicker', () => {
  it('can be uncontrolled', async () => {
    const { container } = render(<YearPicker {...defaultProps} date={new Date(2022, 3, 11)} />);
    expect(container.querySelector('[data-selected]')).toBe(null);
    await userEvent.click(container.querySelector('table button'));
    expect(container.querySelector('[data-selected]').textContent).toBe('2020');
  });

  it('can be controlled', async () => {
    const spy = jest.fn();
    const { container } = render(
      <YearPicker
        {...defaultProps}
        date={new Date(2022, 3, 11)}
        value={new Date(2023, 3, 11)}
        onChange={spy}
      />
    );

    expect(container.querySelector('[data-selected]').textContent).toBe('2023');

    await userEvent.click(container.querySelector('table button'));
    expect(spy).toHaveBeenCalledWith(new Date(2020, 0, 1));
  });

  it('has correct default __staticSelector', () => {
    const { container } = render(<YearPicker {...defaultProps} />);
    expect(container.firstChild).toHaveClass('mantine-YearPicker-calendarLevels');
  });

  it('supports custom __staticSelector', () => {
    const { container } = render(<YearPicker {...defaultProps} __staticSelector="Calendar" />);
    expect(container.firstChild).toHaveClass('mantine-Calendar-calendarLevels');
  });
});
