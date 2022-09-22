import React, { forwardRef, useRef } from 'react';
import { DefaultProps, Box, Selectors, useComponentDefaultProps } from '@mantine/core';
import dayjs from 'dayjs';
import { YearLevel, YearLevelStylesNames, YearLevelSettings } from '../YearLevel';
import { handleControlKeyDown } from '../__utils__/handle-control-key-down';
import useStyles from './YearLevelGroup.styles';

export type YearLevelGroupStylesNames = Selectors<typeof useStyles> | YearLevelStylesNames;

export interface YearLevelGroupProps
  extends DefaultProps<YearLevelStylesNames>,
    Omit<YearLevelSettings, 'withPrevious' | 'withNext' | '__onControlKeyDown' | '__getControlRef'>,
    React.ComponentPropsWithoutRef<'div'> {
  /** Amount of years to render next to each other */
  numberOfColumns?: number;

  /** Year that is currently displayed */
  year: Date;

  /** Function that returns level control aria-label based on year date */
  levelControlAriaLabel?: ((year: Date) => string) | string;
}

const defaultProps: Partial<YearLevelGroupProps> = {
  numberOfColumns: 1,
};

export const YearLevelGroup = forwardRef<HTMLDivElement, YearLevelGroupProps>((props, ref) => {
  const {
    // YearLevel settings
    year,
    locale,
    minDate,
    maxDate,
    monthsListFormat,
    getMonthControlProps,
    __onControlClick,

    // CalendarHeader settings
    __preventFocus,
    nextIcon,
    previousIcon,
    nextLabel,
    previousLabel,
    onNext,
    onPrevious,
    onLevelChange,
    nextDisabled,
    previousDisabled,
    hasNextLevel,

    // Other settings
    className,
    numberOfColumns,
    levelControlAriaLabel,
    ...others
  } = useComponentDefaultProps('YearLevelGroup', defaultProps, props);
  const { classes, cx } = useStyles();
  const controlsRefs = useRef<HTMLButtonElement[][][]>([]);

  const years = Array(numberOfColumns)
    .fill(0)
    .map((_, yearIndex) => {
      const currentYear = dayjs(year).add(yearIndex, 'years').toDate();

      return (
        <YearLevel
          key={yearIndex}
          monthsListFormat={monthsListFormat}
          year={currentYear}
          withNext={yearIndex === numberOfColumns - 1}
          withPrevious={yearIndex === 0}
          __onControlClick={__onControlClick}
          __onControlKeyDown={(event, payload) =>
            handleControlKeyDown({
              index: yearIndex,
              event,
              payload,
              controlsRef: controlsRefs,
              numberOfColumns,
              controlsPerRow: 3,
            })
          }
          __getControlRef={(rowIndex, cellIndex, node) => {
            if (!Array.isArray(controlsRefs.current[yearIndex])) {
              controlsRefs.current[yearIndex] = [];
            }

            if (!Array.isArray(controlsRefs.current[yearIndex][rowIndex])) {
              controlsRefs.current[yearIndex][rowIndex] = [];
            }

            controlsRefs.current[yearIndex][rowIndex][cellIndex] = node;
          }}
          levelControlAriaLabel={
            typeof levelControlAriaLabel === 'function'
              ? levelControlAriaLabel(currentYear)
              : levelControlAriaLabel
          }
          locale={locale}
          minDate={minDate}
          maxDate={maxDate}
          __preventFocus={__preventFocus}
          nextIcon={nextIcon}
          previousIcon={previousIcon}
          nextLabel={nextLabel}
          previousLabel={previousLabel}
          onNext={onNext}
          onPrevious={onPrevious}
          onLevelChange={onLevelChange}
          nextDisabled={nextDisabled}
          previousDisabled={previousDisabled}
          hasNextLevel={hasNextLevel}
          getMonthControlProps={getMonthControlProps}
        />
      );
    });

  return (
    <Box className={cx(classes.yearLevelGroup, className)} ref={ref} {...others}>
      {years}
    </Box>
  );
});

YearLevelGroup.displayName = '@mantine/dates/YearLevelGroup';
