import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { GetStaticPropsContext, GetStaticPropsResult } from 'next';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Head from 'next/head';
import Image from 'next/image';
import commonStyles from 'assets/jss/common';
import homeStyles from 'assets/jss/home';

const useStyles = makeStyles(
  // @ts-ignore
  (theme: Theme) => ({
    ...commonStyles(theme),
    ...homeStyles,
  })
);

const Home = (): JSX.Element => {
  const { t } = useTranslation();
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <Head>
        <title>Next JS</title>
        <meta name="description" content="Next JS" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={classes.main}>
        <h1 className={classes.title}>
          {t('WELCOME')} <a href="https://nextjs.org">Next.js!</a>
        </h1>
        <div className={classes.image + ' ' + classes.circle}>
          <Image src="/author.jpg" alt="Thinh Nguyen" width={50} height={50} />
        </div>

        <p className={classes.description}>
          <code className={classes.code}>{process.env.version}</code>
        </p>
      </main>

      <footer className={classes.footer}>
        {t('POWERED_BY', { author: 'Thinh Nguyen' })}
      </footer>
    </div>
  );
};

export const getStaticProps = async ({
  locale,
}: GetStaticPropsContext): Promise<GetStaticPropsResult<any>> => {
  return {
    props: {
      // @ts-ignore
      ...(await serverSideTranslations(locale, ['common'])),
    },
  };
};

export default Home;
