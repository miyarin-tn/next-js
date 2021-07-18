import { memo, useState } from 'react';
import { useRouter } from 'next/router';
import { GetServerSidePropsContext } from 'next';
import cookie from 'cookie';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { makeStyles, Theme } from '@material-ui/core/styles';

import * as userService from '@/services/user.service';

import DefaultLayout from '@/layouts/DefaultLayout';

import commonStyles from 'assets/jss/common';
import loginStyles from 'assets/jss/login';

import {
  AUTH_ACCESS_TOKEN_KEY,
  AUTH_REFRESH_TOKEN_KEY,
} from '@/constants/configs';
import { APP_ROUTES } from '@/constants/app-routes';

const useStyles = makeStyles(
  // @ts-ignore
  (theme: Theme) => ({
    ...commonStyles(theme),
    ...loginStyles,
  })
);

const Login = (): JSX.Element => {
  const { t } = useTranslation();
  const classes = useStyles();
  const router = useRouter();

  const [loginForm, setLoginForm] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginForm({ ...loginForm, [e.target.name]: e.target.value });
  };

  const doLogin = async (e: React.FormEvent<Element>) => {
    e.preventDefault();
    await userService.login(loginForm);
    return router.push(APP_ROUTES.HOME);
  };

  return (
    <div className={classes.container}>
      <DefaultLayout title={t('LOGIN')}>
        <form onSubmit={doLogin}>
          <div className={classes.mb10}>
            <input
              type="text"
              name="email"
              value={loginForm.email}
              placeholder={t('EMAIL')}
              className={classes.fieldNormal}
              onChange={handleChange}
            />
          </div>
          <div className={classes.mb20}>
            <input
              type="password"
              name="password"
              value={loginForm.password}
              placeholder={t('PASSWORD')}
              className={classes.fieldNormal}
              onChange={handleChange}
            />
          </div>
          <button className={classes.buttonBlue} type="submit">
            {t('LOGIN')}
          </button>
        </form>
      </DefaultLayout>
    </div>
  );
};

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const cookies = cookie.parse(context.req.headers.cookie || '');
  // @ts-ignore
  if (cookies[AUTH_ACCESS_TOKEN_KEY] && cookies[AUTH_REFRESH_TOKEN_KEY]) {
    return {
      redirect: {
        destination: APP_ROUTES.HOME,
        permanent: false,
      },
    };
  }

  return {
    props: {
      // @ts-ignore
      ...(await serverSideTranslations(context.locale, ['common'])),
    },
  };
};

export default memo(Login);
