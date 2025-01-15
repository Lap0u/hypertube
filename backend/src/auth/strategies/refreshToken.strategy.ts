import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from '../auth.service';
import { JwtPayload } from './types';

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh',
) {
  constructor(private authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req: Request) =>
          req.cookies[process.env.REFRESH_TOKEN_NAME] ||
          req.headers['authorization']?.split(' ')[1],
      ]),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_REFRESH_SECRET,
      passReqToCallback: true, // Allows us to access the request in validate()
    });
  }

  async validate(req: Request, payload: JwtPayload) {
    const refreshToken = req.cookies[process.env.REFRESH_TOKEN_NAME];
    const user = await this.authService.verifyRefreshToken(
      payload.sub,
      refreshToken,
    );
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
