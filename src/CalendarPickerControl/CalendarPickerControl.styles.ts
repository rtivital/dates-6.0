import { createStyles } from '@mantine/core';

export default createStyles((theme) => {
  const colors = theme.fn.variant({ variant: 'filled' });

  return {
    calendarPickerControl: {
      padding: `${theme.spacing.xs}px ${theme.spacing.md}px`,
      fontSize: theme.fontSizes.sm,
      display: 'inline-flex',
      justifyContent: 'center',
      alignItems: 'center',
      userSelect: 'none',
      borderRadius: theme.fn.radius(),
      ...theme.fn.hover({
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[0],
      }),

      '&:active': theme.activeStyles,

      '&[data-selected]': {
        color: colors.color,
        backgroundColor: colors.background,
        ...theme.fn.hover({ backgroundColor: colors.hover }),
      },

      '&[data-disabled]': {
        color: theme.colorScheme === 'dark' ? theme.colors.dark[3] : theme.colors.gray[4],
        cursor: 'not-allowed',
        ...theme.fn.hover({ backgroundColor: 'transparent' }),

        '&:active': {
          transform: 'none',
        },
      },
    },
  };
});
