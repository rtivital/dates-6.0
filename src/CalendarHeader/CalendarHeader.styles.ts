import { createStyles } from '@mantine/core';

export default createStyles((theme) => ({
  calendarHeaderControlIcon: {},

  calendarHeader: {
    display: 'flex',
  },

  calendarHeaderControl: {
    width: 36,
    height: 36,
    borderRadius: theme.fn.radius(),
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    userSelect: 'none',

    ...theme.fn.hover({
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[0],
    }),

    '&:active': theme.activeStyles,

    '&[data-disabled]': {
      opacity: 0.2,
      cursor: 'not-allowed',
      ...theme.fn.hover({ backgroundColor: 'transparent' }),

      '&:active': {
        transform: 'none',
      },
    },
  },

  calendarHeaderLevel: {
    borderRadius: theme.fn.radius(),
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    userSelect: 'none',
    flex: 1,
    fontSize: theme.fontSizes.sm,
    fontWeight: 500,
    textTransform: 'capitalize',

    ...theme.fn.hover({
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[0],
    }),

    '&:active': theme.activeStyles,

    '&[data-static]': {
      cursor: 'default',
      userSelect: 'unset',
      ...theme.fn.hover({ backgroundColor: 'transparent' }),

      '&:active': {
        transform: 'none',
      },
    },
  },
}));
