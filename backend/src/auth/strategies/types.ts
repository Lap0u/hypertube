export interface JwtPayload {
  sub: number;
  username: string;
}

export interface GoogleUser {
  email: string;
  firstName: string;
  lastName: string;
  picture: string;
  accessToken: string;
  refreshToken: string;
}

export interface UserInfos {
  username: string;
  password?: string;
  email: string;
  firstName: string;
  lastName: string;
  preferredLanguage: string;
}
