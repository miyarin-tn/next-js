// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import { i18n } from 'next-i18next';
import { setCookiesOfTokens, clearCookiesOfTokens } from '@/utils/token';
import { API_ROUTES } from '@/constants/api-routes';
import { AUTH_REFRESH_TOKEN_KEY } from '@/constants/configs';
import { UserFullInfoType } from '@/types/userType';

const API_BASE_URL = process.env.API_BASE_URL || 'http://localhost:8080';

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<UserFullInfoType | any>
): Promise<void> => {
  const lang = i18n?.language || 'en';
  if (req.method === 'POST') {
    const refreshToken = req.cookies && req.cookies[AUTH_REFRESH_TOKEN_KEY];

    if (!refreshToken) {
      // Reset cookie of access & refresh token
      clearCookiesOfTokens(res);
      return res.status(401).json({ message: i18n?.t('TOKEN_EXPIRED') });
    }

    // Request API back-end to refresh token
    let newCredential;
    try {
      newCredential = await axios.post(
        `${API_BASE_URL}${API_ROUTES.AUTH_REFRESH}`,
        {
          token: refreshToken,
        },
        {
          headers: {
            'user-agent': req.headers['user-agent'],
            'accept-language': lang,
          },
        }
      );
      setCookiesOfTokens(res, newCredential.data);
      return res.json(newCredential.data);
    } catch (error: any) {
      clearCookiesOfTokens(res);
      return res
        .status(error?.response?.status || 401)
        .json({ message: i18n?.t('TOKEN_EXPIRED') });
    }
  } else {
    return res
      .status(400)
      .json({ message: i18n?.t('REQUEST_METHOD_NOT_ALLOWED') });
  }
};

export default handler;
