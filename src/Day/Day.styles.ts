import { createStyles, MantineNumberSize } from '@mantine/core';

export interface DayStylesParams {
  radius: MantineNumberSize;
}

export default createStyles((theme, { radius }: DayStylesParams) => {
  const colors = theme.fn.variant({ variant: 'filled' });
  const lightColors = theme.fn.variant({ variant: 'light' });
  return {
    day: {
      width: 36,
      height: 36,
      fontSize: theme.fontSizes.sm,
      display: 'inline-flex',
      justifyContent: 'center',
      alignItems: 'center',
      userSelect: 'none',
      borderRadius: theme.fn.radius(radius),
      ...theme.fn.hover({
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[0],
      }),

      '&:active': theme.activeStyles,

      '&[data-disabled]': {
        color: theme.colorScheme === 'dark' ? theme.colors.dark[3] : theme.colors.gray[4],
        pointerEvents: 'none',
      },

      '&[data-weekend]': {
        color: theme.colors.red[theme.fn.primaryShade()],
      },

      '&[data-outside]': {
        color: theme.colorScheme === 'dark' ? theme.colors.dark[3] : theme.colors.gray[4],
      },

      '&[data-in-range]': {
        backgroundColor: lightColors.background,
        borderRadius: 0,
        ...theme.fn.hover({ backgroundColor: lightColors.hover }),
      },

      '&[data-first-in-range]': {
        borderTopLeftRadius: theme.radius.sm,
        borderBottomLeftRadius: theme.radius.sm,
      },

      '&[data-last-in-range]': {
        borderTopRightRadius: theme.radius.sm,
        borderBottomRightRadius: theme.radius.sm,
      },

      '&[data-selected]': {
        color: colors.color,
        backgroundColor: colors.background,
        ...theme.fn.hover({ backgroundColor: colors.hover }),
      },
    },
  };
});
