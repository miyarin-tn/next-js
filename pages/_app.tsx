import { appWithTranslation } from 'next-i18next';
import '@/styles/globals.scss';
import type { AppProps } from 'next/app';

const MyApp = ({ Component, pageProps }: AppProps): JSX.Element => {
  return <Component {...pageProps} />;
};

export default appWithTranslation(MyApp);
