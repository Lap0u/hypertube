export const jwtConstants = () => ({
  accessTokenSecret: process.env.JWT_SECRET,
  refreshTokenSecret: process.env.JWT_REFRESH_SECRET,
  accessTokenCookieName: process.env.ACCESS_TOKEN_NAME,
  refreshTokenCookieName: process.env.REFRESH_TOKEN_NAME,
  accessTokenCookieConfig: {
    httpOnly: true,
    sameSite: true,
    maxAge: 900000,
    withCrendentials: true
  },
  refreshTokenCookieConfig: {
    httpOnly: true,
    sameSite: true,
    maxAge: 604800000,
    withCrendentials: true

  },
});
