import { createStyles, MantineNumberSize } from '@mantine/core';

export interface DayStylesParams {
  radius: MantineNumberSize;
}

export default createStyles((theme, { radius }: DayStylesParams) => {
  const colors = theme.fn.variant({ variant: 'filled' });
  return {
    day: {
      width: 30,
      height: 30,
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

      '&[data-selected]': {
        color: colors.color,
        backgroundColor: colors.background,
        ...theme.fn.hover({ backgroundColor: colors.hover }),
      },
    },
  };
});
