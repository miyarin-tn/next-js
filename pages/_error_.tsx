import { NextPageContext } from 'next';

const Error = ({ statusCode }: { statusCode: string }) => {
  return (
    <div className="container">
      <p>{statusCode}</p>
      <style jsx>{`
        .container {
          display: flex;
          height: 100vh;
          align-items: center;
          justify-content: center;
          font-size: 80px;
        }
      `}</style>
    </div>
  );
};

Error.getInitialProps = ({ req, res, err }: NextPageContext) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default Error;
