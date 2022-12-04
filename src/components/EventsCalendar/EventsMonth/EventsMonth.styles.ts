import { createStyles } from '@mantine/core';

export default createStyles((theme) => ({
  eventsMonth: {},

  eventsMonthRow: {
    display: 'flex',

    '& + &': {
      '& > [data-day]': {
        borderTop: 0,
      },
    },
  },

  eventsMonthDay: {
    flex: 1,
    height: 100,
    textAlign: 'right',
    border: `1px solid ${theme.colors.gray[2]}`,
    padding: theme.spacing.xs,
    lineHeight: 1,

    '& + &': {
      borderLeft: 0,
    },

    '&[data-outside]': {
      color: theme.colors.gray[4],
    },
  },
}));
