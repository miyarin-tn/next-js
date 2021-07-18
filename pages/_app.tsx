import { useEffect } from 'react';
import { appWithTranslation } from 'next-i18next';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import theme from '@/configs/theme';
import '@/assets/scss/globals.scss';
import type { AppProps } from 'next/app';

const MyApp = ({ Component, pageProps }: AppProps): JSX.Element => {
  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement?.removeChild(jssStyles);
    }
  }, []);
  return (
    <ThemeProvider theme={theme}>
      {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
      <CssBaseline />
      <Component {...pageProps} />
    </ThemeProvider>
  );
};

export default appWithTranslation(MyApp);
