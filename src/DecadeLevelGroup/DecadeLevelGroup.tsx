import React, { forwardRef, useRef } from 'react';
import { DefaultProps, Box, Selectors, useComponentDefaultProps } from '@mantine/core';
import dayjs from 'dayjs';
import { DecadeLevel, DecadeLevelStylesNames, DecadeLevelSettings } from '../DecadeLevel';
import { handleControlKeyDown } from '../__utils__/handle-control-key-down';
import useStyles from './DecadeLevelGroup.styles';

export type DecadeLevelGroupStylesNames = Selectors<typeof useStyles> | DecadeLevelStylesNames;

export interface DecadeLevelGroupProps
  extends DefaultProps<DecadeLevelStylesNames>,
    Omit<DecadeLevelSettings, 'withPrevious' | 'withNext'>,
    React.ComponentPropsWithoutRef<'div'> {
  /** Amount of decades to render next to each other */
  numberOfColumns?: number;

  /** Decade that is currently displayed */
  decade: Date;

  /** Function that returns level control aria-label based on year date */
  levelControlAriaLabel?: ((decade: Date) => string) | string;
}

const defaultProps: Partial<DecadeLevelGroupProps> = {
  numberOfColumns: 1,
};

export const DecadeLevelGroup = forwardRef<HTMLDivElement, DecadeLevelGroupProps>((props, ref) => {
  const {
    // DecadeLevel settings
    decade,
    locale,
    minDate,
    maxDate,
    yearsListFormat,
    getYearControlProps,

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
  } = useComponentDefaultProps('DecadeLevelGroup', defaultProps, props);
  const { classes, cx } = useStyles();
  const controlsRefs = useRef<HTMLButtonElement[][][]>([]);

  const decades = Array(numberOfColumns)
    .fill(0)
    .map((_, decadeIndex) => {
      const currentDecade = dayjs(decade)
        .add(decadeIndex * 10, 'years')
        .toDate();

      return (
        <DecadeLevel
          key={decadeIndex}
          yearsListFormat={yearsListFormat}
          decade={currentDecade}
          withNext={decadeIndex === numberOfColumns - 1}
          withPrevious={decadeIndex === 0}
          __onControlKeyDown={(event, payload) =>
            handleControlKeyDown({
              index: decadeIndex,
              event,
              payload,
              controlsRef: controlsRefs,
              numberOfColumns,
              controlsPerRow: 3,
            })
          }
          __getControlRef={(rowIndex, cellIndex, node) => {
            if (!Array.isArray(controlsRefs.current[decadeIndex])) {
              controlsRefs.current[decadeIndex] = [];
            }

            if (!Array.isArray(controlsRefs.current[decadeIndex][rowIndex])) {
              controlsRefs.current[decadeIndex][rowIndex] = [];
            }

            controlsRefs.current[decadeIndex][rowIndex][cellIndex] = node;
          }}
          levelControlAriaLabel={
            typeof levelControlAriaLabel === 'function'
              ? levelControlAriaLabel(currentDecade)
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
          getYearControlProps={getYearControlProps}
        />
      );
    });

  return (
    <Box className={cx(classes.decadeLevelGroup, className)} ref={ref} {...others}>
      {decades}
    </Box>
  );
});

DecadeLevelGroup.displayName = '@mantine/dates/DecadeLevelGroup';
