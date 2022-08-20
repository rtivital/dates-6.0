import { createStyles } from '@mantine/core';

export default createStyles((theme) => ({
  month: {
    ...theme.fn.fontStyles(),
    borderCollapse: 'collapse',
    // width: fullWidth ? '100%' : 'auto',
    tableLayout: 'fixed',
  },
}));
