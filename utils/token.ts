import type { NextApiResponse } from 'next';
import cookie from 'cookie';
import jwtDecode from 'jwt-decode';
import {
  AUTH_ACCESS_TOKEN_KEY,
  AUTH_REFRESH_TOKEN_KEY,
  COOKIE_OPTIONS,
} from '@/constants/configs';

/**
 * Check JWT token
 *
 * @param  {string} token
 * @returns {boolean} true if the specified token is alive token, false otherwise.
 */
export const isAliveJWT = (token: string): boolean => {
  if (!token) {
    return false;
  }

  const tokenDecode = decodeJWT(token);
  if (tokenDecode && tokenDecode.exp * 1000 > new Date().getTime()) {
    return true;
  }
  return false;
};

/**
 * Decode JWT token
 *
 * @param  {string} token
 * @returns {any} JWT token or false
 */
export const decodeJWT = (token: string): any => {
  if (!token) {
    return false;
  }

  const decode = jwtDecode(token);
  return decode;
};

/**
 * Sets the cookies of 2 tokens: accessToken & refreshToken
 *
 * @param  {NextApiResponse} res
 * @param  {string} accessToken
 * @param  {string} refreshToken
 */
export const setCookiesOfTokens = (
  res: NextApiResponse,
  { accessToken, refreshToken }: any
) => {
  const accessObj = decodeJWT(accessToken) || {};
  const refreshObj = decodeJWT(refreshToken) || {};
  return _setCookiesOfTokens(res, {
    accessToken,
    refreshToken,
    accessExp: accessObj.exp,
    refreshExp: refreshObj.exp,
  });
};

/**
 * Sets the cookies of 2 tokens by express response without cookie-parser
 *
 * @param  {NextApiResponse} res
 * @param  {string} accessToken
 * @param  {string} refreshToken
 * @param  {number} accessExp
 * @param  {number} refreshExp
 */
const _setCookiesOfTokens = (
  res: NextApiResponse,
  { accessToken, refreshToken, accessExp, refreshExp }: any
) => {
  res.setHeader('Set-Cookie', [
    cookie.serialize(AUTH_ACCESS_TOKEN_KEY, accessToken, {
      ...COOKIE_OPTIONS,
      expires: new Date(accessExp * 1000),
    }),
    cookie.serialize(AUTH_REFRESH_TOKEN_KEY, refreshToken, {
      ...COOKIE_OPTIONS,
      expires: new Date(refreshExp * 1000),
    }),
  ]);
};

/**
 * Clear cookies of 2 tokens: accessToken & refreshToken
 *
 * @param      {<type>}  res     The resource
 */
export const clearCookiesOfTokens = (res: NextApiResponse) => {
  return _clearCookiesOfTokens(res);
};

/**
 * Clear cookies of 2 tokens: accessToken & refreshToken by expres response without cookie-parser
 *
 * @return     {<type>}  { description_of_the_return_value }
 */
const _clearCookiesOfTokens = (res: NextApiResponse) => {
  res.setHeader('Set-Cookie', [
    cookie.serialize(AUTH_ACCESS_TOKEN_KEY, '', {
      maxAge: 0,
      path: '/',
    }),
    cookie.serialize(AUTH_REFRESH_TOKEN_KEY, '', {
      maxAge: 0,
      path: '/',
    }),
  ]);
};
