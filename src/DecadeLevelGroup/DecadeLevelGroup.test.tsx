import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { DecadeLevelGroup, DecadeLevelGroupProps } from './DecadeLevelGroup';
import {
  itSupportsYearsListProps,
  itSupportsHeaderProps,
  itSupportsOnControlClick,
} from '../__tests__';

const defaultProps: DecadeLevelGroupProps = {
  decade: new Date(2022, 3, 11),
  levelControlAriaLabel: () => 'level-control',
  nextLabel: 'next',
  previousLabel: 'prev',
};

describe('@mantine/dates/DecadeLevelGroup', () => {
  itSupportsYearsListProps(DecadeLevelGroup, defaultProps);
  itSupportsHeaderProps(DecadeLevelGroup, defaultProps);
  itSupportsOnControlClick(DecadeLevelGroup, defaultProps);

  it('renders correct number of columns based on numberOfColumns prop', () => {
    const { rerender } = render(<DecadeLevelGroup {...defaultProps} numberOfColumns={1} />);
    expect(screen.getAllByLabelText('level-control')).toHaveLength(1);

    rerender(<DecadeLevelGroup {...defaultProps} numberOfColumns={2} />);
    expect(screen.getAllByLabelText('level-control')).toHaveLength(2);

    rerender(<DecadeLevelGroup {...defaultProps} numberOfColumns={3} />);
    expect(screen.getAllByLabelText('level-control')).toHaveLength(3);
  });

  it('renders correct years group based on year prop', () => {
    render(<DecadeLevelGroup {...defaultProps} numberOfColumns={3} />);
    expect(screen.getAllByLabelText('level-control').map((node) => node.textContent)).toStrictEqual(
      ['2019 – 2030', '2029 – 2040', '2039 – 2050']
    );
  });

  it('supports levelControlAriaLabel as string', () => {
    render(<DecadeLevelGroup {...defaultProps} levelControlAriaLabel="test-label" />);
    expect(screen.getByText('2019 – 2030')).toHaveAttribute('aria-label', 'test-label');
  });

  it('supports levelControlAriaLabel as function', () => {
    render(
      <DecadeLevelGroup
        {...defaultProps}
        levelControlAriaLabel={(date) => `${date.getMonth()}/${date.getFullYear()}`}
      />
    );
    expect(screen.getByText('2019 – 2030')).toHaveAttribute('aria-label', '3/2022');
  });

  it('handles arrow keyboard events correctly (numberOfColumns=1)', async () => {
    const { container } = render(<DecadeLevelGroup {...defaultProps} numberOfColumns={1} />);
    const controls = container.querySelectorAll('table button');

    await userEvent.click(controls[0]);
    expect(controls[0]).toHaveFocus();

    await userEvent.type(controls[0], '{ArrowRight}', { skipClick: true });
    expect(controls[1]).toHaveFocus();

    await userEvent.type(controls[1], '{ArrowDown}', { skipClick: true });
    expect(controls[4]).toHaveFocus();

    await userEvent.type(controls[4], '{ArrowLeft}', { skipClick: true });
    expect(controls[3]).toHaveFocus();

    await userEvent.type(controls[3], '{ArrowUp}', { skipClick: true });
    expect(controls[0]).toHaveFocus();
  });

  it('handles arrow keyboard events correctly (numberOfColumns=2)', async () => {
    const { container } = render(<DecadeLevelGroup {...defaultProps} numberOfColumns={2} />);
    const columns = container.querySelectorAll('.mantine-YearsList-yearsList');
    const firstColumnControls = columns[0].querySelectorAll('button');
    const secondColumnControls = columns[1].querySelectorAll('button');

    await userEvent.click(firstColumnControls[1]);
    expect(firstColumnControls[1]).toHaveFocus();

    await userEvent.type(firstColumnControls[1], '{ArrowRight}', { skipClick: true });
    expect(firstColumnControls[2]).toHaveFocus();

    await userEvent.type(firstColumnControls[2], '{ArrowRight}', { skipClick: true });
    expect(secondColumnControls[0]).toHaveFocus();

    await userEvent.type(secondColumnControls[0], '{ArrowDown}', { skipClick: true });
    expect(secondColumnControls[3]).toHaveFocus();

    await userEvent.type(secondColumnControls[3], '{ArrowLeft}', { skipClick: true });
    expect(firstColumnControls[5]).toHaveFocus();
  });

  it('handles arrow keyboard events correctly at edges', async () => {
    const { container } = render(<DecadeLevelGroup {...defaultProps} numberOfColumns={1} />);
    const controls = container.querySelectorAll('table button');

    await userEvent.type(controls[2], '{ArrowRight}');
    expect(controls[2]).toHaveFocus();

    await userEvent.type(controls[0], '{ArrowLeft}');
    expect(controls[0]).toHaveFocus();

    await userEvent.type(controls[0], '{ArrowUp}');
    expect(controls[0]).toHaveFocus();

    await userEvent.type(controls[controls.length - 1], '{ArrowDown}');
    expect(controls[controls.length - 1]).toHaveFocus();
  });

  it('has correct default __staticSelector', () => {
    const { container } = render(<DecadeLevelGroup {...defaultProps} />);
    expect(container.firstChild).toHaveClass('mantine-DecadeLevelGroup-decadeLevelGroup');
    expect(container.querySelector('table button')).toHaveClass(
      'mantine-DecadeLevelGroup-calendarPickerControl'
    );
  });

  it('supports custom __staticSelector', () => {
    const { container } = render(
      <DecadeLevelGroup {...defaultProps} __staticSelector="Calendar" />
    );
    expect(container.firstChild).toHaveClass('mantine-Calendar-decadeLevelGroup');
    expect(container.querySelector('table button')).toHaveClass(
      'mantine-Calendar-calendarPickerControl'
    );
  });

  it('supports styles api (styles)', () => {
    const { container } = render(
      <DecadeLevelGroup
        {...defaultProps}
        styles={{
          decadeLevelGroup: { borderColor: '#CCEE45' },
          calendarPickerControl: { borderColor: '#443443' },
        }}
      />
    );

    expect(container.firstChild).toHaveStyle({ borderColor: '#CCEE45' });
    expect(container.querySelector('table button')).toHaveStyle({ borderColor: '#443443' });
  });

  it('supports styles api (classNames)', () => {
    const { container } = render(
      <DecadeLevelGroup
        {...defaultProps}
        classNames={{ decadeLevelGroup: 'test-group', calendarPickerControl: 'test-control' }}
      />
    );

    expect(container.firstChild).toHaveClass('test-group');
    expect(container.querySelector('table button')).toHaveClass('test-control');
  });
});
