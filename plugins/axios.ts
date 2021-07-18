import axios, { AxiosRequestConfig } from 'axios';
import store from '@/store/configureStore';
import Router from 'next/router';
import { i18n } from 'next-i18next';

import { setCredential } from '@/store/slices/credentialSlice';
import { setAuth } from '@/store/slices/authSlice';
import { setIsRefreshingToken } from '@/store/slices/otherSlice';

import { isAliveJWT } from '@/utils/token';

import { API_ROUTES } from '@/constants/api-routes';
import { APP_ROUTES } from '@/constants/app-routes';

const API_BASE_URL = process.env.API_BASE_URL || 'http://localhost:8080';

axios.interceptors.request.use(
  async (config) => {
    config.headers['Accept-Language'] = i18n?.language || 'en';

    if (config.baseURL !== '/' && config.url?.indexOf('://') === -1) {
      config.baseURL = API_BASE_URL;

      // @ts-ignore
      const accessToken = store.getState()?.credential?.accessToken;
      // @ts-ignore
      const refreshToken = store.getState()?.credential?.refreshToken;

      try {
        const res = await checkAndRefreshToken({
          accessToken,
          refreshToken,
          configURL: config.url,
        });
        // Token was expired & refreshed token successfully.
        if (res) {
          if (config.baseURL === '/') {
            // Keep the same headers while requesting nuxt API server
            axios.defaults.headers = { ...res.headers };
            config.headers = { ...res.headers.common };
          } else {
            // Only set headers Authorization if request to API.
            setAuthorizationHeader(config, res.data.accessToken);
          }
        } else if (isAliveJWT(accessToken)) {
          // Keep the same header if nothing changed
          setAuthorizationHeader(config, accessToken);
        }
      } catch (err) {
        throw err;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  (response) => {
    if (response.config.url === API_ROUTES.LOCAL_SERVER_LOGIN) {
      store.dispatch(
        setCredential({
          accessToken: response.data.accessToken,
          refreshToken: response.data.refreshToken,
        })
      );
      store.dispatch(
        setAuth({
          loggedIn: true,
          user: response.data.user,
        })
      );
    }
    return response;
  },
  (error) => {
    if (
      error.response?.status === 401 &&
      error.response?.config.url === API_ROUTES.LOCAL_SERVER_REFRESH_TOKEN
    ) {
      store.dispatch(setCredential(null));
      store.dispatch(
        setAuth({
          loggedIn: false,
          user: null,
        })
      );
      return Router.push(APP_ROUTES.LOGIN);
    }
    return Promise.reject(error);
  }
);

const checkAndRefreshToken = async ({
  accessToken,
  refreshToken,
  configURL,
  keepAwaitIn = 200,
  maxLoopCounter = 1000,
}: any) => {
  if (
    isAliveJWT(refreshToken) &&
    !isAliveJWT(accessToken) &&
    (!configURL.includes(API_ROUTES.AUTH_REFRESH) ||
      !configURL.includes(API_ROUTES.AUTH_LOGIN))
  ) {
    // Is any other requesting API is refreshing token?
    if (!store.getState()?.other?.isRefreshingToken) {
      // Set the other requesting is waiting
      store.dispatch(setIsRefreshingToken(true));

      try {
        // Request the refresh token on api of next.
        const res = await axios.post(
          API_ROUTES.LOCAL_SERVER_REFRESH_TOKEN,
          {},
          { baseURL: '/' }
        );

        // Update store value and response data on client memory
        store.dispatch(setCredential(res?.data));

        // Clear waiting
        store.dispatch(setIsRefreshingToken(false));
        return { ...res, headers: axios.defaults.headers };
      } catch (err) {
        console.log(err);
        // Clear waiting
        store.dispatch(setIsRefreshingToken(false));
      }
    }

    // Return immidiately if keepAwait = 0
    if (!keepAwaitIn) {
      return;
    }

    // The other requesting API is refreshing token, just waiting here.
    const isLoopChecking = async (ms: number, count: number): Promise<any> => {
      if (count > maxLoopCounter) {
        return;
      }

      // Check refreshing token and waiting
      if (store.getState()?.other?.isRefreshingToken) {
        await new Promise((resolve) => setTimeout(resolve, ms));
        return isLoopChecking(ms, count + 1);
      }
    };
    await isLoopChecking(keepAwaitIn, 0);
  } else if (
    !isAliveJWT(refreshToken) &&
    configURL.includes(API_ROUTES.AUTH_REFRESH)
  ) {
    throw new CustomError({ status: 401, message: i18n?.t('TOKEN_EXPIRED') });
  }
};

const setAuthorizationHeader = (
  config: AxiosRequestConfig,
  accessToken: string
) => {
  axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
  config.headers.Authorization = `Bearer ${accessToken}`;
};

// Custom error for response
class CustomError extends Error {
  response: {
    status: number;
    message: string | undefined;
  };

  constructor(response: { status: number; message: string | undefined }) {
    // Pass remaining arguments (including vendor specific ones) to parent constructor
    super();

    // Maintains proper stack trace for where our error was thrown (only available on V8)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, CustomError);
    }
    this.response = response;
  }
}
