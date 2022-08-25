import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

export interface HeaderTestProps {
  nextIcon?: React.ReactNode;
  previousIcon?: React.ReactNode;
  nextLabel?: string;
  previousLabel?: string;
  onNext?(): void;
  onPrevious?(): void;
  onLevelChange?(): void;
  levelControlAriaLabel?: string;
  hasNext?: boolean;
  hasPrevious?: boolean;
  hasNextLevel?: boolean;
}

export function itSupportsHeaderProps(
  Component: React.FC<HeaderTestProps>,
  requiredProps?: Record<string, any>
) {
  it('supports nextIcon and previousIcon props', () => {
    render(
      <Component {...requiredProps} nextIcon="test-next-icon" previousIcon="test-previous-icon" />
    );

    expect(screen.getByLabelText('next').textContent).toBe('test-next-icon');
    expect(screen.getByLabelText('prev').textContent).toBe('test-previous-icon');
  });

  it('supports nextLabel and previousLabel props', () => {
    const { container } = render(
      <Component
        {...requiredProps}
        nextLabel="test-next-label"
        previousLabel="test-previous-label"
      />
    );

    expect(container.querySelector('[data-next]')).toHaveAttribute('aria-label', 'test-next-label');
    expect(container.querySelector('[data-previous]')).toHaveAttribute(
      'aria-label',
      'test-previous-label'
    );
  });

  it('supports onNext and onPrevious props', async () => {
    const onNext = jest.fn();
    const onPrevious = jest.fn();
    render(<Component {...requiredProps} onNext={onNext} onPrevious={onPrevious} />);

    await userEvent.click(screen.getByLabelText('next'));
    expect(onNext).toHaveBeenCalledTimes(1);
    expect(onPrevious).toHaveBeenCalledTimes(0);

    await userEvent.click(screen.getByLabelText('prev'));
    expect(onNext).toHaveBeenCalledTimes(1);
    expect(onPrevious).toHaveBeenCalledTimes(1);
  });

  it('calls onLevelChange when level control is clicked', async () => {
    const spy = jest.fn();
    render(<Component {...requiredProps} levelControlAriaLabel="click me" onLevelChange={spy} />);

    await userEvent.click(screen.getByLabelText('click me'));
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('supports hasNext prop', () => {
    const { rerender } = render(<Component {...requiredProps} hasNext />);
    expect(screen.getByLabelText('next')).not.toHaveAttribute('data-disabled');
    expect(screen.getByLabelText('next')).not.toHaveAttribute('disabled');

    rerender(<Component {...requiredProps} hasNext={false} />);
    expect(screen.getByLabelText('next')).toHaveAttribute('data-disabled');
    expect(screen.getByLabelText('next')).toHaveAttribute('disabled');
  });

  it('supports hasPrevious prop', () => {
    const { rerender } = render(<Component {...requiredProps} hasPrevious />);
    expect(screen.getByLabelText('prev')).not.toHaveAttribute('data-disabled');
    expect(screen.getByLabelText('prev')).not.toHaveAttribute('disabled');

    rerender(<Component {...requiredProps} hasPrevious={false} />);
    expect(screen.getByLabelText('prev')).toHaveAttribute('data-disabled');
    expect(screen.getByLabelText('prev')).toHaveAttribute('disabled');
  });

  it('supports hasNextLevel prop', () => {
    const { rerender } = render(
      <Component {...requiredProps} levelControlAriaLabel="test-level" hasNextLevel />
    );
    expect(screen.getByLabelText('test-level')).not.toHaveAttribute('data-static');

    rerender(
      <Component {...requiredProps} levelControlAriaLabel="test-level" hasNextLevel={false} />
    );
    expect(screen.getByLabelText('test-level')).toHaveAttribute('data-static');
  });

  it('does not call onLevelChange when level is clicked and hasNextLevel is false', async () => {
    const spy = jest.fn();
    const { rerender } = render(
      <Component
        {...requiredProps}
        levelControlAriaLabel="test-level"
        hasNextLevel
        onLevelChange={spy}
      />
    );

    await userEvent.click(screen.getByLabelText('test-level'));
    expect(spy).toHaveBeenCalledTimes(1);

    rerender(
      <Component
        {...requiredProps}
        levelControlAriaLabel="test-level"
        hasNextLevel={false}
        onLevelChange={spy}
      />
    );

    await userEvent.click(screen.getByLabelText('test-level'));
    expect(spy).toHaveBeenCalledTimes(1);
  });
}
