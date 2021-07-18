import axios from 'axios';
import { API_ROUTES } from '@/constants/api-routes';
import { UserFullInfoType, UserType } from '@/types/userType';
import { CredentialType } from '@/types/credentialType';

const login = async (data: any): Promise<UserFullInfoType> => {
  const response = await axios.post(API_ROUTES.LOCAL_SERVER_LOGIN, data, {
    baseURL: '/',
  });
  return response?.data;
};

const getInfo = async (): Promise<UserType> => {
  const response = await axios.get(API_ROUTES.AUTH_ME);
  return response?.data;
};

const refresh = async (): Promise<CredentialType> => {
  const response = await axios.post(
    API_ROUTES.LOCAL_SERVER_REFRESH_TOKEN,
    {},
    { baseURL: '/' }
  );
  return response?.data;
};

const logout = async (data: any = {}): Promise<any> => {
  const response = await axios.post(API_ROUTES.LOCAL_SERVER_LOGOUT, data, {
    baseURL: '/',
  });
  return response?.data;
};

export { login, getInfo, refresh, logout };
