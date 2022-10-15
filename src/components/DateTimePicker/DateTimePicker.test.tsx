import 'dayjs/locale/ru';
import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { DatesProvider } from '../DatesProvider';
import {
  itSupportsMonthsListProps,
  itSupportsYearsListProps,
  itSupportsClearableProps,
  clickInput,
  expectNoModal,
  expectNoPopover,
  expectOpenedModal,
  expectOpenedPopover,
  expectValue,
} from '../../tests';
import { DateTimePicker, DateTimePickerProps } from './DateTimePicker';

const defaultProps: DateTimePickerProps = {
  popoverProps: { withinPortal: false, transitionDuration: 0 },
  modalProps: { withinPortal: false, transitionDuration: 0 },
  timeInputProps: { 'aria-label': 'test-time-input' },
  submitButtonProps: { 'aria-label': 'test-submit' },
};

const getTimeInput = () => screen.getByLabelText('test-time-input');
const getSubmitButton = () => screen.getByLabelText('test-submit');

describe('@mantine/dates/DateTimePicker', () => {
  itSupportsClearableProps(DateTimePicker, { ...defaultProps, defaultValue: new Date() });
  itSupportsYearsListProps(DateTimePicker, {
    ...defaultProps,
    defaultLevel: 'decade',
    defaultValue: new Date(),
    popoverProps: { opened: true, withinPortal: false, transitionDuration: 0 },
  });
  itSupportsMonthsListProps(DateTimePicker, {
    ...defaultProps,
    defaultLevel: 'year',
    defaultValue: new Date(),
    popoverProps: { opened: true, withinPortal: false, transitionDuration: 0 },
  });

  it('toggles popover when input is clicked (dropdownType="popover")', async () => {
    const { container } = render(<DateTimePicker {...defaultProps} />);

    await clickInput(container);
    expectOpenedPopover(container);
    expectNoModal(container);

    await clickInput(container);
    expectNoPopover(container);
  });

  it('toggles modal when input is clicked (dropdownType="modal")', async () => {
    const { container } = render(<DateTimePicker {...defaultProps} dropdownType="modal" />);

    await clickInput(container);
    expectOpenedModal(container);
    expectNoPopover(container);

    await clickInput(container);
    expectNoModal(container);
  });

  it('closes dropdown when user presses Enter in TimeInput', async () => {
    const { container } = render(
      <DateTimePicker {...defaultProps} defaultValue={new Date(2022, 3, 11)} />
    );
    await clickInput(container);
    expectOpenedPopover(container);

    await userEvent.type(getTimeInput(), '{Enter}');
    expectNoPopover(container);
  });

  it('closes dropdown when user clicks on submit button', async () => {
    const { container } = render(
      <DateTimePicker {...defaultProps} defaultValue={new Date(2022, 3, 11)} />
    );
    await clickInput(container);
    expectOpenedPopover(container);

    await userEvent.click(getSubmitButton());
    expectNoPopover(container);
  });

  it('supports uncontrolled state', async () => {
    const { container } = render(
      <DateTimePicker {...defaultProps} defaultValue={new Date(2022, 3, 11)} />
    );

    await clickInput(container);
    await userEvent.click(container.querySelectorAll('table button')[6]);
    expectValue(container, '03/04/2022 00:00');

    await userEvent.clear(getTimeInput());
    await userEvent.type(getTimeInput(), '14:45');
    expectValue(container, '03/04/2022 14:45');
  });

  it('supports controlled state', async () => {
    const spy = jest.fn();

    const { container } = render(
      <DateTimePicker {...defaultProps} value={new Date(2022, 3, 11)} onChange={spy} />
    );

    await clickInput(container);
    await userEvent.click(container.querySelectorAll('table button')[6]);
    expectValue(container, '11/04/2022 00:00');
    expect(spy).toHaveBeenLastCalledWith(new Date(2022, 3, 3));
  });

  it('displays correct value when withSeconds is set', () => {
    const { container } = render(
      <DateTimePicker {...defaultProps} value={new Date(2022, 3, 11, 14, 45, 54)} withSeconds />
    );

    expectValue(container, '11/04/2022 14:45:54');
  });

  it('supports custom valueFormat', () => {
    const { container } = render(
      <DateTimePicker
        {...defaultProps}
        value={new Date(2022, 3, 11, 14, 45, 54)}
        valueFormat="DD MMMM, YYYY hh:mm:ss A"
      />
    );

    expectValue(container, '11 April, 2022 02:45:54 PM');
  });

  it('supports localization for custom valueFormat', () => {
    const { container } = render(
      <DateTimePicker
        {...defaultProps}
        value={new Date(2022, 3, 11, 14, 45, 54)}
        valueFormat="DD MMMM, YYYY hh:mm:ss"
        locale="ru"
      />
    );

    expectValue(container, '11 апреля, 2022 02:45:54');
  });

  it('supports localization for custom valueFormat om DatesProvider', () => {
    const { container } = render(
      <DatesProvider settings={{ locale: 'ru' }}>
        <DateTimePicker
          {...defaultProps}
          value={new Date(2022, 3, 11, 14, 45, 54)}
          valueFormat="DD MMMM, YYYY hh:mm:ss"
        />
      </DatesProvider>
    );

    expectValue(container, '11 апреля, 2022 02:45:54');
  });
});
