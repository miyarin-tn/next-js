// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import { clearCookiesOfTokens } from '@/utils/token';
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
      await axios.post(`${API_BASE_URL}${API_ROUTES.AUTH_LOGOUT}`, req.body, {
        headers: {
          authorization: req.headers['authorization'],
          'user-agent': req.headers['user-agent'],
          'accept-language': lang,
        },
      });

      clearCookiesOfTokens(res);
      res.statusCode = 204;
      return res.end();
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
