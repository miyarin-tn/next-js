import Head from 'next/head';
import Image from 'next/image';
import styles from '@/styles/Home.module.scss';

const Home = (): JSX.Element => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Next JS</title>
        <meta name="description" content="Next JS" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a href="https://nextjs.org">Next.js!</a>
        </h1>
        <div className={styles.image + ' ' + styles.circle}>
          <Image src="/author.jpg" alt="Thinh Nguyen" width={50} height={50} />
        </div>

        <p className={styles.description}>
          <code className={styles.code}>{process.env.version}</code>
        </p>
      </main>

      <footer className={styles.footer}>Powered by Thinh Nguyen</footer>
    </div>
  );
};

export default Home;
