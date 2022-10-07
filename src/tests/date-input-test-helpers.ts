import userEvent from '@testing-library/user-event';

export function getInputValue(container: HTMLElement) {
  return container.querySelector('[data-dates-input]').textContent;
}

export function expectValue(container: HTMLElement, value: string) {
  expect(getInputValue(container)).toBe(value);
}

export function clickInput(container: HTMLElement) {
  return userEvent.click(container.querySelector('[data-dates-input]'));
}

export function expectOpenedPopover(container: HTMLElement) {
  expect(container.querySelector('[data-dates-dropdown]')).toBeInTheDocument();
}

export function expectNoPopover(container: HTMLElement) {
  expect(container.querySelectorAll('[data-dates-dropdown]')).toHaveLength(0);
}

export function expectOpenedModal(container: HTMLElement) {
  expect(container.querySelector('[data-dates-modal]')).toBeInTheDocument();
}

export function expectNoModal(container: HTMLElement) {
  expect(container.querySelectorAll('[data-dates-modal]')).toHaveLength(0);
}

export function clickControl(container: HTMLElement, index: number) {
  return userEvent.click(container.querySelectorAll('table button')[index]);
}
