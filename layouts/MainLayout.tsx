import Head from 'next/head';

const MainLayout = ({
  title,
  children,
}: {
  title?: string;
  children?: any;
}) => {
  return (
    <>
      <Head>
        <title>{title ? `${title} | Next JS` : 'Next JS'}</title>
        <meta name="description" content={title} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {children}
    </>
  );
};

export default MainLayout;
