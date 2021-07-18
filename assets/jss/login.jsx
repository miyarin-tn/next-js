const loginStyles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
  },

  buttonBlue: {
    display: 'inline-block',
    borderRadius: '4px',
    border: '1px solid #0070f3',
    color: '#0070f3',
    textDecoration: 'none',
    padding: '10px 30px',
    '&:hover': {
      color: '#fff',
      backgroundColor: '#0070f3',
    },
  },

  fieldNormal: {
    padding: '5px 10px',
    width: '300px',
    height: '30px',
  },

  mb10: {
    marginBottom: '10px',
  },

  mb20: {
    marginBottom: '20px',
  },
};

export default loginStyles;
