// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import { setCookiesOfTokens } from '@/utils/token';
import { API_ROUTES } from '@/constants/api-routes';
import { UserFullInfoType } from '@/types/userType';
import { i18n } from 'next-i18next';

const API_BASE_URL = process.env.API_BASE_URL || 'http://localhost:8080';

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<UserFullInfoType | any>
): Promise<void> => {
  const lang = i18n?.language || 'en';
  if (req.method === 'POST') {
    try {
      const newCredential = await axios.post(
        `${API_BASE_URL}${API_ROUTES.AUTH_LOGIN}`,
        req.body,
        {
          headers: {
            'user-agent': req.headers['user-agent'],
            'accept-language': lang,
          },
        }
      );
      setCookiesOfTokens(res, {
        accessToken: newCredential.data.accessToken,
        refreshToken: newCredential.data.refreshToken,
      });
      return res.json(newCredential.data);
    } catch (error: any) {
      return res
        .status(error?.response?.status || 400)
        .json(error?.response?.data || error.message);
    }
  } else {
    return res
      .status(400)
      .json({ message: i18n?.t('REQUEST_METHOD_NOT_ALLOWED') });
  }
};

export default handler;
