import { createStyles } from '@mantine/core';

export default createStyles((theme) => ({
  monthThead: {},
  monthRow: {},
  monthTbody: {},

  monthCell: {
    padding: 0,
  },

  month: {
    ...theme.fn.fontStyles(),
    borderCollapse: 'collapse',
    // width: fullWidth ? '100%' : 'auto',
    tableLayout: 'fixed',

    '& *': {
      boxSizing: 'border-box',
    },
  },
}));
