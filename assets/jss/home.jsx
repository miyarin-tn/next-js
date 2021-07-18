// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const homeStyles = {
  container: {
    minHeight: '100vh',
    padding: '0 0.5rem',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
  },
  main: {
    padding: '5rem 0',
    flex: '1',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  footer: {
    width: '100%',
    height: '100px',
    borderTop: '1px solid #eaeaea',
    display: 'flex',
    justifyContent: 'center',
    alignTtems: 'center',
  },
  title: {
    margin: '0 0 30px',
    lineHeight: '1.15',
    fontSize: '4rem',
    textAlign: 'center',
    '& a': {
      color: '#0070f3',
      textDecoration: 'none',
      '&:hover, &:focus, &:active': {
        textDecoration: 'underline',
      },
    },
  },
  description: {
    lineHeight: '1.5',
    fontSize: '1.5rem',
    textAlign: 'center',
  },
  code: {
    background: '#fafafa',
    borderRadius: '5px',
    padding: '0.75rem',
    fontSize: '1.1rem',
    fontFamily: `Menlo, Monaco, Lucida Console, Liberation Mono, DejaVu Sans Mono,
      Bitstream Vera Sans Mono, Courier New, monospace`,
  },
  image: {
    '& > div': {
      verticalAlign: 'middle',
    },
  },
  circle: {
    borderRadius: '50%',
    overflow: 'hidden',
  },
};

export default homeStyles;
