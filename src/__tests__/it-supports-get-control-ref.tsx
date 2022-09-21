import React from 'react';
import { render } from '@testing-library/react';

export interface ComponentTestProps {
  __getControlRef?(rowIndex: number, cellIndex: number, node: HTMLButtonElement): void;
}

export function itSupportsGetControlRef(
  Component: React.FC<ComponentTestProps>,
  requiredProps?: Record<string, any>
) {
  it('supports __getDayRef', () => {
    const spy = jest.fn();
    render(<Component {...requiredProps} __getControlRef={spy} />);
    expect(spy).toHaveBeenCalledTimes(12);
    expect(spy).toHaveBeenCalledWith(
      expect.any(Number),
      expect.any(Number),
      expect.any(HTMLButtonElement)
    );
  });
}