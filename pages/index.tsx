import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { GetStaticPropsContext, GetStaticPropsResult } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import styles from '@/styles/Home.module.scss';

const Home = (): JSX.Element => {
  const { t } = useTranslation();
  return (
    <div className={styles.container}>
      <Head>
        <title>Next JS</title>
        <meta name="description" content="Next JS" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          {t('WELCOME')} <a href="https://nextjs.org">Next.js!</a>
        </h1>
        <div className={styles.image + ' ' + styles.circle}>
          <Image src="/author.jpg" alt="Thinh Nguyen" width={50} height={50} />
        </div>

        <p className={styles.description}>
          <code className={styles.code}>{process.env.version}</code>
        </p>
      </main>

      <footer className={styles.footer}>
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
