import { CredentialType } from './credentialType';

export interface UserType {
  email: string;
  username?: string;
  firstname: string;
  lastname: string;
  phone?: string;
  birthday?: number;
  timezone: string;
  address?: string;
  appleId?: string;
  facebookId?: string;
  googleId?: string;
  avatar?: string;
  status: string;
  role: string;
  activeCode?: string;
  activeCodeExpires?: number;
  createdAt: number;
  updatedAt: number;
}

export interface UserFullInfoType extends CredentialType {
  user: UserType;
  userAgent: string;
}
