// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const commonStyles = (theme) => ({
  textCenter: {
    textAlign: 'center',
    [theme.breakpoints.down('sm')]: {
      textAlign: 'right',
    },
  },
});

export default commonStyles;
