import { memo, useEffect, useCallback } from 'react';
import { useRouter } from 'next/router';
import { useAppSelector, useAppDispatch } from '@/hooks';
import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';
import cookie from 'cookie';
import { shallowEqual } from 'react-redux';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { makeStyles, Theme } from '@material-ui/core/styles';
import _ from 'lodash';

import { setCredential } from '@/store/slices/credentialSlice';
import { setAuth } from '@/store/slices/authSlice';

import * as userService from '@/services/user.service';

import Image from 'next/image';
import MainLayout from '@/layouts/MainLayout';

import commonStyles from 'assets/jss/common';
import homeStyles from 'assets/jss/home';

import { CredentialType } from '@/types/credentialType';
import {
  AUTH_ACCESS_TOKEN_KEY,
  AUTH_REFRESH_TOKEN_KEY,
} from '@/constants/configs';
import { APP_ROUTES } from '@/constants/app-routes';

const useStyles = makeStyles(
  // @ts-ignore
  (theme: Theme) => ({
    ...commonStyles(theme),
    ...homeStyles,
  })
);

const Home = ({
  token,
}: InferGetServerSidePropsType<typeof getServerSideProps>): JSX.Element => {
  const { t } = useTranslation();
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const router = useRouter();

  const credential = useAppSelector((state) => state.credential, shallowEqual);

  useEffect(() => {
    if (!_.isEmpty(token)) {
      dispatch(setCredential(token));
    }
  }, [dispatch, token]);

  useEffect(() => {
    if (!_.isEmpty(credential)) {
      const getInfo = async () => {
        try {
          const response = await userService.getInfo();
          // if (credential.accessToken) {
          dispatch(
            setAuth({
              loggedIn: true,
              user: response,
            })
          );
          // }
        } catch (err) {
          dispatch(
            setAuth({
              loggedIn: false,
              user: null,
            })
          );
        }
      };
      getInfo();
    }
  }, [dispatch, credential]);

  const doLogout = useCallback(async () => {
    await userService.logout();
    dispatch(setCredential(null));
    dispatch(
      setAuth({
        loggedIn: false,
        user: null,
      })
    );
    router.push(APP_ROUTES.LOGIN);
  }, [dispatch, router]);

  return (
    <div className={classes.container}>
      <MainLayout>
        <main className={classes.main}>
          <h1 className={classes.title}>
            {t('WELCOME')} <a href="https://nextjs.org">Next.js!</a>
          </h1>
          <div
            className={`${classes.image} ${classes.circle}`}
            onClick={() => doLogout()}
          >
            <Image
              src="/author.jpg"
              alt="Thinh Nguyen"
              width={50}
              height={50}
            />
          </div>

          <p className={classes.description}>
            <code className={classes.code}>{process.env.version}</code>
          </p>
        </main>

        <footer className={classes.footer}>
          {t('POWERED_BY', { author: 'Thinh Nguyen' })}
        </footer>
      </MainLayout>
    </div>
  );
};

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const cookies = cookie.parse(context.req.headers.cookie || '');
  // @ts-ignore
  let token: CredentialType = {};
  if (_.isEmpty(cookies[AUTH_REFRESH_TOKEN_KEY])) {
    return {
      redirect: {
        destination: APP_ROUTES.LOGIN,
        permanent: false,
      },
    };
  } else {
    token = {
      accessToken: cookies[AUTH_ACCESS_TOKEN_KEY] || '',
      refreshToken: cookies[AUTH_REFRESH_TOKEN_KEY],
    };
  }

  return {
    props: {
      // @ts-ignore
      ...(await serverSideTranslations(context.locale, ['common'])),
      token,
    },
  };
};

export default memo(Home);
